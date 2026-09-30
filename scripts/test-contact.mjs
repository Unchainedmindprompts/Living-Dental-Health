// Isolated transport tests: no network requests or real patient emails.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const source = ts.transpileModule(
  fs.readFileSync("app/api/contact/route.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
let delivery = { data: { id: "test-message" }, error: null };
let sent;
const env = {};
const module = { exports: {} };
vm.runInNewContext(source, {
  exports: module.exports,
  module,
  Buffer,
  URL,
  process: { env },
  require(name) {
    if (name === "next/server")
      return {
        NextResponse: { json: (data, init) => Response.json(data, init) },
      };
    if (name === "resend")
      return {
        Resend: class {
          emails = {
            send: async (payload) => {
              sent = payload;
              if (delivery instanceof Error) throw delivery;
              return delivery;
            },
          };
        },
      };
    throw new Error(`Unexpected import: ${name}`);
  },
});
const { POST } = module.exports;
async function post(body, headers = {}) {
  return POST(
    new Request("https://example.test/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}
const valid = {
  name: "<Patient>",
  email: "test@example.test",
  message: "<script>private</script>",
};
assert.equal((await post(valid)).status, 503);
assert.equal(sent, undefined);
assert.equal((await post("null")).status, 400);
assert.equal((await post("{broken")).status, 400);
assert.equal((await post([])).status, 400);
assert.equal((await post({ email: 42 })).status, 422);
assert.equal((await post({ email: "invalid" })).status, 422);
assert.equal((await post({ ...valid, name: "x\r\ny" })).status, 422);
assert.equal((await post({ ...valid, website: "spam" })).status, 422);
assert.equal((await post({ ...valid, message: "x".repeat(3001) })).status, 422);
assert.equal((await post("x".repeat(17000))).status, 413);
assert.equal((await post(valid, { origin: "https://other.test" })).status, 403);
assert.equal((await post(valid, { "content-type": "text/plain" })).status, 415);
env.RESEND_API_KEY = "test-only";
let result = await post(valid, { origin: "https://example.test" });
assert.equal(result.status, 200);
assert.deepEqual(await result.json(), { ok: true });
assert.ok(sent.html.includes("&lt;script&gt;private&lt;/script&gt;"));
assert.ok(!sent.html.includes("<script>"));
assert.equal(sent.subject, "New website appointment request");
for (const outcome of [
  { data: null, error: { message: "Rejected" } },
  { data: null, error: null },
  new Error("Transport failed"),
]) {
  delivery = outcome;
  result = await post(valid);
  assert.equal(result.status, 502);
  assert.equal((await result.json()).ok, undefined);
}
console.log(
  "Contact tests passed: validation, size/origin restrictions, missing transport, provider acceptance/failures, HTML escaping. No emails sent.",
);
