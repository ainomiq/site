"use client";
import { useEffect } from "react";

export function BookDemoAutoScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    // Trigger on ?scroll=book-demo (Klaviyo-safe) or #book-demo (direct link)
    if (params.get("scroll") === "book-demo" || hash === "#book-demo") {
      setTimeout(() => {
        document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, []);
  return null;
}
