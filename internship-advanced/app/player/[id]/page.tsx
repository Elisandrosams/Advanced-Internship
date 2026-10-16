"use client";

import SideBar from "@/Components/sidebar";
import SearchBar from "@/Components/searchbar";
import LoginModal from "@/Components/loginModal";
import AudioControls from "@/Components/audioPlayer";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Player() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, subscriptionPlan, fontSize } = useAuth();
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState<any>([]);

  const sizeClasses = {
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xxl: "text-2xl",
  };

  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`,
        );
        const data = await response.json();
        setBook(data);
      };
      fetchBook();
    }
  }, [bookId]);

  return (
    <main>
      <SideBar />
      <SearchBar />
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="relative w-full overflow-y-auto h-[calc(100vh-160px)]">
        <div className="whitespace-pre-line py-6 pr-6 pl-43 max-w-200 mx-auto">
          {!book?.title ? (
            <div className="flex h-64 w-full items-center justify-center">
              <svg
                className="h-10 w-10 animate-spin text-primary"
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <>
              <div className="text-primary text-2xl border-b border-[#e1e7ea] mb-8 pb-4 leading-normal font-bold">
                {book.title}
              </div>
              <div
                className={`whitespace-pre-line text-primary leading-[1.4] transition-all duration-200 ${sizeClasses[fontSize]}`}
              >
                {book.summary}
              </div>
            </>
          )}
        </div>
        <AudioControls book={book} />
      </div>
    </main>
  );
}
