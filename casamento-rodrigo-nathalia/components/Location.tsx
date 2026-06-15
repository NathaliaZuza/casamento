"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".location-item"),
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
    bg-[#f8f4ef]
    pt-24
    md:pt-40

    pb-10
    md:pb-16
  "
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p
          className="
            location-item

            uppercase
            tracking-[4px]
            md:tracking-[8px]

            text-xs
            md:text-sm

            text-neutral-500
          "
        >
          LOCAL DA CERIMÔNIA
        </p>

        <h2
          className="
            location-item

            mt-8

            font-serif

            text-[3rem]
            md:text-[6rem]

            leading-[0.95]
          "
        >
          Sítio
          <br />
          Geranium
        </h2>

        <p
          className="
            location-item

            mt-8

            text-lg
            md:text-xl

            text-neutral-700
          "
        >
          Taguatinga • Distrito Federal
        </p>

        <p
          className="
            location-item

            mt-4

            text-neutral-600

            tracking-[2px]
          "
        >
          06 de Agosto de 2026 • 16h00
        </p>
      </div>
    </section>
  );
}
