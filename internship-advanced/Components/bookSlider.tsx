"use client";

import BookCard from "@/Components/bookCard";

interface BookSliderProps {
  books: any[];
}

export default function BookSlider({ books }: BookSliderProps) {

  const isLoading = books.length === 0 || !books;

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 mb-8">
      {isLoading ? Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="relative snap-start max-w-50 w-full h-auto pt-8 pb-3 px-3 rounded-sm animate-pulse">
          <div className="w-43 h-43 mb-2 bg-gray-300"></div>
          <div className="w-43 h-4 mb-2 bg-gray-300"></div>
          <div className="w-25 h-4 mb-2 bg-gray-300"></div>
          <div className="w-43 h-4 mb-2 bg-gray-300"></div>
          <div className="w-30 h-4 mb-2 bg-gray-300"></div>
        </div>
      )) : (
      books.map((book) => (
        <BookCard key={book.id} book={book} />
      )))}
    </div>
  );
}