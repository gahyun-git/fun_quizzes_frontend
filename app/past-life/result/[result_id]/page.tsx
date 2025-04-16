"use client";

import React, { useEffect, useState } from "react";
import ResultDisplay from "../../../components/ResultDisplay";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Result {
  result_id: string;
  past_name: string;
  past_story: string;
  past_image_url: string;
}

interface Params {
  result_id: string;
}

const ResultPage: React.FC<{ params: Promise<Params> }> = ({ params }) => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const { result_id: resultId } = React.use(params);
  const router = useRouter(); 

  useEffect(() => {
    if (resultId) {
      console.log("Fetching data for resultId:", resultId);
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/quizzes/past-life-results/${resultId}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }
          return response.data;
        })
        .then((data) => {
          console.log("Fetched data:", data);
          setResult(data);
          setLoading(false);
          router.push(`/past-life/result/${resultId}`);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [resultId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500 p-4">
        <p className="text-2xl font-semibold text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 to-gray-500 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <ResultDisplay result={result} />
      </div>
    </div>
  );
};

export default ResultPage;