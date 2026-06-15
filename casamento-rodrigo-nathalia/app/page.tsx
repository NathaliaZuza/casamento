"use client";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EditorialSection from "@/components/EditorialSection";
import Location from "@/components/Location";
import LocationMap from "@/components/LocationMap";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import GiftsSection from "@/components/GiftsSection";
import CerimonySection from "@/components/CerimonySection";
import PhotosSection from "@/components/PhotoSection";

export default function Page() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("gifts").select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);
  return (
    <main>
      <Hero />
      <Countdown />
      <EditorialSection />
      <Location />
      <LocationMap />
      <CerimonySection/>
      <GiftsSection />
      <PhotosSection/>
    </main>
  );
}
