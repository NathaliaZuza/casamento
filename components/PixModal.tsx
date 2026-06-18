"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import pixImg from "../public/images/qrcode-pix.png";
import gsap from "gsap";

type Props = {
  giftId: number;
  giftName: string;
  giftPrice: number;
  giftCategory: string;
  onClose: () => void;
  onSuccess: (name: string) => void;
};

export default function PixModal({
  giftId,
  giftName,
  giftPrice,
  giftCategory,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"pix" | "presencial" | "contato" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const pixKey = "61986373130";

  const isPixLivre = giftCategory === "PIX LIVRE";

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 },
    );

    gsap.fromTo(
      modalRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
    );
  }, []);

  const closeAnimated = () => {
    gsap.to(modalRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  };

  async function confirmGift() {
    if (!isPixLivre && !type) {
      setError("Escolha como deseja presentear os noivos.");
      return;
    }

    if (!name.trim()) {
      setError("Por favor, informe seu nome.");
      return;
    }

    setLoading(true);
    setError("");

    let error;

    if (isPixLivre) {
      const result = await supabase.from("pix_contributions").insert({
        gift_id: giftId,
        contributor_name: name,
      });

      console.log("RESULT", result);

      error = result.error;
    } else {
      const result = await supabase
        .from("gifts")
        .update({
          reserved: true,
          reserved_by: name,
          reserved_type: type,
        })
        .eq("id", giftId);

      error = result.error;
    }

    setLoading(false);

    if (error) {
      setError("Erro ao salvar.");
      return;
    }

    closeAnimated();

    setTimeout(() => {
      onSuccess(name);
    }, 300);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-3 md:p-6"
      ref={overlayRef}
      onClick={closeAnimated}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-[#f8f4ef]
          w-full max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          p-6 md:p-10
          flex flex-col gap-3
        "
      >
        {/* HEADER */}
        <div>
          <h2 className="text-2xl md:text-4xl font-serif mb-3">
            {giftName} ·{" "}
            {!isPixLivre ? (
              <span className="mt-2">R$ {giftPrice.toFixed(2)}</span>
            ) : null}
          </h2>

          <div>
            <input
              className="
              w-full
              border
              bg-white
              p-3
              text-sm
              rounded-lg
              outline-none
              focus:ring-0
              focus:border-neutral-400
            "
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
          </div>
          {!isPixLivre ? (
            <p className="text-neutral-600 text-sm md:text-base mt-6">
              Escolha como deseja presentear os noivos
            </p>
          ) : null}
        </div>

        {!isPixLivre && (
          <div className="grid gap-3 text-sm">
            {[
              { key: "pix", label: "PIX" },
              { key: "presencial", label: "Entregar pessoalmente" },
              { key: "contato", label: "Conversar com os noivos" },
            ].map((opt) => (
              <label
                key={opt.key}
                className={`
                flex items-center gap-3
                p-2
                border
                rounded-lg
                cursor-pointer
                transition
                ${
                  type === opt.key
                    ? "border-neutral-900 bg-white"
                    : "border-neutral-300 hover:bg-white/60"
                }
              `}
              >
                <input
                  type="radio"
                  checked={type === opt.key}
                  onChange={() => setType(opt.key as any)}
                  className="accent-black"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* PIX */}
        {(type === "pix" || isPixLivre) && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-neutral-500 mt-1">
              Escaneie ou copie a chave PIX
            </p>

            <div className="bg-white p-2 rounded-xl">
              <img
                src={pixImg.src}
                className="w-[120px] md:w-[150px]"
                alt="QR Code PIX"
              />
            </div>

            {/* CHAVE PIX */}
            <div className="w-full space-y-2">
              <p className="text-xs text-neutral-500">Chave PIX</p>

              <div className="flex gap-2">
                <div className="flex-1 bg-white p-2 text-xs rounded-lg">
                  {pixKey}
                </div>

                <button
                  onClick={() => handleCopy(pixKey)}
                  className="px-4 border bg-white text-sm rounded-lg hover:bg-neutral-100"
                >
                  Copiar
                </button>
              </div>
            </div>

            {copied && <p className="text-green-600 text-sm">PIX copiado!</p>}
          </div>
        )}

        {/* BOTÃO */}
        <button
          onClick={confirmGift}
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-lg
            hover:opacity-90
            transition
          "
        >
          {loading
            ? "Salvando..."
            : isPixLivre || type === "pix"
              ? "Já realizei o PIX"
              : "Confirmar presente"}
        </button>
      </div>
    </div>
  );
}
