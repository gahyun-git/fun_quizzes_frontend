"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown;
  }
}

export default function AdsenseBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = (window.adsbygoogle || []) as unknown[]).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
        style={{ display: "block", margin: "1rem auto", textAlign: "center" }}
        data-ad-client="ca-pub-8015585586602031"
        data-ad-slot="5736158358"
        data-ad-format="auto"
        data-full-width-responsive="true">
    </ins>
  );
}
