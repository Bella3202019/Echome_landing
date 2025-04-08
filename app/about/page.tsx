"use client";

import { cn } from "@/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <motion.main 
      className="h-screen bg-black text-white flex flex-col items-center justify-center relative px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-6 left-8 z-50"
      >
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </Link>

      {/* Monologue Image */}
      <motion.div
        className="relative h-[calc(100vh-8rem)] flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/assets/Monologue.png"
          alt="Echo Monologue"
          width={1920}
          height={1080}
          className="w-auto h-full object-contain"
          priority
        />
      </motion.div>
    </motion.main>
  );
} 