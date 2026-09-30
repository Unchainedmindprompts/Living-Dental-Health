/** Provider-neutral conversion hooks. Never include form contents or patient details. */
export type ConversionEvent =
  "phone_click" | "appointment_request_click" | "contact_request_sent";
export function trackConversion(event: ConversionEvent): void {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("ldh:conversion", { detail: { event } }),
    );
}
