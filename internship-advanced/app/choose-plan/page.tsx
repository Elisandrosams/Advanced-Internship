"use client";
import FAQAccordion from "@/Components/FAQ";
import PageFooter from "@/Components/footer";
import { useState } from "react";



export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">(
    "yearly",
  );


  return (
    <div className="w-full">
      <div className="relative text-center w-full pt-12 mb-6">
        <div className="max-w-250 mx-auto text-white px-6 before:absolute before:top-0 before:left-0 before:-z-1 before:w-full before:h-full before:bg-primary before:rounded-br-[256px] before:rounded-bl-[256px]">
          <div className="text-5xl font-bold mb-10">
            Get unlimited access to many amazing books to read
          </div>
          <div className="text-xl mb-8">
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className="flex justify-center max-w-85 mx-auto overflow-hidden rounded-t-[180px]">
            <img src="/pricing-top.png" className="w-full h-full" />
          </figure>
        </div>
      </div>
      <div className="max-w-267.5 mx-auto px-6 w-full">
        <div className="w-full py-10">
          <div className="grid grid-cols-3 justify-center text-center gap-6 max-w-200 mx-auto mt-0 mb-14">
            <div>
              <figure className="flex justify-center text-primary mb-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="h-15 w-15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
                </svg>
              </figure>
              <div className="text-secondary leading-normal">
                <b>Key ideas in a few minutes</b> with many books to read
              </div>
            </div>
            <div>
              <figure className="flex justify-center text-primary mb-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-15 w-15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0H24V24H0z"></path>
                    <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
                  </g>
                </svg>
              </figure>
              <div className="text-secondary leading-normal">
                <b>3 million</b> people growing with summarist everyday
              </div>
            </div>
            <div>
              <figure className="flex justify-center text-primary mb-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="h-15 w-15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
                </svg>
              </figure>
              <div className="text-secondary leading-normal">
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className="text-primary text-center text-[32px] font-bold mb-8">
            Choose the plan that fits you
          </div>
          <div
            onClick={() => setSelectedPlan("yearly")}
            className={`flex gap-6 p-6 bg-[#f1f6f4] border-4 rounded cursor-pointer max-w-170 mx-auto transition-all duration-200 select-none ${
              selectedPlan === "yearly" ? "border-active" : "border-[#bac8ce]"
            }`}
          >
            <div className="relative w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
              {selectedPlan === "yearly" && (
                <div className="absolute w-2.5 h-2.5 bg-black rounded-full animate-fade-in" />
              )}
            </div>
            <div>
              <div className="text-primary text-lg font-semibold mb-2">
                Premium Plus Yearly
              </div>
              <div className="text-primary text-2xl font-bold mb-2">
                $99.99/year
              </div>
              <div className="text-[#6b757b] text-sm">
                7-day free trial included
              </div>
            </div>
          </div>
          <div className="text-sm text-[#6b757b] flex items-center gap-2 max-w-60 my-6 mx-auto before:grow before:h-px before:bg-[#bac8ce] after:grow after:h-px after:bg-[#bac8ce]">
            <div>or</div>
          </div>
          <div
            onClick={() => setSelectedPlan("monthly")}
            className={`flex gap-6 p-6 bg-[#f1f6f4] border-4 rounded cursor-pointer max-w-170 mx-auto transition-all duration-200 select-none ${
              selectedPlan === "monthly" ? "border-active" : "border-[#bac8ce]"
            }`}
          >
            <div className="relative w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
              {selectedPlan === "monthly" && (
                <div className="absolute w-2.5 h-2.5 bg-black rounded-full animate-fade-in" />
              )}
            </div>
            <div>
              <div className="text-primary text-lg font-semibold mb-2">
                Premium Monthly
              </div>
              <div className="text-primary text-2xl font-bold mb-2">
                $9.99/month
              </div>
              <div className="text-[#6b757b] text-sm">No trial included</div>
            </div>
          </div>
          <div className="bg-white sticky bottom-0 z-1 py-8 px-0 flex flex-col items-center gap-4">
            <span>
              <button className="bg-highlight text-primary w-75 h-10 rounded text-base transition:bg duration:200 flex items-center justify-center min-w-45 hover:bg-active cursor-pointer"
             >
                {selectedPlan === "yearly"
                  ? "Start your free 7-day trial"
                  : "Start your first month"}
              </button>
            </span>
            <div className="text-[12px] text-[#6b757b] text-center">
              {selectedPlan === "yearly"
                ? "Cancel your trial at any time before it ends, and you won't be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
          </div>
          <FAQAccordion />
        </div>
      </div>
      <PageFooter />
    </div>
  );
}
