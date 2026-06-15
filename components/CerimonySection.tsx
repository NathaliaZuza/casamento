"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CerimonySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.8 },
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      )
      .fromTo(
        itemsRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
        "-=0.2",
      );
  }, []);

  const items = [
    {
      title: "Miniwedding íntimo",
      text: "com família e amigos próximos, em um ambiente acolhedor e cheio de significado",
    },
    {
      title: "Cerimônia e recepção",
      text: "acontecem no mesmo local, sem deslocamentos ou separações de ambientes",
    },
    {
      title: "Início pontual às 16h",
      text: "com duração aproximada de 3 horas de celebração",
    },
    {
      title: "Evento simples e leve",
      text: "sem custos adicionais de buffet ou taxas extras",
    },
    {
      title: "Traje esporte fino",
      text: "priorize conforto e bem-estar acima de qualquer formalidade",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 bg-[#fffcf7]"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        {/* TITLE */}
        <h2
          className="
                font-serif
                leading-[0.95]
                px-4

                text-[2rem]
                sm:text-[2.6rem]
                md:text-[3.6rem]
                lg:text-[6rem]

                max-[1285px]:text-[3rem]
            "
        >
          A cerimônia
        </h2>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          className="text-center text-neutral-600 max-w-2xl leading-relaxed"
        >
          Será uma cerimônia simples, leve e cheia de amor. Um momento íntimo e
          significativo, pensado para que todos estejam confortáveis e vivam
          cada instante com tranquilidade e presença.
        </p>

        {/* GRID CARDS */}
        <div className="w-full flex flex-col items-center mt-6">
          {/* 3 em cima */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {items.slice(0, 3).map((item, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="
                  p-7
                  border
                  border-black
                  bg-transparent
                  transition
                  text-center
                "
              >
                <p className="font-serif text-2xl text-black mb-3">
                  {item.title}
                </p>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* 2 embaixo centralizados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full md:w-[66%]">
            {items.slice(3).map((item, index) => (
              <div
                key={index}
                ref={addToRefs}
                className="
                  p-7
                  border
                  border-black
                  bg-transparent
                  transition
                  text-center
                "
              >
                <p className="font-serif text-2xl text-black mb-3">
                  {item.title}
                </p>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* IMAGE */}
        <div ref={imageRef}>
          <div className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden mt-[40px]">
            <img
              src="/images/cerimonia.jpg"
              alt="Cerimônia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
