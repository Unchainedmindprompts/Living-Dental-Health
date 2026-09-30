import Nav from "@/components/Nav";
import Link from "next/link";
import { serviceMetadata } from "@/lib/metadata";
export const metadata = serviceMetadata(
  "/accessibility",
  "Website Accessibility | Living Dental Health",
  "Contact Living Dental Health if you need help using this website or accessing practice information.",
  "/hero-couple.webp",
);
export default function Page() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream px-6 pb-24 pt-[140px] text-charcoal">
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-serif text-[44px]">Website accessibility</h1>
          <p className="mt-6 leading-relaxed">
            If you have difficulty using this website or accessing information
            about Living Dental Health, please call{" "}
            <a className="underline" href="tel:+15415505311">
              (541) 550-5311
            </a>
            . Our office hours are Tuesday through Friday, 8 AM to 5 PM.
          </p>
          <p className="mt-5 leading-relaxed">
            You can also use our{" "}
            <Link className="underline" href="/contact">
              contact form
            </Link>{" "}
            to tell us which page or feature is causing difficulty. Please do
            not include private medical information in your message.
          </p>
          <h2 className="mt-10 font-serif text-[28px]">
            Feedback helps us improve
          </h2>
          <p className="mt-4 leading-relaxed">
            If possible, tell us the page address, the action you were trying to
            complete, and the browser or assistive technology you use. We can
            help you find the practice information you need.
          </p>
        </div>
      </main>
    </>
  );
}
