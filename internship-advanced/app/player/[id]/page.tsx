"use client"

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
    xxl: "text-2xl"
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
          <div className="text-primary text-2xl border-b border-[#e1e7ea] mb-8 pb-4 leading-normal font-bold">{book.title}</div>
          <div className={`whitespace-pre-line text-primary leading-[1.4] transition-all duration-200 ${sizeClasses[fontSize]}`}>{book.summary}</div>
        </div>
        <AudioControls book={book} />
      </div>
    </main>
  );
}