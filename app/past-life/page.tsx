"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import AdsenseModal from "../components/AdsenseModal";

export interface FormState {
  selectedDate: Date | null;
  birthTime: string;
  unknownBirthTime: boolean;
  loading: boolean;
  error: string;
}

const hourOptions = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const initialFormState: FormState = {
  selectedDate: null,
  birthTime: "",
  unknownBirthTime: false,
  loading: false,
  error: "",
};

export default function PastLifePage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [showAds, setShowAds] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAds(true);
  };

  const handleApiSubmit = async () => {
    setShowAds(false);
    setFormState((prev) => ({ ...prev, loading: true, error: "" }));

    if (!formState.selectedDate) {
      setFormState((prev) => ({
        ...prev,
        error: "생년월일을 선택해주세요.",
      }));
      return;
    }

    const birthDate = formState.selectedDate.toISOString().split("T")[0];
    const payload = {
      birth_date: birthDate,
      birth_time: formState.unknownBirthTime ? "" : formState.birthTime,
      unknown_birth_time: formState.unknownBirthTime,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/`,
        payload
      );
      const resultId = response.data.id;
      router.push(`/past-life/result/${resultId}`);
    } catch (error) {
      console.error(error);
      setFormState((prev) => ({
        ...prev,
        error: "결과를 가져오지 못했습니다.",
      }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">당신의 전생은?</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-lg">
          <div>
            <label className="block mb-2 text-gray-700">생년월일</label>
            <DatePicker
              selected={formState.selectedDate}
              onChange={(date) => setFormState((prev) => ({ ...prev, selectedDate: date }))}
              className="border rounded w-full p-2 focus:ring-2 focus:ring-purple-500"
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          {!formState.unknownBirthTime && (
            <div>
              <label className="block mb-2 text-gray-700">태어난 시간</label>
              <Combobox value={formState.birthTime} onChange={(value) =>
                setFormState((prev) => ({ ...prev, birthTime: value as string }))
              }>
                <div className="relative">
                  <Combobox.Input
                    className="border rounded w-full p-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="예: 14:00"
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, birthTime: e.target.value }))
                    }
                  />
                  <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
                    {hourOptions.map((hour) => (
                      <Combobox.Option key={hour} value={hour} className="p-2 hover:bg-purple-100">
                        {hour}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="unknownBirthTime"
              checked={formState.unknownBirthTime}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  unknownBirthTime: e.target.checked,
                  birthTime: e.target.checked ? "" : prev.birthTime,
                }))
              }
              className="mr-2"
            />
            <label htmlFor="unknownBirthTime" className="text-gray-700">
              태어난 시간을 모름
            </label>
          </div>

          {formState.error && (
            <div className="text-red-500 text-sm">{formState.error}</div>
          )}

          <button
            type="submit"
            className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition"
            disabled={formState.loading}
          >
            {formState.loading ? "전생 생성중..." : "전생 알아보기"}
          </button>
        </form>

        {showAds && <AdsenseModal onClose={handleApiSubmit} />}
      </div>
    </div>
  );
}
