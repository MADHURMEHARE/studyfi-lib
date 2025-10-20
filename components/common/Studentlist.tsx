"use client";
import { useState, useEffect } from "react";
import StudentCard from "./Studentcard";

export default function StudentList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category) params.append("category", category);

    fetch(`/api/Wstudent?${params.toString()}`)
      .then(res => res.json())
      .then(data => setStudents(data));

    setCurrentPage(1); // Reset page on new search/filter
  }, [query, category]);

  // Pagination logic
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Search + Category */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, exam, or background..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        >
          <option value="">All Categories</option>
          <option value="UPSC">UPSC</option>
          <option value="SSC">SSC</option>
          <option value="NEET">NEET</option>
        </select>
      </div>

      {/* Student Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {currentStudents.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No results found</p>
        ) : (
          currentStudents.map((s, idx) => <StudentCard key={idx} student={s} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 border rounded-lg bg-white hover:bg-blue-500 hover:text-white disabled:opacity-50 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 border rounded-lg transition ${
                currentPage === idx + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 border rounded-lg bg-white hover:bg-blue-500 hover:text-white disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
