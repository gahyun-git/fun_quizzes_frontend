"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import InputForm, { FormState } from "../components/InputForm";
import AdsenseModal from "../components/AdsenseModal";
import useDateOptions from "../hooks/useDateOptions";

const initialFormState: FormState = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  birthHour: "",
  birthMinute: "",
  unknownBirthTime: false,
  ampm: "",
  loading: false,
  error: "",
};

export default function PastLifePage() {
  const router = useRouter();
  const { years, months, days, hours, minutes, ampmList } = useDateOptions();

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [showAds, setShowAds] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
  
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setShowAds(true);
  };

  const handleApiSubmit = async () => {
    setShowAds(false);
    setFormState((prev) => ({ ...prev, loading: true, error: "" }));

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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/`, payload);
      router.push(`/past-life/result/${res.data.id}`);
    } catch (error) {
      console.error(error);
      setFormState((prev) => ({ ...prev, error: "결과를 가져오지 못했습니다." }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-700">당신의 전생은?</h1>
        <p className="text-gray-600 mb-6 text-center">생년월일과 태어난 시간으로 전생의 모습을 알아보세요.</p>

        <InputForm
          formState={formState}
          onChange={handleChange}
          onSubmit={handleSubmit}
          years={years}
          months={months}
          days={days}
          hours={hours}
          minutes={minutes}
          ampmList={ampmList}
        />

        {showAds && <AdsenseModal onClose={handleApiSubmit} />}
      </div>
    </div>
  );
}
