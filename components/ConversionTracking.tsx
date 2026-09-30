"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

/** Event hooks only: connecting an approved analytics destination is a separate configuration step. */
export default function ConversionTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackConversion("phone_click");
      else if (new URL(link.href, window.location.href).pathname === "/contact")
        trackConversion("appointment_request_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
