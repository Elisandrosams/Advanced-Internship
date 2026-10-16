"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAudioDuration } from "@/Components/audioDuration";
import { useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  averageRating?: number;
  audioLink?: string;
  subscriptionRequired?: boolean;
}

export default function BookCard({ book }: { book: Book }) {
  const { subscriptionPlan } = useAuth();
  const { duration } = useAudioDuration(book.audioLink);
  const [isImageLoading, setIsImageLoading] = useState(true);


  return (
    <>
    
    <Link
      href={`/book/${book.id}`}
      className="relative snap-start max-w-50 w-full pt-8 pb-3 px-3 rounded-sm"
    >
      {subscriptionPlan === "basic" && book.subscriptionRequired && (
        <div className="bg-primary w-fit h-4.5 absolute top-0 right-0 text-white text-[10px] flex items-center px-2 rounded-[20px]">
          Premium
        </div>
      )}
      <figure className="w-43 h-43 mb-2">
        {isImageLoading && <div className="h-full w-full bg-gray-300"></div>}
        {book.imageLink && (
          <img
            className={`w-full h-full object-cover ${isImageLoading ? 'hidden' : 'block'}`}
            src={book.imageLink}
            onLoad={() => setIsImageLoading(false)}
          />
        )}
      </figure>
      <div className="text-base text-primary font-bold mb-2">{book.title}</div>
      <div className="text-sm text-[#6b757b] font-light mb-2">
        {book.author}
      </div>
      <div className="text-sm text-[#394547] mb-2">{book.subTitle}</div>
      <div className="flex gap-2">
        <div className="flex items-center text-sm font-light gap-1 text-[#6b757b]">
          <div className="flex w-4 h-4">
            <svg
              className="w-full h-full"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
              <path d="M13 7h-2v6h6v-2h-4z"></path>
            </svg>
          </div>
          <div>{duration}</div>
        </div>
        <div className="flex items-center text-sm font-light gap-1 text-[#6b757b]">
          <div className="flex w-4 h-4">
            <svg
              className="w-full h-full"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
            </svg>
          </div>
          <div>{book.averageRating}</div>
        </div>
      </div>
    </Link>
    </>
  );
}
