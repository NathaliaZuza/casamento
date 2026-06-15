"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import gsap from "gsap";
import PixModal from "./PixModal";
import ThankYouModal from "./ThankYouModal";

type Gift = {
  id: number;
  name: string;
  category: string;
  price: number;
  reserved: boolean;
};

type Props = {
  category: string;
  onClose: () => void;
};

export default function GiftModal({ category, onClose }: Props) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [thanksName, setThanksName] = useState("");
  const [thanksGift, setThanksGift] = useState("");

  useEffect(() => {
    loadGifts();

    gsap.fromTo(
      ".gift-modal-content",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
    );
  }, []);

  async function loadGifts() {
    const { data } = await supabase
      .from("gifts")
      .select("*")
      .eq("category", category)
      .order("price", {
        ascending: false,
      });

    setGifts(data || []);
    setLoading(false);
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]

        bg-black/50
        backdrop-blur-sm

        flex
        items-center
        justify-center

        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          gift-modal-content

          bg-[#f8f4ef]

          w-full
          max-w-4xl

          max-h-[90vh]

          overflow-y-auto

          p-8
          md:p-14
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div
          className="
            flex
            justify-between
            items-start
            mb-12
          "
        >
          <div>
            <p
              className="
                uppercase
                tracking-[6px]
                text-sm
                text-neutral-500
              "
            >
              LISTA DE PRESENTES
            </p>

            <h2
              className="
                mt-4
                font-serif
                text-[26px]
                md:text-6xl
                leading-[0.95]
              "
            >
              {category}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              text-3xl
              text-neutral-400

              hover:text-black

              transition
            "
          >
            ×
          </button>
        </div>

        {/* LOADING */}

        {loading && <div className="py-20 text-center">Carregando...</div>}

        {/* LISTA */}

        {!loading && (
          <div className="space-y-5">
            {gifts.map((gift) => (
              <div
                className={`
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between

                    gap-3 md:gap-6

                    border-b
                    border-neutral-200

                    pb-5
                `}
              >
                <div>
                  <h3
                    className="
                      text-xl
                      md:text-2xl
                    "
                  >
                    {gift.name}
                  </h3>

                  {gift.reserved && (
                    <p
                      className="
                        mt-2
                        text-green-700
                        uppercase
                        tracking-[2px]
                        text-xs
                      "
                    >
                      ✓ Presente recebido
                    </p>
                  )}
                </div>

                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    gap-2 md:gap-6
                    w-full md:w-auto
                "
                >
                  {!gift.reserved && (
                    <span
                      className="
                        text-base
                        md:text-xl
                        "
                    >
                      {gift.price > 0 ? formatPrice(gift.price) : "Valor Livre"}
                    </span>
                  )}

                  {!gift.reserved && (
                    <button
                      onClick={() => setSelectedGift(gift)}
                      className="
                        border
                        px-4 py-2
                        text-sm
                        md:text-base

                        w-full
                        max-w-[95px]
                        md:max-w-none

                        self-start
                        md:self-auto

                        text-left
                        md:text-center

                        hover:bg-black
                        hover:text-white

                        transition
                    "
                    >
                      Escolher
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TEXTO */}

        <div
          className="
            mt-14
            pt-10

            border-t
            border-neutral-200

            text-center
          "
        >
          <p
            className="
              max-w-2xl
              mx-auto

              text-neutral-600
              leading-relaxed
            "
          >
            Caso prefira entregar o presente pessoalmente ou conversar
            diretamente com os noivos, fique à vontade. Sua presença já será um
            presente muito especial.
          </p>
        </div>
      </div>
      {selectedGift && (
        <PixModal
          giftId={selectedGift.id}
          giftName={selectedGift.name}
          giftPrice={selectedGift.price}
          onClose={() => setSelectedGift(null)}
          onSuccess={(personName: string) => {
            setSelectedGift(null);
            loadGifts();

            setThanksName(personName);
            setThanksGift(selectedGift?.name || "");

            setShowThanks(true);
          }}
        />
      )}
      {showThanks && (
        <ThankYouModal
          name={thanksName}
          giftName={thanksGift}
          onClose={() => setShowThanks(false)}
        />
      )}
    </div>
  );
}
