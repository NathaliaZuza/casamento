"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GiftModal from "./GiftModal";

type Gift = {
  id: number;
  name: string;
  category: string;
  price: number;
  reserved: boolean;
};

type Category = {
  name: string;
  count: number;
  image: string;
};

const categoryImages: Record<string, string> = {
  "PIX LIVRE": "/images/gifts/pix.jpg",

  QUARTO: "/images/gifts/quarto.jpg",

  SALA: "/images/gifts/sala.jpg",

  COZINHA: "/images/gifts/cozinha.jpg",

  ELETRODOMÉSTICOS: "/images/gifts/eletro.jpg",

  "BANHEIRO E LAVANDERIA": "/images/gifts/lavanderia.jpg",

  "ORGANIZAÇÃO E LIMPEZA": "/images/gifts/organizacao.jpg",
};

export default function GiftsSection() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadGifts();
  }, []);

  async function loadGifts() {
    const { data } = await supabase.from("gifts").select("*").order("name");

    setGifts(data || []);
  }

  const categories: Category[] = Object.entries(
    gifts.reduce(
      (acc, gift) => {
        if (!acc[gift.category]) {
          acc[gift.category] = 0;
        }

        acc[gift.category]++;

        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([name, count]) => ({
    name,
    count,
    image: categoryImages[name] || "/images/gifts/default.jpg",
  }));

  return (
    <>
      <section
        id="gifts"
        className="
          bg-[#f8f4ef]
          py-24
          md:py-40
        "
      >
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="text-center mb-20">
            <p
              className="
                uppercase
                tracking-[6px]
                text-neutral-500
                text-sm
              "
            >
              Escolha uma categoria
            </p>

            <h2
              className="
                mt-8
                font-serif
                text-[3rem]
                md:text-[6rem]
                leading-[0.95]
              "
            >
              Lista de presentes
            </h2>
          </div>

          <div
            className="
              grid
              md:grid-cols-3
              gap-12
            "
          >
            {categories.map((category, index) => {
              const isLast = index === categories.length - 1;

              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
        text-left group

        ${isLast ? "md:col-start-2" : ""}
      `}
                >
                  <div className="overflow-hidden mb-6">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="
            w-full
            h-[420px]
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
                    />
                  </div>

                  <h3 className="font-serif text-3xl mb-2">{category.name}</h3>

                  <p className="text-neutral-500">{category.count} itens</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedCategory && (
        <GiftModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}
