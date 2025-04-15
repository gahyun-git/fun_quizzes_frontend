"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Combobox } from "@headlessui/react";

import { FormState } from "./InputForm.types";
interface Props {
  formState: FormState;
  onChangeDate: (date: Date | null) => void;
  onChangeTime: (time: string) => void;
  onToggleUnknown: () => void;
  onSubmit: () => void;
}

const timeOptions = [
  "오전 12시", "오전 1시", "오전 2시", "오전 3시", "오전 4시", "오전 5시",
  "오전 6시", "오전 7시", "오전 8시", "오전 9시", "오전 10시", "오전 11시",
  "오후 12시", "오후 1시", "오후 2시", "오후 3시", "오후 4시", "오후 5시",
  "오후 6시", "오후 7시", "오후 8시", "오후 9시", "오후 10시", "오후 11시"
];

export default function InputForm({
  formState,
  onChangeDate,
  onChangeTime,
  onToggleUnknown,
  onSubmit
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">전생 알아보기</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">생년월일</label>
        <DatePicker
          selected={formState.selectedDate}
          onChange={onChangeDate}
          dateFormat="yyyy-MM-dd"
          className="w-full border p-2 rounded"
          placeholderText="날짜 선택"
        />
      </div>

      {!formState.unknownBirthTime && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">태어난 시간</label>
          <Combobox value={formState.birthTime} onChange={onChangeTime}>
            <Combobox.Input
              className="w-full border p-2 rounded"
              placeholder="시간 선택"
              onChange={(e) => onChangeTime(e.target.value)}
            />
            <Combobox.Options className="border mt-1 rounded bg-white max-h-40 overflow-y-auto">
              {timeOptions.map((time) => (
                <Combobox.Option
                  key={time}
                  value={time}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${active ? "bg-purple-100" : ""}`
                  }
                >
                  {time}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      )}

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formState.unknownBirthTime}
            onChange={onToggleUnknown}
          />
          <span>태어난 시간을 모름</span>
        </label>
      </div>

      <button
        onClick={onSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
        disabled={formState.loading}
      >
        {formState.loading ? "생성 중..." : "전생 알아보기"}
      </button>

      {formState.error && <p className="text-red-500 mt-2">{formState.error}</p>}
    </div>
  );
}
