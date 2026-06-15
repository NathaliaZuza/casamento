"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function CountCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="count-item">
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <h2
          className="
            font-light
            leading-none

            text-[3.5rem]
            sm:text-[4.5rem]
            md:text-[7rem]
          "
        >
          {String(value).padStart(2, "0")}
        </h2>

        <p
          className="
            mt-4

            uppercase
            tracking-[4px]

            text-xs
            md:text-sm

            text-neutral-600
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Countdown() {
  const sectionRef = useRef<HTMLElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date(
      "2026-08-06T16:00:00"
    );

    const updateCountdown = () => {
      const now = new Date();

      const diff =
        weddingDate.getTime() - now.getTime();

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (diff / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (diff / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.from(".count-item", {
          opacity: 0,
          y: 60,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
        });

        observer.disconnect();
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="
        bg-[#f8f4ef]
        py-24
        md:py-40
      "
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        {/* HEADER */}

        <div className="mb-16 md:mb-24 text-center">
          <h2
            className="
              mt-0
              font-serif
              leading-[1]
              text-[2rem]
              sm:text-[2.5rem]
              md:text-[3rem]
            "
          >
             A CONTAGEM REGRESSIVA COMEÇOU
          </h2>
        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4

            gap-5
            md:gap-2
            sm: gap-2
          "
        >
          <CountCard
            value={timeLeft.days}
            label="Dias"
          />

          <CountCard
            value={timeLeft.hours}
            label="Horas"
          />

          <CountCard
            value={timeLeft.minutes}
            label="Minutos"
          />

          <CountCard
            value={timeLeft.seconds}
            label="Segundos"
          />
        </div>
      </div>
    </section>
  );
}