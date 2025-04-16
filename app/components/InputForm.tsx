"use client";

import React, { RefObject, useEffect, useRef } from "react";
import { FormState } from "./FormState";
import useDateOptions from "../hooks/useDateOptions";
import {
  handleYearChange,
  handleMonthChange,
  handleDayChange,
  handleHourChange,
  handleMinuteChange,
  handleAmPmChange,
  handleUnknownTimeChange,
} from "./handlers";
import Adsense from "./Adsense";

interface InputFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  showAds: boolean;
  onAdClose: () => void;
}

export default function InputForm({
  formState,
  setFormState,
  onSubmit,
  showAds,
  onAdClose,
}: InputFormProps) {
  const { years, months, days, hours, minutes, ampmList } = useDateOptions();

  const yearRef = useRef<HTMLSelectElement | null>(null);
  const minuteRef = useRef<HTMLSelectElement | null>(null);
  const ampmRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (yearRef.current) {
      const index = years.findIndex((y) => y === "1991");
      const optionHeight = 32;
      yearRef.current.scrollTop = (index - 3) * optionHeight;
    }
  }, [years]);

  return (
    <>
      {showAds && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="font-semibold mb-4">광고 시청 후 계속됩니다</p>
            <Adsense adSlot="5736158358" />
            <button
              onClick={onAdClose}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              닫고 계속하기
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">생일로 알아보는 전생테스트</h2>

        {/* 생년월일 */}
        <div>
          <label className="block text-gray-700 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              ref={yearRef}
              value={formState.birthYear}
              onChange={(e) => handleYearChange(e.target.value, setFormState)}
              required
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              onClick={() => {
                const index = years.findIndex((y) => y === "1991");
                const optionHeight = 32;
                yearRef.current!.scrollTop = (index - 3) * optionHeight;
              }}
            >
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={formState.birthMonth}
              onChange={(e) => handleMonthChange(e.target.value, setFormState)}
              required
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select
              value={formState.birthDay}
              onChange={(e) => handleDayChange(e.target.value, setFormState)}
              required
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 태어난 시간 */}
        <div className="transition-all duration-300">
          <div className={`grid grid-cols-3 gap-2 overflow-hidden ${formState.unknownBirthTime ? "opacity-0 h-0" : "opacity-100 h-auto"}`}>
            <label className="col-span-3 block text-gray-700">태어난 시간</label>
            <select
              value={formState.birthHour}
              onChange={(e) => handleHourChange(e.target.value, setFormState, minuteRef as RefObject<HTMLSelectElement>)}
              disabled={formState.unknownBirthTime}
              required={!formState.unknownBirthTime}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">시</option>
              {hours.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <select
              ref={minuteRef as React.RefObject<HTMLSelectElement>}
              value={formState.birthMinute}
              onChange={(e) => handleMinuteChange(e.target.value, setFormState, ampmRef as RefObject<HTMLSelectElement>)}
              disabled={formState.unknownBirthTime}
              required={!formState.unknownBirthTime}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">분</option>
              {minutes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              ref={ampmRef}
              value={formState.ampm}
              onChange={(e) => handleAmPmChange(e.target.value, setFormState)}
              disabled={formState.unknownBirthTime}
              required={!formState.unknownBirthTime}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">AM/PM</option>
              {ampmList.map((ap) => (
                <option key={ap} value={ap}>{ap}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 태어난 시간 모름 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formState.unknownBirthTime}
            onChange={(e) => handleUnknownTimeChange(e.target.checked, setFormState)}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">태어난 시간을 모름</label>
        </div>

        {formState.error && <p className="text-red-500 text-sm">{formState.error}</p>}

        <button
          type="submit"
          disabled={formState.loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition"
        >
          {formState.loading ? "생성 중..." : "전생 알아보기"}
        </button>
      </form>
    </>
  );
}
