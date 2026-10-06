"use client";
import { useState } from "react";
import { initFirebase } from "@/app/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [signState, setSignState] = useState("Log in to Summarist");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const fire = initFirebase();
  const auth = getAuth(fire);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccessNavigation = () => {
    onClose();
    if (pathname === "/") {
      router.push("/For-You");
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        handleSuccessNavigation();
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result =await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        handleSuccessNavigation(); 
      }
    } catch (error) {
      console.error("Email Sign-Up Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setAuthError("");
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        handleSuccessNavigation();
      }
    } catch (error: any) {
      console.error("Email Auth Error:", error);
      setAuthError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsGuest = async () => {
    setAuthError("");
    setIsLoading(true);
    const guestEmail = "guest@summarist.com";
    const guestPassword = "GuestPassword123!";
    setEmail(guestEmail);
    setPassword(guestPassword);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        guestEmail,
        guestPassword,
      );
      if (result.user) {
        handleSuccessNavigation();
      }
    } catch (error: any) {
      console.error("Guest Auth Error:", error);
      setAuthError("Guest login is currently unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="absolute inset-0" onClick={onClose} />
          <div className="relative w-full max-w-100 bg-white rounded-lg shadow-xl px-8 pt-8 flex flex-col gap-5 z-10 mx-4 border border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-black-400 hover:text-gray-400 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center mb-1">
              <h3 className="text-xl font-bold text-primary mb-1">
                {signState}
              </h3>
              {authError && (
                <p className="text-red-500 text-xs mt-2 font-medium">
                  {authError}
                </p>
              )}
            </div>
            {signState === "Log in to Summarist" ? (
              <>
                <button
                  onClick={signInAsGuest}
                  className="w-full relative flex items-center justify-center gap-3 bg-[#3A579D] text-white rounded-sm py-2.5 px-4 text-sm font-medium hover:bg-[#25396b] transition-all cursor-pointer active:scale-[0.99]"
                >
                  <figure className="absolute left-1">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </figure>
                  <span>Login in as Guest</span>
                </button>
                <div className="flex items-center text-xs text-[#394547] my-0.5">
                  <div className="flex-1 h-px bg-[#BAC8CE]" />
                  <span className="px-3 font-medium tracking-wider text-[14px]">
                    or
                  </span>
                  <div className="flex-1 h-px bg-[#BAC8CE]" />
                </div>
              </>
            ) : (
              <></>
            )}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-sm py-2.5 px-4 text-sm font-medium text-white bg-[#4285F4] hover:bg-[#3367d6] transition-all cursor-pointer active:scale-[0.99] relative"
            >
              <figure className="bg-white px-1 py-1 absolute left-1 rounded-sm">
                <img className="h-6 w-6" src="/google.png" />
              </figure>
              {signState === "Log in to Summarist" ? (
                <span>Login in with Google</span>
              ) : (
                <span>Sign up with Google</span>
              )}
            </button>
            <div className="flex items-center text-xs text-[#394547] my-0.5">
              <div className="flex-1 h-px bg-[#BAC8CE]" />
              <span className="px-3 font-medium tracking-wider text-[14px]">
                or
              </span>
              <div className="flex-1 h-px bg-[#BAC8CE]" />
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (isLoading) return;
                if (signState === "Log in to Summarist") {
                  signInWithEmail(email, password);
                } else {
                  signUp(email, password);
                }
              }}
              className="flex flex-col gap-3 w-full"
            >
              <input
                type="email"
                placeholder="Email Address"
                className="border-2 border-gray-300 p-2.5 rounded-sm w-full text-sm outline-none focus:border-active transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-300 p-2.5 rounded-sm w-full text-sm outline-none focus:border-active transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-highlight text-primary py-2.5 rounded-sm cursor-pointer active:translate-y-px transition-colors duration-200 hover:bg-active mt-1"
              >
                {isLoading ? (
                  "Loading..."
                ) : signState === "Log in to Summarist" ? (
                  <span>Login</span>
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </form>
            {signState === "Log in to Summarist" ? (
              <button
                onClick={() => setSignState("Sign up to Summarist")}
                className="w-full h-8 text-center text-[#116be9] rounded-sm mb-1 font-light bg-[#F1F6F4] hover:bg-[#e1e9e8]"
              >
                Don't have an account?
              </button>
            ) : (
              <button
                onClick={() => setSignState("Log in to Summarist")}
                className="w-full h-8 text-center text-[#116be9] rounded-sm mb-1 font-light bg-[#F1F6F4] hover:bg-[#e1e9e8]"
              >
                Already have an account?
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
