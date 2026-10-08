'use client';
import { useState } from 'react';

export default function FAQAccordion() {
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  
  const faqData = [
    {
      question: "How does the 7-day trial work?",
      answer: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."
    },
    {
      question: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
    },
    {
      question: "What's included in the Premium plan?",
      answer: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {faqData.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-[#ddd] mb-2 overflow-hidden">
            <div 
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center cursor-pointer py-6 px-0 gap-2 select-none"
            >
              <div className="font-medium text-2xl relative mb-0 text-primary">
                {item.question}
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className={`w-6 h-6 min-w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                ></path>
              </svg>
            </div>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-h-px pb-6 text-secondary text-base leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
