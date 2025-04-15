"use client";

import React, { useState } from "react";
import InputForm, { FormState } from "../components/InputForm";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApiSubmit = async () => {
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/`, payload);
      const data = response.data;
      const resultId = data.id;

      if (!resultId) {
        setFormState((prev) => ({ ...prev, error: "결과 ID가 없습니다." }));
        return;
      }

      router.push(`/past-life/result/${resultId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFormState((prev) => ({ ...prev, error: "결과를 가져오지 못했습니다." }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };



  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => String(1900 + i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = Array.from({ length: 7 }, (_, i) => (i * 10).toString().padStart(2, "0"));
  const ampmList = ["AM", "PM"];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-700">당신의 전생은?</h1>
        <p className="text-gray-600 mb-6 text-center">생년월일과 태어난 시간으로 전생의 모습을 알아보세요.</p>
        <InputForm
          formState={formState}
          onChange={handleChange}
          onSubmit={() => {}}
          onApiSubmit={handleApiSubmit}
          years={years}
          months={months}
          days={days}
          hours={hours}
          minutes={minutes}
          ampmList={ampmList}
        />
      </div>
    </div>
  );
}
