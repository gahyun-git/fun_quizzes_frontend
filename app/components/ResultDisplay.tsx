"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Result {
  past_name: string;
  past_story: string;
  past_image_url: string;
}

interface ResultProps {
  result: Result | null;
}

const ResultDisplay: React.FC<ResultProps> = ({ result }) => {
  const router = useRouter();
  if (!result) {
    return <p className="text-center text-lg text-gray-600">No data available</p>;
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        당신의 전생은 <br />{result.past_name} 입니다 👀
      </h1>
      <Image
        src={result.past_image_url}
        alt="전생 이미지"
        width={1024}
        height={1024}
        className="rounded-2xl mb-6"
        unoptimized
      />
      <button
        onClick={() => router.push("/past-life")}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
      >
        다시하기
      </button>
    </div>
  );
};

export default ResultDisplay;