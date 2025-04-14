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
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/past-life-results/${resultId}`)
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
    return <p className="text-center">Loading...</p>;
  }

  return <ResultDisplay result={result} />;
};

export default ResultPage;