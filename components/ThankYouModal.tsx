"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  onClose: () => void;
  name: string;
  giftName: string;
};

export default function ThankYouModal({
  onClose,
  name,
  giftName,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 }
    );

    gsap.fromTo(
      modalRef.current,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const close = () => {
    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.2,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={close}
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-[#f8f4ef]
          max-w-md
          w-full
          p-10
          rounded-xl
          text-center
        "
      >
        <h2 className="text-3xl font-serif mb-4">
          Obrigado, {name} 🤍
        </h2>

        <p className="text-neutral-700">
          O presente <strong>{giftName}</strong> foi recebido com muito carinho.
        </p>

        <p className="mt-4 text-sm text-neutral-500">
          Sua contribuição faz parte da nossa história.
        </p>

        <button
          onClick={close}
          className="mt-8 px-6 py-3 bg-black text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}