"use client";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import { BiCrown } from "react-icons/bi";
import { useState, useEffect } from "react";
import RotatingHeadings from "@/Components/RotatingHeadings";
import LoginModal from "@/Components/loginModal";
import PageFooter from "@/Components/footer";


export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const firstSet = [
    "Enhance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

  const secondSet = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Become a better caregiver",
    "Improve your mood",
    "Maximize your abilities",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  

  return (
    <main>
        <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        />
      <nav className="h-20 w-full">
        <div className="flex justify-between items-center h-full max-w-267.5 w-full  mx-auto px-6">
          <figure className="max-w-50">
            <img className="h-full w-full" src="/logo.png" alt="logo" />
          </figure>
          <ul className="flex gap-6 list-none">
            <li
              className="text-primary cursor-pointer duration-100 hover:text-active"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </li>
            <li className="hidden sm:flex text-primary cursor-not-allowed">
              About
            </li>
            <li className="hidden sm:flex text-primary cursor-not-allowed">
              Contact
            </li>
            <li className="hidden sm:flex text-primary cursor-not-allowed">
              Help
            </li>
          </ul>
        </div>
      </nav>
      <section id="landing">
        <div className="py-10 w-full">
          <div className="max-w-267.5 w-full  mx-auto px-6">
            <div className="flex">
              <div className="flex flex-col items-center text-center mx-auto max-w-135 sm:items-start sm:text-left sm:w-full">
                <div className="text-primary font-bold mb-6 text-2xl sm:text-[40px]">
                  Gain more knowledge <br className="hidden sm:block" />
                  in less time
                </div>
                <div className="text-secondary font-light text-[20px] mb-6 leading-8">
                  Great summaries for busy people,
                  <br className="hidden sm:block" />
                  individuals who barely have time to read,
                  <br className="hidden sm:block" />
                  and even people who don't like to read.
                </div>
                <button
                  className="flex items-center justify-center bg-highlight text-primary w-full h-10 rounded text-base min-w-45 max-w-75 hover:bg-active cursor-pointer active:translate-y-px transition-colors duration-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Login
                </button>
              </div>
              <figure className="hidden sm:flex w-full justify-end">
                <img
                  className="w-full h-full max-w-100"
                  src="/landing.png"
                  alt="landing"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="py-10 w-full">
          <div className="max-w-267.5 w-full  mx-auto px-6">
            <div className="text-2xl font-bold  text-primary text-center mb-8 sm:text-[32px]">
              Understand books in few minutes
            </div>
            <div className="grid grid-cols-1 gap-10 mb-24 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex mb-2 justify-center text-primary">
                  <AiFillFileText className="h-12 w-12 sm:h-15 sm:w-15" />
                </div>
                <div className="text-xl text-primary mb-4 font-medium sm:text-2xl">
                  Read or listen
                </div>
                <div className="text-sm text-secondary font-light sm:text-lg">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex mb-2 justify-center text-primary">
                  <AiFillBulb className="h-12 w-12 sm:h-15 sm:w-15" />
                </div>
                <div className="text-xl text-primary mb-4 font-medium sm:text-2xl">
                  Find your next read
                </div>
                <div className="text-sm text-secondary font-light sm:text-lg">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex mb-2 justify-center text-primary">
                  <AiFillAudio className="h-12 w-12 sm:h-15 sm:w-15" />
                </div>
                <div className="text-xl text-primary mb-4 font-medium sm:text-2xl">
                  Briefcasts
                </div>
                <div className="text-sm text-secondary font-light sm:text-lg">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-8 gap-8 last:mb-0 sm:flex-row sm:mb-24 sm:gap-20">
              <div className="w-full flex flex-col justify-center">
                <RotatingHeadings
                  phrases={firstSet}
                  activeIndex={activeIndex}
                />
              </div>
              <div className="flex flex-col w-full justify-center gap-6 py-10 px-6 bg-[#f1f6f4]">
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    93%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    96%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    90%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-8 gap-8 last:mb-0 sm:flex-row sm:mb-24 sm:gap-20">
              <div className="flex flex-col w-full justify-center gap-6 py-10 px-6 bg-[#f1f6f4] order-2 sm:order-0">
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    91%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    94%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-2xl mt-1 font-semibold text-[#0365f2]">
                    88%
                  </div>
                  <div className="text-base text-secondary font-light sm:text-xl">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-start order-1 sm:order-0 sm:items-end ">
                <RotatingHeadings
                  phrases={secondSet}
                  activeIndex={activeIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className="max-w-267.5 w-full  mx-auto px-6">
          <div className="py-10 w-full">
            <div className="font-bold text-3xl text-primary text-center mb-8">
              What our members say
            </div>
            <div className="max-w-150 mx-auto">
              <div className="font-light rounded mb-8 p-4 bg-[#fff3d7]">
                <div className="text-primary flex gap-2 mb-2">
                  <div>Hanna M.</div>
                  <div className="flex">
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                  </div>
                </div>
                <div className="text-sm tracking-tight leading-snug text-secondary sm:text-base">
                  This app has been a <b>game-changer</b> for me! It's saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers.
                </div>
              </div>
              <div className="font-light rounded mb-8 p-4 bg-[#fff3d7]">
                <div className="text-primary flex gap-2 mb-2">
                  <div>David B.</div>
                  <div className="flex">
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                  </div>
                </div>
                <div className="text-sm tracking-tight leading-snug text-secondary sm:text-base">
                  I love this app! It provides{" "}
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It's also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className="font-light rounded mb-8 p-4 bg-[#fff3d7]">
                <div className="text-primary flex gap-2 mb-2">
                  <div>Nathan S.</div>
                  <div className="flex">
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                  </div>
                </div>
                <div className="text-sm tracking-tight leading-snug text-secondary sm:text-base">
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>{" "}
                  Definitely worth downloading.
                </div>
              </div>
              <div className="font-light rounded mb-8 p-4 bg-[#fff3d7]">
                <div className="text-primary flex gap-2 mb-2">
                  <div>Ryan R.</div>
                  <div className="flex">
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                    <BsStarFill className="w-4 h-4 text-[#0564f1]" />
                  </div>
                </div>
                <div className="text-sm tracking-tight leading-snug text-secondary sm:text-base">
                  If you're a busy person who{" "}
                  <b>loves reading but doesn't have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book's content.
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center bg-highlight text-primary w-full h-10 rounded text-base min-w-45 max-w-75 hover:bg-active cursor-pointer active:translate-y-px transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className="py-10 w-full">
          <div className="max-w-267.5 w-full  mx-auto px-6">
            <div className="font-bold text-3xl text-primary text-center mb-8">
              Start growing with Summarist now
            </div>
            <div className="grid grid-cols-1 gap-6 sm:gap-10 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center bg-[#d7e9ff] rounded-xl p-6 pb-10">
                <div className="flex items-center gap-1 h-15">
                  <BiCrown className="text-[#0365f2] h-12 w-12" />
                </div>
                <div className="text-[32px] text-primary font-semibold mb-4 sm:text-[40px]">
                  3 Million
                </div>
                <div className="text-sm font-light text-secondary sm:text-base">
                  Downloads on all platforms
                </div>
              </div>
              <div className="flex flex-col items-center text-center bg-[#d7e9ff] rounded-xl p-6 pb-10">
                <div className="flex items-center gap-1 h-15">
                  <BsStarFill className="text-[#0365f2] h-5 w-5" />
                  <BsStarFill className="text-[#0365f2] h-5 w-5" />
                  <BsStarFill className="text-[#0365f2] h-5 w-5" />
                  <BsStarFill className="text-[#0365f2] h-5 w-5" />
                  <BsStarHalf className="text-[#0365f2] h-5 w-5" />
                </div>
                <div className="text-[32px] text-primary font-semibold mb-4 sm:text-[40px]">
                  4.5 Stars
                </div>
                <div className="text-sm font-light text-secondary sm:text-base">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="flex flex-col items-center text-center bg-[#d7e9ff] rounded-xl p-6 pb-10">
                <div className="flex items-center gap-1 h-15">
                  <RiLeafLine className="text-[#0365f2] h-12 w-12" />
                </div>
                <div className="text-[32px] text-primary font-semibold mb-4 sm:text-[40px]">
                  97%
                </div>
                <div className="text-sm font-light text-secondary sm:text-base">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageFooter />
    </main>
  );
}
