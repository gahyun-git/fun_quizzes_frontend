"use client";

import React, { useState } from "react";

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
  onApiSubmit: () => void;
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
  onApiSubmit,
  formState,
  years,
  months,
  days,
  hours,
  minutes,
  ampmList,
  onChange,
}: InputFormProps) {
  const [showAd, setShowAd] = useState(false);

  const handleBeforeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAd(true); // 광고 먼저 띄우기
  };

  const handleAdClose = () => {
    setShowAd(false);
    onApiSubmit(); // 광고 닫고 API 호출
  };

  return (
    <>
      <form onSubmit={handleBeforeSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center text-purple-700">생년월일 입력</h2>

        {/* 생년월일, 시간 선택 부분 기존 그대로 */}
        <div className="mb-4">
          <label className="block text-gray-700">생년월일</label>
          <div className="flex space-x-2">
            <select name="birthYear" value={formState.birthYear} onChange={onChange} required className="border rounded p-2 flex-1">
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
            <select name="birthMonth" value={formState.birthMonth} onChange={onChange} required className="border rounded p-2 flex-1">
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>
            <select name="birthDay" value={formState.birthDay} onChange={onChange} required className="border rounded p-2 flex-1">
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}일</option>
              ))}
            </select>
          </div>
        </div>

        {/* 태어난 시간 입력 */}
        <div className="mb-4">
          <label className="block text-gray-700">태어난 시간</label>
          {!formState.unknownBirthTime && (
            <div className="flex space-x-2">
              <select name="birthHour" value={formState.birthHour} onChange={onChange} required className="border rounded p-2 flex-1">
                <option value="">시</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>{hour}시</option>
                ))}
              </select>
              <select name="birthMinute" value={formState.birthMinute} onChange={onChange} required className="border rounded p-2 flex-1">
                <option value="">분</option>
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>{minute}분</option>
                ))}
              </select>
              <select name="ampm" value={formState.ampm} onChange={onChange} required className="border rounded p-2 flex-1">
                <option value="">오전/오후</option>
                {ampmList.map((ap) => (
                  <option key={ap} value={ap}>{ap}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button type="submit" disabled={formState.loading} className="bg-purple-600 text-white font-bold py-2 px-4 rounded w-full">
          {formState.loading ? "생성중..." : "전생 알아보기"}
        </button>
        {formState.error && <div className="text-red-500 mt-4">{formState.error}</div>}
      </form>

      {/* 광고 모달 */}
      {showAd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="mb-4">광고를 보고 결과를 확인하세요!</p>
            <ins className="adsbygoogle" 
              style={{ display: 'block' }}
              data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
              data-ad-slot="xxxxxxxxxx"
              data-ad-format="auto"
              data-full-width-responsive="true">
            </ins>
            <button onClick={handleAdClose} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded">
              광고 닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
