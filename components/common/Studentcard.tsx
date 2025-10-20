"use client";

type Student = {
  name: string;
  exam: string;
  attempts: number;
  category: string;
  background: string;
  challenges: string[];
  strategy: string[];
  message: string;
};

export default function StudentCard({ student }: { student: Student }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{student.name}</h2>
        <p className="text-gray-500 text-sm md:text-base">
          {student.exam} • Attempts: {student.attempts} • <span className="capitalize">{student.category}</span>
        </p>
      </div>

      {/* Body */}
      <div className="space-y-2 text-gray-700 text-sm md:text-base">
        <p><strong>Background:</strong> {student.background}</p>
        <p><strong>Challenges:</strong> {student.challenges.join(", ")}</p>
        <p><strong>Strategy:</strong> {student.strategy.join(", ")}</p>
      </div>

      {/* Footer message */}
      <p className="italic font-semibold text-green-700 mt-4 border-l-4 border-green-500 pl-4">
        "{student.message}"
      </p>
    </div>
  );
}
