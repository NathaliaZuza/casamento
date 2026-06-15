"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const photos = [
  "/images/gallery/11.jpg",
  "/images/gallery/21.jpg",
  "/images/gallery/31.jpg",
  "/images/gallery/41.jpg",
  "/images/gallery/51.jpg",
  "/images/gallery/61.jpg",
  "/images/gallery/71.jpg",
  "/images/gallery/81.jpg",
  "/images/gallery/91.jpg",
  "/images/gallery/101.jpg",
];

export default function PhotosSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

function scroll(direction: "left" | "right") {
  if (!trackRef.current) return;

  const amount = 320;

  trackRef.current.scrollLeft +=
    direction === "left" ? -amount : amount;
}

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full py-24 bg-[#fffaf4] relative"
      >
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-6xl">
              Te esperamos com alegria
            </h2>

            <p className="text-neutral-600 mt-4 max-w-xl mx-auto">
              Estamos preparando tudo com muito carinho e esperamos vocês com
              muita felicidade neste dia especial.
            </p>
          </div>

          {/* CAROUSEL */}
          <div className="relative px-10">
            {/* LEFT ARROW */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white w-10 h-10"
            >
              ‹
            </button>

            {/* TRACK */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {photos.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(src)}
                  className="min-w-[260px] h-[260px] cursor-pointer"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover rounded-none"
                  />
                </div>
              ))}
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white w-10 h-10"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
        >
          <img
            src={activeImage}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}