"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InteractiveDashboard } from "@/components/ui/interactive-dashboard";

export function AinomiqHeroScroll() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center w-full">
            <h1 className="text-3xl md:text-4xl font-semibold text-black mb-2">
              Scale your store with
            </h1>
            <span className="text-4xl md:text-[6rem] font-bold leading-none text-[#4A90E2] block">
              smart automations
            </span>
          </div>
        }
      >
        <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
          <InteractiveDashboard />
        </div>
      </ContainerScroll>
    </div>
  );
}
