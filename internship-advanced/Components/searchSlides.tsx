"use client";
import Link from "next/link";
import { useAudioDuration } from "@/Components/audioDuration";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
}
export default function SearchSlides({ books }: { books: Book[] }) {
  if (!Array.isArray(books)) return null;

  return (
    <>
      {books.map((book) => (
        <BookRowItem key={book.id} book={book} />
      ))}
    </>
  );
}

function BookRowItem({ book }: { book: Book }) {
  const { duration } = useAudioDuration(book.audioLink || "");

  return (
    <Link
      href={`/book/${book.id}`}
      key={book.id}
      className="flex items-center gap-6 p-4 h-30 border border-[#e1e7ea]"
    >
      <figure className="h-20 w-20 min-w-20">
        <img src={book.imageLink} className="h-full w-full" />
      </figure>
      <div>
        <div className="font-medium text-primary mb-2 text-base">
          {book.title}
        </div>
        <div className="text-[#6b757b] text-sm mb-2 font-light">
          {book.author}
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-light text-[#6b757b]">
            <div className="flex w-4 h-4">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="M13 7h-2v6h6v-2h-4z"></path>
              </svg>
            </div>
            <div>{duration}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
