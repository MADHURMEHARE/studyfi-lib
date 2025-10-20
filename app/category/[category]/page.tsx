"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StudentCard from "@/components/common/Studentcard";

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params.category; // could be string | string[]
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`/api/students?category=${category}`)
        .then(res => res.json())
        .then(data => setStudents(data));
    }
  }, [category]);

  const formattedCategory = category ? category.toUpperCase() : "";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{formattedCategory} Student Journeys</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {students.length === 0 ? (
          <p>No results found</p>
        ) : (
          students.map((s, idx) => <StudentCard key={idx} student={s} />)
        )}
      </div>
    </div>
  );
}
