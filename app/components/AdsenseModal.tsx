"use client";

import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function AdsenseModal({ onClose }: Props) {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || [];
      if (Array.isArray(adsbygoogle)) {
        adsbygoogle.push({});
      } else {
        console.error("Adsense Error: adsbygoogle is not an array");
      }
    } catch (e) {
      console.error("Adsense Error:", e);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
        <p className="mb-4 text-lg font-semibold">잠시만 기다려주세요</p>

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8015585586602031"
          data-ad-slot="5736158358"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

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
