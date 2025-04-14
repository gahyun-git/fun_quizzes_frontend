"use client";
import React from "react";

// InputForm.tsx
// 이 컴포넌트는 사용자의 생년월일 및 태어난 시간 입력 폼을 렌더링합니다.
// 부모로부터 formState, onSubmit, onChange, 그리고 날짜/시간 옵션 배열을 props로 전달받습니다.
export interface FormState {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  birthMinute: string;
  unknownBirthTime: boolean;
  ampm: string;
  loading: boolean;
  error: string;
}

export interface InputFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  formState: FormState;
  years: string[];
  months: string[];
  days: string[];
  hours: string[];
  minutes: string[];
  ampmList: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export default function InputForm({
  onSubmit,
  formState,
  years,
  months,
  days,
  hours,
  minutes,
  ampmList,
  onChange,
}: InputFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple-700">생년월일 입력</h2>
      <div className="mb-4">
        <label className="block text-gray-700">생년월일</label>
        <div className="flex space-x-2">
          <select name="birthYear" value={formState.birthYear} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">연도</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
          <select name="birthMonth" value={formState.birthMonth} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">월</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}월</option>
            ))}
          </select>
          <select name="birthDay" value={formState.birthDay} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">일</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}일</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">태어난 시간</label>
        {!formState.unknownBirthTime && (
        <div className="flex space-x-2">
          <select name="birthHour" value={formState.birthHour} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">시</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>{hour}시</option>
            ))}
          </select>
          <select name="birthMinute" value={formState.birthMinute} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">분</option>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>{minute}분</option>
            ))}
          </select>
          <select name="ampm" value={formState.ampm} onChange={onChange} required className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="">오전/오후</option>
            {ampmList.map((ap) => (
              <option key={ap} value={ap}>{ap}</option>
            ))}
          </select>
        </div>
        )}
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="unknownBirthTime"
            checked={formState.unknownBirthTime}
            onChange={(e) => {
              onChange(e);
              if (e.target.checked) {
                formState.birthHour = "";
                formState.birthMinute = "";
                formState.ampm = "";
              }
            }}
            className="mr-2"
          />
          태어난 시간을 모름
        </label>
      </div>
      <button type="submit" disabled={formState.loading} className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 w-full transition duration-300">
        {formState.loading ? "생성중..." : "전생 알아보기"}
      </button>
      {formState.error && <div className="text-red-500 mt-4">{formState.error}</div>}
    </form>
  );
}