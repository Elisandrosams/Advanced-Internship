"use client";

import SideBar from "@/Components/sidebar";
import SearchBar from "@/Components/searchbar";
import BookSlider from "@/Components/bookSlider";
import LoginModal from "@/Components/loginModal";
import Link from "next/link";
import { useAudioDuration } from "@/Components/audioDuration";
import { useEffect, useState } from "react";

export default function ForYou() {
  const [selectedBook, setSelectedBook] = useState<any>({});
  const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<any[]>([]);
  const { duration } = useAudioDuration(selectedBook.audioLink);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="flex min-h-screen bg-background text-foreground overflow-x-hidden">
      {sideBarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
          onClick={() => setsideBarOpen(false)}
        />
      )}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-50 bg-[#F7FAF9] transform transition-transform duration-300 ease-in-out
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:block md:transform-none md:translate-x-0
      `}
      >
        <SideBar onOpenLogin={() => setIsModalOpen(true)}/>
      </div>
      <main className="left-0 w-full absolute top-0 h-full md:left-50 md:w-[calc(100%-200px)]">
        <LoginModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
        <SearchBar onMenuClick={() => setsideBarOpen(!sideBarOpen)} />
        <div className="max-w-267.5 w-full mx-auto px-6">
          <div className="w-full py-10">
            <div>
              <div className="text-[22px] font-bold text-primary mb-4">
                Selected just for you
              </div>
              {!selectedBook?.id ? (
                <div className="w-full h-47 bg-gray-300"></div>
              ) : (
                <Link
                  href={`/book/${selectedBook.id}`}
                  className="flex flex-col md:flex-row md:justify-between w-full bg-[#fbefd6] rounded-sm p-6 mb-6 gap-6"
                >
                  <div className="text-primary md:w-2/5">
                    {selectedBook.subTitle}
                  </div>
                  <div className="w-px bg-[#bac8ce]"></div>
                  <div className="flex gap-4 w-3/5">
                    <figure className="h-35 w-35 min-w-35">
                      {isImageLoading && (
                        <div className="h-full w-full bg-gray-300"></div>
                      )}
                      {selectedBook.imageLink && (
                        <img
                          srcSet={selectedBook.imageLink}
                          className={`w-full h-full object-cover ${isImageLoading ? "hidden" : "block"}`}
                          onLoad={() => setIsImageLoading(false)}
                        />
                      )}
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
                          {duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
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
    </div>
  );
}
