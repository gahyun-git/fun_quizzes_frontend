"use client";

import { useEffect } from "react";
import Adsense from "./Adsense";

export default function AdsenseSidebar() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense Sidebar Error:", e);
    }
  }, []);

  return (
    <div className="hidden lg:block fixed top-40 right-4 w-30" style={{ maxWidth: '120px', maxHeight: '600px' }}>
      <Adsense adSlot="1383923993" className="w-full" />
    </div>
  );
}
