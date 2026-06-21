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
      title: "Formato miniwedding",
      text: "Será uma cerimônia íntima, contando apenas com familiares e amigos próximos.",
    },
    {
      title: "Cerimônia e festa",
      text: "Acontecerão no mesmo local, sem necessidade de deslocamento para outro espaço.",
    },
    {
      title: "Horário",
      text: "A programação começa às 16h com duração de 3 horas",
    },
    {
      title: "Presentes",
      text: "A lista está aberta para quem quiser deixar uma contribuição com carinho.",
    },
    {
      title: "Código de vestimenta",
      text: "Escolhemos o traje esporte fino, trazendo elegância e conforto.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 bg-[#fffcf7]"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        <div ref={imageRef}>
          <div className="w-[220px] h-[220px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden mt-[0px]">
            <img
              src="/images/cerimonia.jpg"
              alt="Cerimônia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2
          className="
                font-serif
                leading-[0.95]
                text-[2rem]
                sm:text-[2.6rem]
                md:text-[3.6rem]
                lg:text-[6rem]
                text-center
                max-[1285px]:text-[3rem]
            "
        >
          Sobre a cerimônia
        </h2>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          className="text-center text-neutral-600 max-w-2xl leading-relaxed"
        >
          Reunimos abaixo as informações principais da celebração e da lista de presentes em um só lugar.
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
                  bg-[#f8f4ef]
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
                  bg-[#f8f4ef]
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
       
      </div>
    </section>
  );
}
