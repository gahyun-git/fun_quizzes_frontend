"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/app/components/InputForm";
import { FormState } from "@/app/components/FormState";

const initialFormState: FormState = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  birthHour: "",
  birthMinute: "",
  ampm: "",
  unknownBirthTime: false,
  loading: false,
  error: "",
};

export default function PastLifePage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [showAds, setShowAds] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { birthYear, birthMonth, birthDay, unknownBirthTime, birthHour, birthMinute, ampm } = formState;

    if (!birthYear || !birthMonth || !birthDay) {
      setFormState((prev) => ({ ...prev, error: "생년월일을 모두 선택해주세요." }));
      return;
    }

    if (!unknownBirthTime && (!birthHour || !birthMinute || !ampm)) {
      setFormState((prev) => ({ ...prev, error: "태어난 시간을 모두 선택해주세요." }));
      return;
    }

    setShowAds(true);
  };

  const handleApiSubmit = async () => {
    setShowAds(false);
    setFormState((prev) => ({ ...prev, loading: true }));

    const birth_date = `${formState.birthYear}-${formState.birthMonth.padStart(2, "0")}-${formState.birthDay.padStart(2, "0")}`;

    let birth_time = null;
    if (!formState.unknownBirthTime) {
      let hour = parseInt(formState.birthHour);
      if (formState.ampm === "PM" && hour < 12) hour += 12;
      if (formState.ampm === "AM" && hour === 12) hour = 0;
      birth_time = `${hour.toString().padStart(2, "0")}:${formState.birthMinute}`;
    }

    const payload = {
      birth_date,
      birth_time,
      unknown_birth_time: formState.unknownBirthTime,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      router.push(`/past-life/result/${data.id}`);
    } catch (err) {
      console.error(err);
      setFormState((prev) => ({ ...prev, error: "결과 생성에 실패했습니다." }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-white">
      <InputForm
        formState={formState}
        setFormState={setFormState}
        onSubmit={handleSubmit}
        showAds={showAds}
        onAdClose={handleApiSubmit}
      />
    </div>
  );
}
