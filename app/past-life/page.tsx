"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "../components/InputForm";
import { FormState } from "../components/FormState";

export default function PastLifePage() {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    birthHour: "",
    birthMinute: "",
    ampm: "",
    unknownBirthTime: false,
    loading: false,
    error: "",
  });

  const [showAds, setShowAds] = useState(false);

  // 전생 알아보기 버튼 클릭 시 광고 모달부터 노출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAds(true);
  };

  // 광고 닫기 → API 호출 → 결과 페이지 이동
  const handleAdClose = async () => {
    setShowAds(false);
    setFormState((prev: FormState) => ({ ...prev, loading: true, error: "" }));

    const birthDate = `${formState.birthYear}-${formState.birthMonth.padStart(2, "0")}-${formState.birthDay.padStart(2, "0")}`;
    let birthTime = "";

    if (!formState.unknownBirthTime) {
      let hour = parseInt(formState.birthHour, 10);
      if (formState.ampm === "PM" && hour < 12) hour += 12;
      if (formState.ampm === "AM" && hour === 12) hour = 0;
      birthTime = `${hour.toString().padStart(2, "0")}:${formState.birthMinute.padStart(2, "0")}`;
    }

    const payload = {
      birth_date: birthDate,
      birth_time: birthTime,
      unknown_birth_time: formState.unknownBirthTime,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("서버 오류");

      const data = await res.json();
      if (!data.id) throw new Error("결과 ID 없음");

      router.push(`/past-life/result/${data.id}`);
    } catch (error: unknown) {
      console.error("Error:", error);
      setFormState((prev: FormState) => ({ ...prev, error: "결과를 가져오는 중 오류가 발생했습니다." }));
    } finally {
      setFormState((prev: FormState) => ({ ...prev, loading: false }));
    }
  };

  return (
    <InputForm
      formState={formState}
      setFormState={setFormState}
      onSubmit={handleSubmit}
      showAds={showAds}
      onAdClose={handleAdClose}
    />
  );
}
