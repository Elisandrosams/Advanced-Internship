"use client";
import { useState, useEffect } from "react";
import SearchSlides from "./searchSlides";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(searchQuery)}`,
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("No books found", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="border-[#e1e7ea] border h-20 z-1">
      <div className="relative flex items-center justify-between h-full px-8 mx-auto max-w-267.5">
        <figure></figure>
        <div className="flex items-center gap-6 w-full max-w-85">
          <div className="flex items-center w-full">
            <div className="relative flex items-center w-full gap-2">
              <input
                type="text"
                placeholder="Search for books"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-10 border border-[#e1e7ea] bg-[#f1f6f4] rounded-lg px-4 text-[13px]  text-primary outline-hidden"
              />
              <div className="flex absolute items-center h-full right-2 justify-end pl-2 border-l-[#e1e7ea] border-l text-primary">
                <svg
                  className="w-6 h-6"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                </svg>
              </div>
            </div>
          </div>
          {searchQuery.trim() &&
            (isLoading ? (
              <></>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col max-w-110 w-full max-h-160 ml-auto overflow-y-auto absolute top-26 right-6 bg-white border border-[#e1e7ea] shadow-[0_0_6px_0_rgba(0,0,0,0.14)] z-60">
                <SearchSlides books={searchResults} />
              </div>
            ) : (
              <div className="flex flex-col max-w-110 w-full max-h-160 ml-auto overflow-y-auto absolute top-26 right-6 bg-white border border-[#e1e7ea] shadow-[0_0_6px_0_rgba(0,0,0,0.14)] z-60">
                <div className="text-black text-base font-medium p-4">
                  No books found
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
