"use client";

export default function LocationMap() {
  return (
    <section className="bg-[#f8f4ef] pb-24 md:pb-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-8">
        <div
          className="
            overflow-hidden
            rounded-[10px]

            border
            border-black/10

            bg-white/20
            backdrop-blur-xl
          "
        >
          <iframe
            title="Mapa Sítio Geranium"
            src="https://www.google.com/maps?q=Sítio+Geranium+Taguatinga+DF&output=embed"
            width="100%"
            height="600"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-neutral-600">
            Sítio Geranium • Núcleo Rural Taguatinga Chacara 29 • Taguatinga, Brasília - DF
          </p>

          <a
            href="https://maps.google.com/?q=Sítio+Geranium+Taguatinga+DF"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              mt-8

              rounded-full

              border
              border-black

              px-8
              py-4

              transition-all
              duration-300

              hover:bg-black
              hover:text-white
            "
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}