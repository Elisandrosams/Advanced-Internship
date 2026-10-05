"use client";

import BookCard from "@/Components/bookCard";

interface BookSliderProps {
  books: any[];
}

export default function BookSlider({ books }: BookSliderProps) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 mb-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}