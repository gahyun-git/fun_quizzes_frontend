"use client";

import { useEffect } from "react";
import Adsense from "./Adsense";

interface Props {
  onClose: () => void;
}

export default function AdsenseModal({ onClose }: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense Modal Error:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center relative">
        <p className="font-semibold text-lg mb-4">광고주 모집중~!</p>
        <Adsense adSlot="5736158358" className="w-full" />
        <button
          onClick={onClose}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          닫고 계속하기
        </button>
      </div>
    </div>
  );
}
