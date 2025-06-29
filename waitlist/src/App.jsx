import React, { useState, useEffect } from "react";
import { addEmailToWaitlist } from "../lib/firebase";

const App = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sceneryImage, setSceneryImage] = useState("");
  const [characterImage, setCharacterImage] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Set the background images to the public paths
    setSceneryImage("/Scenery.png");
    setCharacterImage("/Character.png");
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value) || value === "");
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await addEmailToWaitlist(email);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || "Failed to join waitlist. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Scenery Background (Bottom Layer) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: sceneryImage
            ? `url('${sceneryImage}')`
            : "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          backgroundSize: "cover",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-2"></div>

      {/* Vignette overlay for image edges */}
      <div
        className="pointer-events-none absolute inset-0 z-3"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Main Title - Responsive with parallax overlap */}
          <h1
            className="text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold 
                         ml-0 sm:ml-0 md:ml-18 
                         mt-16 sm:mt-12 md:mt-[-130px] 
                         mb-60 sm:mb-6 md:mb-6 text-white font-[Anton] 
                         whitespace-normal sm:whitespace-normal md:whitespace-nowrap 
                         z-13 relative 
                         leading-tight sm:leading-tight md:leading-normal
                         px-2 sm:px-4 md:px-0"
          >
            You are the ruler today!
          </h1>

          {/* Character Image - Desktop positioning */}
          <div
            className="absolute inset-0 z-15 hidden sm:block"
            style={{
              backgroundImage: characterImage
                ? `url('${characterImage}')`
                : "none",
              backgroundSize: "contain",
              backgroundPosition: "150px 40px", // Right side for desktop
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.70) contrast(1) saturate(0.8)",
              opacity: "1",
            }}
          />

          {/* Mobile Character Image - Above title positioning */}
          <div
            className="absolute inset-0 z-15 block sm:hidden"
            style={{
              backgroundImage: characterImage
                ? `url('${characterImage}')`
                : "none",
              backgroundSize: "80%", // Adjusted size for mobile
              backgroundPosition: "30% 70%", // Centered horizontally, positioned above title
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.70) contrast(1) saturate(0.8)",
              opacity: "1",
            }}
          />

          {/* Signup Container - Responsive */}
          <div
            className="relative z-20 backdrop-blur-xl border border-white/20 rounded-2xl 
                          ml-10 sm:ml-0 md:ml-40 
                          mb-25 sm:mb-0 md:mb-40
                          p-4 sm:p-6 md:p-8 
                          mx-4 sm:mx-auto 
                          max-w-sm sm:max-w-md 
                          shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Pure glass effect */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-inner z-0" />
            <div className="relative z-10">
              {/* Signup Content */}
              {!isSubmitted ? (
                <>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 drop-shadow-lg">
                    Join the challenge!
                  </h2>
                  <p className="text-gray-200 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed drop-shadow">
                    Sign up for our newsletter to receive the latest updates and
                    insights straight to your inbox
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border-2 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-medium shadow-inner text-sm sm:text-base ${
                          !isValid
                            ? "border-red-400 animate-shake"
                            : "border-white/20"
                        }`}
                      />
                      {!isValid && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 ml-2 drop-shadow">
                          Please enter a valid email address
                        </p>
                      )}
                      {error && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 ml-2 drop-shadow">
                          {error}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-300 hover:via-pink-400 hover:to-yellow-300 text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl ring-2 ring-yellow-300/60 border-none relative z-30 focus:outline-none focus:ring-4 focus:ring-pink-400/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                      style={{
                        filter: "none",
                        backdropFilter: "none",
                        backgroundBlendMode: "normal",
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-yellow-300 border-t-pink-500 rounded-full animate-spin"></div>
                          <span>Joining...</span>
                        </div>
                      ) : (
                        "Join Waitlist"
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 drop-shadow">
                    Welcome, Ruler!
                  </h3>
                  <p className="text-gray-200 drop-shadow text-sm sm:text-base">
                    You've successfully joined our waitlist. We'll notify you
                    when it's time to claim your throne!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        /* Custom responsive styles */
        @media (max-width: 640px) {
          .character-mobile {
            background-position: left bottom !important;
            background-size: 55% !important;
          }
        }

        @media (max-width: 480px) {
          .character-mobile {
            background-position: left bottom !important;
            background-size: 50% !important;
            opacity: 0.7 !important;
            transform: translateY(30px) !important;
          }

          h1 {
            margin-top: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
