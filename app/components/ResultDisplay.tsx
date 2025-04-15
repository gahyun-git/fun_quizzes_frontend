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
    return <p className="text-center">No data available</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-purple-600">{result.past_name}</h1>
      <p className="text-gray-700 mb-4">{result.past_story}</p>
      <Image
        src={result.past_image_url}
        alt="전생 이미지"
        width={1024}
        height={1024}
        className="rounded-lg"
        unoptimized
      />
      <button onClick={() => router.push("/past-life")}>다시하기</button>
    </div>
  );
};

export default ResultDisplay;