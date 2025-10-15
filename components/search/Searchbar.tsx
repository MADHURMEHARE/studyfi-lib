'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

// --- Placeholder Data Structure ---
// In a real application, this would come from an API or a large data file.
const EXAM_DATA = [
    { id: 'UPSC', name: 'UPSC Civil Services Exam', acronym: 'UPSC', category: 'UPSC' },
    { id: 'MPSC', name: 'MPSC Rajyaseva', acronym: 'MPSC', category: 'MPSC' },
    { id: 'IBPS_PO', name: 'IBPS Bank PO', acronym: 'IBPS PO', category: 'Banking' },
    { id: 'SSC_CGL', name: 'SSC CGL', acronym: 'SSC', category: 'SSC' },
    { id: 'RRB_NTPC', name: 'Railway RRB NTPC', acronym: 'RRB', category: 'Railways' },
    { id: 'CTET', name: 'CTET Teaching Exam', acronym: 'CTET', category: 'Teaching' },
    { id: 'IBPS_CLERK', name: 'IBPS Clerk', acronym: 'IBPS CLERK', category: 'Banking' },
    // ... add more data here
];

// --- Utility Function (Simulated Intelligent Search) ---
const getSuggestions = (query: string) => {
    if (!query) return { categories: [], exams: [] };

    const lowerQuery = query.toLowerCase();
    const categoriesSet = new Set<string>();
    const filteredExams: typeof EXAM_DATA = [];

    EXAM_DATA.forEach(exam => {
        const keywords = [exam.name, exam.acronym, exam.category].map(s => s.toLowerCase());

        if (keywords.some(k => k.includes(lowerQuery))) {
            filteredExams.push(exam);
            categoriesSet.add(exam.category);
        }
    });

    return {
        categories: Array.from(categoriesSet).filter(cat => cat.toLowerCase().includes(lowerQuery) || filteredExams.some(e => e.category === cat)),
        exams: filteredExams.slice(0, 5), // Limit specific exam results
    };
};

// --- Main Search Component ---

export function Searchbar() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter results only when the query changes
    const suggestions = useMemo(() => getSuggestions(query), [query]);
    const showSuggestions = isFocused && query.length > 1;

    // Handle clicks outside the component to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Placeholder function for handling selection
    const handleSelect = (type: 'category' | 'exam', name: string) => {
        console.log(`Selected: ${type} - ${name}`);
        setQuery(name); // Optionally set the input to the selected item
        setIsFocused(false);
        // In a real app, this would trigger navigation or filter the results page
    };

    // Helper to highlight matching text
    const highlightMatch = (text: string, match: string) => {
        if (!match) return <span>{text}</span>;
        const parts = text.split(new RegExp(`(${match})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === match.toLowerCase() ? (
                        <strong key={index} className="text-teal-600">
                            {part}
                        </strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="">
            <div 
                ref={searchRef} 
                className="relative w-full max-w-4xl mx-auto"
            >
                {/* 1. Search Bar Input */}
                <div className={`flex items-center mt-2 md-2 bg-white shadow-xl rounded-2xl border-2 transition-all ${isFocused ? 'border-orange-500' : 'border-orange-200'}`}>
                    <Search className="absolute left-4 h-3 w-3 text-orange-400" />
                    <input
                        type="text"
                        placeholder="Search by Exam Name (UPSC, MPSC, GATE) or Category (Banking, Railways...)"
                        className="w-full text-sm md:text-xl p-4 pl-12 rounded-2xl focus:outline-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onKeyDown={(e) => {
                            // Basic logic to handle enter key to submit search
                            if (e.key === 'Enter' && query.length > 1) {
                                handleSelect('category', query);
                            }
                        }}
                    />
                    <button
                        onClick={() => handleSelect('category', query)}
                        className="p-4 rounded-r-2xl bg-orange-600 text-white hover:bg-orange-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300 hidden sm:block"
                        aria-label="Find Exams"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* 2. Auto-Suggest Dropdown */}
                {showSuggestions && (suggestions.categories.length > 0 || suggestions.exams.length > 0) && (
                    <div className="absolute top-full mt-3 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-1">
                        
                        {/* CATEGORY Suggestions */}
                        {suggestions.categories.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                                    Top Categories
                                </div>
                                {suggestions.categories.map((category) => (
                                    <div
                                        key={category}
                                        onClick={() => handleSelect('category', category)}
                                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-teal-50 transition-colors"
                                    >
                                        <span className="text-gray-800 text-base font-medium">
                                            {highlightMatch(category, query)} Exams
                                        </span>
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                    </div>
                                ))}
                            </>
                        )}

                        {/* EXAM Suggestions */}
                        {suggestions.exams.length > 0 && (
                            <>
                                <div className={`px-4 py-2 text-xs font-semibold uppercase text-gray-500 ${suggestions.categories.length > 0 ? 'border-t border-gray-100' : ''}`}>
                                    Specific Exam Names
                                </div>
                                {suggestions.exams.map((exam) => (
                                    <div
                                        key={exam.id}
                                        onClick={() => handleSelect('exam', exam.name)}
                                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-teal-50 transition-colors"
                                    >
                                        <span className="text-gray-800 text-base">
                                            {highlightMatch(exam.name, query)}
                                        </span>
                                        <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-gray-100">
                                            {exam.category}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                        
                        {/* Full Search Action (Mobile/Small Query) */}
                         <div className="p-3 border-t border-gray-100">
                             <button
                                 onClick={() => handleSelect('category', query)}
                                 className="w-full text-center text-sm font-semibold text-teal-600 hover:text-teal-800"
                             >
                                 View all results for "{query}"
                             </button>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Usage Example (Conceptual) ---
/*
export default function ExamFinderPage() {
    return (
        <div>
            <IntelligentSearchBar />
            // <ResultsDashboard />  <- Phase 3 Component
        </div>
    );
}
*/