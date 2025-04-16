import { ReactNode } from "react";
import Adsense from "../components/Adsense";
import AdsenseSidebar from "../components/AdsenseSidebar";

export const metadata = {
  title: "전생 테스트",
};

export default function PastLifeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ 상단 고정 광고 */}
      <div className="w-full py-2">
        <Adsense adSlot="6336987696" className="mx-auto w-full max-w-5xl" />
      </div>

      {/* ✅ 메인 콘텐츠 */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* ✅ 사이드 광고 */}
      <AdsenseSidebar />
    </div>
  );
}
