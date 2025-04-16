"use client";

import React from "react";
import { FormState } from "./FormState";
import useDateOptions from "../hooks/useDateOptions";
import {
  handleYearChange,
  handleMonthChange,
  handleDayChange,
  handleUnknownTimeChange,
} from "./handlers";
import AdsenseModal from "./AdsenseModal";

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

  return (
    <>
      {showAds && <AdsenseModal onClose={onAdClose} />}

      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">생년월일 입력</h2>

        {/* 생년월일 */}
        <div>
          <label className="block text-gray-700 mb-2">생년월일</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={formState.birthYear}
              onChange={(e) => handleYearChange(e.target.value, setFormState)}
              required
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
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
                <option key={month} value={month}>
                  {month}
                </option>
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
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 태어난 시간 */}
        {!formState.unknownBirthTime && (
          <div>
            <label className="block text-gray-700 mb-2">태어난 시간</label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={formState.birthHour}
                onChange={(e) => setFormState((prev) => ({ ...prev, birthHour: e.target.value }))}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">시</option>
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={formState.birthMinute}
                onChange={(e) => setFormState((prev) => ({ ...prev, birthMinute: e.target.value }))}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">분</option>
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={formState.ampm}
                onChange={(e) => setFormState((prev) => ({ ...prev, ampm: e.target.value }))}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">오전/오후</option>
                {ampmList.map((ap) => (
                  <option key={ap} value={ap}>
                    {ap}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

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

        {/* 에러 메시지 */}
        {formState.error && <p className="text-red-500 text-sm">{formState.error}</p>}

        {/* 버튼 */}
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
