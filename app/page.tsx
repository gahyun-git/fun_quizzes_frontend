"use client";
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          지금 시작해보세요👇 
        </h1>
        <button className="mt-6 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300" 
        onClick={() => {
          window.location.href = "/past-life";
        }}>
          전생 테스트
        </button>
      </div>
    </div>
  );
}