"use client";

import SideBar from "@/Components/sidebar";
import SearchBar from "@/Components/searchbar";
import LoginModal from "@/Components/loginModal";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading, subscriptionPlan } = useAuth();
  const [sideBarOpen, setsideBarOpen] = useState(false);

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
            md:relative md:block md:transform-none md:translate-x-0 md:w-0
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
        <div className="w-full py-10">
          <div className="max-w-267.5 w-full mx-auto px-6">
            <div className="text-left border-b border-[#e1e7ea] pb-4 font-bold text-[32px] text-primary mb-8">
              Settings
            </div>
            {!user && !loading && (
              <div className="max-w-115 flex flex-col items-center mx-auto">
                <img src="/login.png" className="w-full h-full" />
                <div className="text-primary text-2xl font-bold text-center mb-4">
                  Log in to your account to see your details.
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-highlight text-primary h-10 rounded text-base w-fit min-w-45 transition-bg duration-200 hover:bg-active"
                >
                  Log In
                </button>
              </div>
            )}
            {loading && (
              <div>
                <div className="flex flex-col gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
                  <div className="h-6 w-48 bg-gray-300"></div>
                  <div className="h-5 w-32 bg-gray-300 mt-1"></div>
                </div>

                <div className="flex flex-col gap-2 pb-6">
                  <div className="h-6 w-24 bg-gray-300"></div>
                  <div className="h-5 w-56 bg-gray-300 mt-1"></div>
                </div>
              </div>
            )}

            {user && (
              <>
                <div className="flex flex-col gap-2 mb-8 border-b border-[#e1e7ea] pb-6">
                  <div className="text-lg font-bold text-primary">
                    Your Subscription plan
                  </div>
                  <div className="text-primary">{subscriptionPlan}</div>
                  {subscriptionPlan === "basic" && (
                    <Link
                      href="/choose-plan"
                      className="flex items-center justify-center bg-highlight text-primary h-10 rounded text-base w-25 min-w-45 transition-bg duration-200 hover:bg-active"
                    >
                      Upgrade to Premium
                    </Link>
                  )}
                </div>
                <div className="flex flex-col gap-2 pb-6">
                  <div className="text-lg font-bold text-primary">Email</div>
                  <div className="text-primary">{user?.email}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
