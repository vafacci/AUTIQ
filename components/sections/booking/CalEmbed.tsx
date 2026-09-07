"use client";

import { useEffect, useMemo } from "react";
import { cn } from "@/lib/cn";

type CalEmbedProps = {
  calLink: string;
  notes?: string;
  theme?: "light" | "dark";
  className?: string;
  onBooked?: () => void;
};

/**
 * Cal.com embed via official iframe.
 * Availability comes from Cal — nothing invented client-side.
 */
export function CalEmbed({
  calLink,
  notes,
  theme = "light",
  className,
  onBooked,
}: CalEmbedProps) {
  const src = useMemo(() => {
    const url = new URL(`https://cal.com/${calLink}`);
    url.searchParams.set("embed", "true");
    url.searchParams.set("theme", theme);
    if (notes?.trim()) {
      url.searchParams.set("notes", notes.trim());
    }
    return url.toString();
  }, [calLink, notes, theme]);

  useEffect(() => {
    if (!onBooked) return;

    const onMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      if (!origin.includes("cal.com") && !origin.includes("cal.eu")) {
        return;
      }

      const data = event.data;
      if (!data) return;

      if (typeof data === "string") {
        if (data.toLowerCase().includes("booking")) onBooked();
        return;
      }

      if (typeof data !== "object") return;

      const payload = data as Record<string, unknown>;
      const type = String(payload.type ?? payload.action ?? payload.event ?? "");
      if (type.toLowerCase().includes("bookingsuccessful")) {
        onBooked();
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);

  return (
    <iframe
      src={src}
      title="Book a call with AUTIQ"
      loading="lazy"
      className={cn(
        "min-h-[42rem] w-full bg-white",
        className,
      )}
      allow="camera; microphone; fullscreen"
    />
  );
}
