"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
  {
    src: "/images/hero-1.jpg",
    mobilePosition: "65% center",
  },
  {
    src: "/images/hero-2.jpg",
    mobilePosition: "57% center",
  },
  {
    src: "/images/hero-3.jpg",
    mobilePosition: "34% center",
  },
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.from(contentRef.current?.children ?? [], {
      opacity: 0,
      y: 80,
      stagger: 0.15,
      duration: 1.4,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      imageRefs.current.forEach((image) => {
        if (!image) return;

        image.style.transform = `translateY(${scrollY * 0.12}px) scale(1.08)`;
      });

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeImage = (index: number) => {
    if (index === activeImage) return;

    imageRefs.current.forEach((image, i) => {
      if (!image) return;

      gsap.to(image, {
        opacity: i === index ? 1 : 0,
        duration: 1.2,
        ease: "power2.inOut",
      });
    });

    setActiveImage(index);
  };

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeImage + 1) % images.length;

      changeImage(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeImage]);

  return (
    <section
      className="
        relative
        h-[100svh]
        overflow-hidden
        "
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
          className="
            absolute
            inset-0
            scale-[1.08]
            bg-center
            bg-cover
        "
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: isMobile ? image.mobilePosition : "center",
            backgroundSize: "cover",
            opacity: index === 0 ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/35" />

      <div
        ref={contentRef}
        className="
            relative
            z-10
            flex
            h-[100svh]
            flex-col
            items-center
            justify-center
            px-6
            md:px-8
            text-center
            text-white
            "
      >
        <p
          className="
    mb-4
    uppercase
    tracking-[4px]
    md:tracking-[8px]
    text-xs
    md:text-sm
  "
        >
          Casamento de
        </p>

        <h1
          className="
    font-serif
    leading-[0.95]
    text-[52px]
    sm:text-[70px]
    md:text-[90px]
    lg:text-[112px]
    break-words
  "
        >
          <span className="block leading-[100%]">Rodrigo Vilefort </span>
          <span
            className="
    block
    leading-[100%]
    text-[40px]
    sm:text-[50px]
    md:text-[60px]
    lg:text-[72px]
  "
          >
            &{" "}
          </span>
          <span className="block leading-[100%]"> Nathália Zuza</span>
        </h1>

        <p
          className="
    mt-6
    md:mt-8
    text-base
    md:text-lg
    tracking-[2px]
  "
        >
          06 de Agosto de 2026 • 16h
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => changeImage(index)}
            className={`
                h-3
                w-3
                rounded-full
                border
                border-white
                transition-all
                duration-300
                ${activeImage === index ? "bg-white" : "bg-transparent"}
            `}
          />
        ))}
      </div>

      <div className="h-14 w-[1px] bg-white/60 animate-pulse" />
    </section>
  );
}
