"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EditorialSection() {
  const bgImageRef = useRef<HTMLDivElement>(null);

  const float1Ref = useRef<HTMLImageElement>(null);
  const float2Ref = useRef<HTMLImageElement>(null);
  const float3Ref = useRef<HTMLImageElement>(null);
  const float4Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (bgImageRef.current) {
        bgImageRef.current.style.transform = `translateY(${scrollY * 0.05}px) scale(1.04)`;
      }

      if (float1Ref.current) {
        float1Ref.current.style.transform = `translateY(${scrollY * -0.03}px)`;
      }

      if (float2Ref.current) {
        float2Ref.current.style.transform = `translateY(${scrollY * 0.04}px)`;
      }

      if (float3Ref.current) {
        float3Ref.current.style.transform = `translateY(${scrollY * -0.06}px)`;
      }

      if (float4Ref.current) {
        float4Ref.current.style.transform = `translateY(${scrollY * 0.02}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#f8f4ef] ">
      {/* TOPO */}

      <div className="relative mx-auto max-w-[1400px] px-8">
        <img
          ref={float1Ref}
          src="/images/floating-1.jpg"
          alt=""
         className="
          absolute
          left-[-15px]
          top-2
          w-14
          md:w-48
          object-cover
        "
        />

        <img
          ref={float2Ref}
          src="/images/floating-2.jpg"
          alt=""
         className="
  absolute
  right-[-30px]
  top-[-80px]
  w-20
  md:w-48
  object-cover
"
        />

        <div className="mx-auto max-w-5xl text-center">
          <p
            className="
              uppercase
              tracking-[4px]
              md:tracking-[8px]
              text-xs
              md:text-base
              text-neutral-500
              mb-6
              md:mb-8
            "
          >
            SOMOS UM SÓ
          </p>

          <h2
            className="
              font-serif
              leading-[0.95]
              text-[2.2rem]
              sm:text-[3rem]
              md:text-[4.5rem]
              lg:text-[6rem]
              px-4
            "
          >
            "Assim, eles já não são dois, mas sim uma só carne." Marcos 10:8
          </h2>
        </div>

        <img
          src="/images/floating-3.jpg"
          alt=""
          className="
            absolute
            left-20
            bottom-[-210px]
            w-28
            md:w-44
            object-cover
          "
        />
      </div>

      {/* ESPAÇO */}

      <div className="h-24 md:h-52" />

      {/* BLOCO FOTO */}

      {/* BLOCO FOTO */}

      <div className="w-full">
        <div className="relative w-full">
          <img
            ref={float4Ref}
            src="/images/floating-4.jpg"
            alt=""
            className="
            absolute
            right-[-20px]
            md:right-[4%]
            top-[-60px]
            md:top-[-90px]
            z-30
            w-24
            md:w-64
            shadow-xl
            object-cover
          "
          />
          {/* BACKGROUND */}
          <div className="overflow-hidden">
            <div
              ref={bgImageRef}
              className="h-[1200px] md:h-[1400px]"
              style={{
                backgroundImage: "url('/images/background-editorial.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(100%) brightness(0.55)",
              }}
            />
          </div>
          {/* CONTEÚDO */}

          <div
            className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        pt-32
      "
          >
            <div
              className="
              w-[220px]
              sm:w-[260px]
              md:w-[400px]
              h-[320px]
              sm:h-[420px]
              md:h-[570px]
                "
            >
              <img
                src="/images/vertical-photo.jpg"
                alt=""
                className="
                  w-full
                  h-auto
                  scale-[1.25]
                  translate-y-[-14%]
                "
              />
            </div>

            <div
              className="
          mt-20
          max-w-5xl
          px-8
          text-center
          text-white
        "
            >
              <h3
                className="
            font-serif
            text-4xl
            md:text-7xl
            leading-[1]
            mb-10
          "
              >
                Nem o tempo nem os acontecimentos foram capazes de nos fazer esquecer um do outro
              </h3>

              <p
                className="
            mx-auto
            max-w-2xl
            text-lg
            md:text-xl
            leading-relaxed
            text-white/90
          "
              >
                Nos encontramos ainda crianças. A inocência e a pureza criaram os contornos do nosso amor. E hoje, com nossa história e maturidade, decidimos finalizar essa pintura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
