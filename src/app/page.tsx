"use client";

import React from "react";
import { ArrowRight, Leaf, Bird, Fish, TreePine, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import "@/app/globals.css";
import { Lightbulb, Sliders, TrendingUp } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-900/60 p-6 border border-gray-700 rounded-xl shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-green-600/30">
    <Icon size={36} className="text-green-400 mb-4" />
    <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 py-10 font-sans relative overflow-hidden">
      <div className="max-w-5xl w-full z-10">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight">NPTEL</h1>
            <h2 className="text-xl md:text-2xl font-light text-gray-300">
              Conservation Economics Quiz App
            </h2>
          </div>


          {/* <div className="hidden md:flex space-x-4">
            <Leaf className="text-green-400" size={48} />
            <TreePine className="text-green-600" size={48} />
            <Bird className="text-blue-400" size={48} />
            <Fish className="text-blue-600" size={48} />
          </div> */}
        </header>


        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={Lightbulb}
            title="Learn Smarter"
            description="Focus on what matters most and skip the noise. Build confidence with every quiz."
          />
          <FeatureCard
            icon={Sliders}
            title="Adapts to You"
            description="Questions adjust to your level. Strengthen weak spots and track real growth."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Stay Motivated"
            description="See your progress and unlock small wins that keep you moving forward."
          />
        </section>




        {/* CTA + External Link */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          {/* Modes Group */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:justify-start w-full">
            <Link
              href="/quiz"
              className="inline-flex items-center bg-green-600 text-white font-semibold py-4 px-10 text-lg rounded-full shadow-lg hover:bg-green-700 transition-all group transform hover:scale-105"
            >
              Test Mode
              <ArrowRight
                className="ml-3 transition-transform transform group-hover:translate-x-1"
                size={20}
              />
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center bg-blue-600 text-white font-semibold py-4 px-10 text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all group transform hover:scale-105"
            >
              Practice Mode
              <ArrowRight
                className="ml-3 transition-transform transform group-hover:translate-x-1"
                size={20}
              />
            </Link>
          </div>

          {/* LinkedIn Link aligned to the right */}
          <div className="flex justify-end w-full">
            <a
              href="https://www.linkedin.com/in/arnav-borse-37a003255/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin className="mr-2" size={24} />
              Connect on LinkedIn
            </a>
          </div>
        </section>




        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed text-center ">
          Master the NPTEL Conservation Economics course and ace your FAT exam with our
          specialized quiz application designed for serious learners.
        </p>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        <div className="absolute -left-64 -top-64 w-128 h-128 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -right-64 -bottom-64 w-128 h-128 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
