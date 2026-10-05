"use client";

import SideBar from "@/Components/sidebar";
import SearchBar from "@/Components/searchbar";
import BookSlider from "@/Components/bookSlider";
import { useEffect, useState } from "react";

export default function ForYou() {
  const [selectedBook, setSelectedBook] = useState<any>({});
   const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
   const [suggestedBooks, setSuggestedBooks] = useState<any[]>([]);

  async function getSelectedBook() {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    );
    const data = await response.json();
    setSelectedBook(data[0]);
  }
  useEffect(() => {
    getSelectedBook();
  }, []);

  useEffect(() => {
    async function fetchRecommendedBooks() {
      const response = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      );
      const data = await response.json();
      setRecommendedBooks(data);
    }
    fetchRecommendedBooks();
  }, []);

  useEffect(() => {
    async function fetchSuggestedBooks() {
      const response = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
      );
      const data = await response.json();
      setSuggestedBooks(data);
    }
    fetchSuggestedBooks();
  }, []);

  return (
    <main>
      <SideBar />
      <SearchBar />
      <div className="max-w-267.5 w-full mx-auto pr-6 pl-56">
        <div className="w-full py-10">
          <div>
            <div className="text-[22px] font-bold text-primary mb-4">
              Selected just for you
            </div>
            <a className="flex justify-between w-full bg-[#fbefd6] rounded-sm p-6 mb-6 gap-6">
              <div className="text-primary w-2/5">{selectedBook.subTitle}</div>
              <div className="w-px bg-[#bac8ce]"></div>
              <div className="flex gap-4 w-3/5">
                <figure className="h-35 w-35 min-w-35">
                  <img
                    srcSet={selectedBook.imageLink}
                    className="h-full w-full"
                  />
                </figure>
                <div className="w-full">
                  <div className="font-semibold text-primary mb-2">
                    {selectedBook.title}
                  </div>
                  <div className="text-[#394547] text-sm mb-4">
                    {selectedBook.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center w-10 min-w-10 h-10">
                      <svg
                        className="h-full w-full bg-black text-white justify-center rounded-full items-center py-1 pl-1.5 pr-1"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                      </svg>
                    </div>
                    <div className="text-sm text-primary font-medium">
                      Length
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <div>
              <div className="text-[22px] font-bold text-primary mb-4">
                Recommended for you
              </div>
              <div className="font-light text-[#394547] mb-4">
                We think you'll like these
              </div>
              <BookSlider books={recommendedBooks} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-primary mb-4">
                Suggested Books
              </div>
              <div className="font-light text-[#394547] mb-4">
                Browse these books
              </div>
              <BookSlider books={suggestedBooks} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
