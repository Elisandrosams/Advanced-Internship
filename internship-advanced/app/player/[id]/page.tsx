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
  const [sideBarOpen, setsideBarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-background text-foreground">
      {sideBarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={() => setsideBarOpen(false)}
        />
      )}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-100 bg-[#F7FAF9] transform transition-transform duration-300 ease-in-out
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:block md:transform-none md:translate-x-0 md:w-0
      `}
      >
        <SideBar />
      </div>
      <main className="flex-1 w-full">
        <SearchBar onMenuClick={() => setsideBarOpen(!sideBarOpen)} />
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <div className="relative w-full overflow-y-auto h-[calc(100vh-185px)]">
          <div className="whitespace-pre-line py-6 px-6 md:pr-6 md:pl-43 max-w-200 mx-auto">
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
    </div>
  );
}
