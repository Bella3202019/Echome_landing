"use client";

import { cn } from "../utils";
import { lora } from "./fonts";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { GradientBlob } from "./components/GradientBlob";
import { GradientBlobRight } from "./components/GradientBlobRight";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLElement>(null);
  const secondSectionRef = useRef<HTMLElement>(null);
  const thirdSectionRef = useRef<HTMLElement>(null);
  const [showEmotions, setShowEmotions] = useState({
    happiness: false,
    nostalgia: false,
    regret: false,
    anxious: false
  });
  
  // Track which emotions have been manually toggled
  const [manualToggles, setManualToggles] = useState({
    happiness: false,
    nostalgia: false,
    regret: false,
    anxious: false
  });

  // 移动端卡片滑动状态
  const [activeCardIndex, setActiveCardIndex] = useState(1); // 0=左, 1=中, 2=右
  const [touchStartX, setTouchStartX] = useState(0);

  // 监控整体滚动以控制背景
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 背景颜色动画
  const backgroundColor = useTransform(
    mainScrollProgress,
    [0, 0.3, 0.35, 0.65, 0.7, 1],
    [
      "rgb(0, 0, 0)",     // 第一部分：黑色
      "rgb(0, 0, 0)",
      "rgb(10, 10, 15)",  // 过渡到第二部分：深蓝黑色
      "rgb(10, 10, 15)",
      "rgb(0, 0, 0)",     // 过渡到第三部分：回到黑色
      "rgb(0, 0, 0)"
    ]
  );

  // 监控第一个 section 的滚动
  const { scrollYProgress: firstSectionProgress } = useScroll({
    target: firstSectionRef,
    offset: ["start start", "end start"]
  });

  // 监控第二个 section 的滚动
  const { scrollYProgress: secondSectionProgress } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "end start"]
  });

  // 监控第三个 section 的滚动
  const { scrollYProgress: thirdSectionProgress } = useScroll({
    target: thirdSectionRef,
    offset: ["start end", "end start"]
  });

  // First section animations
  const firstSectionOpacity = useTransform(firstSectionProgress, [0, 0.5], [1, 0]);
  const firstSectionScale = useTransform(firstSectionProgress, [0, 0.5], [1, 0.98]);
  const firstSectionY = useTransform(firstSectionProgress, [0, 0.5], [0, 30]);

  // Second section animations
  const secondSectionOpacity = useTransform(secondSectionProgress, [0.2, 0.4], [0, 1]);
  const secondSectionY = useTransform(secondSectionProgress, [0.2, 0.4], [30, 0]);

  // Third section animations
  const cardsScale = useTransform(thirdSectionProgress, [0, 0.5], [0.9, 1]);
  const cardsOpacity = useTransform(thirdSectionProgress, [0, 0.5], [0.3, 1]);
  
  // 左卡片动画：从中心堆叠展开到左侧
  const leftCardX = useTransform(thirdSectionProgress, [0, 0.5], ['50%', '10%']);
  const leftCardRotate = useTransform(thirdSectionProgress, [0, 0.5], [5, -20]);
  const leftCardTranslateX = useTransform(thirdSectionProgress, [0, 0.5], ['-50%', '-50%']);
  const leftCardZ = useTransform(thirdSectionProgress, [0, 0.25, 0.5], [2, 1, 1]);

  // 中间卡片动画
  const centerCardY = useTransform(thirdSectionProgress, [0, 0.5], [-80, -130]);
  const centerCardZ = useTransform(thirdSectionProgress, [0, 0.25, 0.5], [3, 2, 2]);

  // 右卡片动画：从中心堆叠展开到右侧
  const rightCardX = useTransform(thirdSectionProgress, [0, 0.5], ['50%', '90%']);
  const rightCardRotate = useTransform(thirdSectionProgress, [0, 0.5], [-5, 20]);
  const rightCardTranslateX = useTransform(thirdSectionProgress, [0, 0.5], ['-50%', '-50%']);
  const rightCardZ = useTransform(thirdSectionProgress, [0, 0.25, 0.5], [1, 3, 1]);

  // Emotions effect
  useEffect(() => {
    const unsubscribe = secondSectionProgress.on("change", (latest) => {
      // 延迟显示时机
      const shouldShowAll = latest > 0.45 && latest < 0.8;
      setShowEmotions(prev => ({
        happiness: manualToggles.happiness || shouldShowAll,
        nostalgia: manualToggles.nostalgia || shouldShowAll,
        regret: manualToggles.regret || shouldShowAll,
        anxious: manualToggles.anxious || shouldShowAll
      }));

      if (!shouldShowAll) {
        setManualToggles({
          happiness: false,
          nostalgia: false,
          regret: false,
          anxious: false
        });
      }
    });

    return () => unsubscribe();
  }, [secondSectionProgress, manualToggles]);

  const toggleEmotion = (emotion: keyof typeof showEmotions) => {
    const currentScroll = secondSectionProgress.get();
    // 调整点击触发的范围
    if (currentScroll > 0.45 && currentScroll < 0.8) {
      setManualToggles(prev => ({
        ...prev,
        [emotion]: !prev[emotion]
      }));
      setShowEmotions(prev => ({
        ...prev,
        [emotion]: !prev[emotion]
      }));
    }
  };

  // 处理卡片触摸开始事件
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // 处理卡片触摸结束事件
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    
    // 如果滑动距离足够大，切换卡片
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // 向右滑动，显示上一张卡片
        setActiveCardIndex(prev => Math.max(prev - 1, 0));
      } else {
        // 向左滑动，显示下一张卡片
        setActiveCardIndex(prev => Math.min(prev + 1, 2));
      }
    }
  };

  // 切换到指定的卡片
  const goToCard = (index: number) => {
    setActiveCardIndex(index);
  };

  return (
    <motion.main 
      ref={containerRef}
      style={{
        backgroundColor,
        transition: "background-color 0.5s ease"
      }}
      className={cn(
        "flex flex-col",
        "text-white",
        "gap-0",
        lora.className,
      )}
    >
      {/* First Section */}
      <motion.section 
        ref={firstSectionRef}
        style={{ 
          opacity: firstSectionOpacity, 
          scale: firstSectionScale,
          y: firstSectionY
        }}
        className={cn(
          "relative h-screen",
          "flex flex-col items-center justify-center",
          "px-4 md:px-8",
          "overflow-hidden",
          "snap-start"
        )}
      >
        {/* Gradient Blobs */}
        <GradientBlob />
        <GradientBlobRight />

        {/* Content */}
        <motion.div 
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className={cn(
              "text-4xl sm:text-5xl md:text-7xl font-medium",
              "mb-8 sm:mb-12 leading-tight",
              "max-w-4xl"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            How well do you truly
            <br />
            know yourself?
          </motion.h1>
          
          <motion.p 
            className={cn(
              "text-base sm:text-lg md:text-xl",
              "text-zinc-400",
              "max-w-2xl mx-auto",
              "mb-8 sm:mb-12",
              "opacity-80",
              "px-4"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Echo - Where your voice finds its echo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link href="https://www.echome.chat/">
              <Button
                size="lg"
                className={cn(
                  "bg-white text-black hover:bg-zinc-200",
                  "rounded-full",
                  "px-6 py-5 sm:px-8 sm:py-6",
                  "text-base sm:text-lg",
                  "transition-all duration-300",
                )}
              >
                Meet Echo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className={cn(
            "absolute bottom-8",
            "flex flex-col items-center",
            "space-y-2"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className={cn(
            "w-1 h-12",
            "rounded-full",
            "bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          )} />
        </motion.div>
      </motion.section>

      {/* Section Divider */}
      <div className="h-[1vh] relative overflow-hidden">
        <motion.div
          style={{
            scaleY: useTransform(mainScrollProgress, [0.25, 0.35], [0, 1]),
            opacity: useTransform(mainScrollProgress, [0.25, 0.35], [0, 0.3])
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-800 to-transparent"
        />
      </div>

      {/* Second Section */}
      <motion.section
        ref={secondSectionRef}
        style={{
          opacity: secondSectionOpacity,
          y: secondSectionY,
        }}
        className={cn(
          "min-h-screen",
          "flex flex-col items-center",
          "px-4 md:px-8",
          "relative",
          "snap-start"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-20%" }}
          className="text-center mt-24 sm:mt-32 mb-16 sm:mb-32"
        >
          <h2 className={cn(
            "text-3xl sm:text-4xl md:text-6xl font-medium",
            "mb-8 sm:mb-12",
            "max-w-7xl",
            "px-2"
          )}>
            Echo remember what you might have missed
            <br className="hidden sm:block" />
            the moments that shape who you are
          </h2>
          <p className={cn(
            "text-base sm:text-lg md:text-xl",
            "text-zinc-400",
            "max-w-2xl mx-auto",
            "px-4"
          )}>
            Echo your feelings, thoughts and special moments through emotions
          </p>
        </motion.div>

        {/* Quotes Container */}
        <div className="relative w-full max-w-6xl mx-auto h-[650px] sm:h-[600px] mb-16 sm:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute md:left-[20%] sm:left-[10%] left-[5%] top-0 text-center flex flex-wrap md:flex-nowrap items-center gap-4 sm:gap-8 max-w-[90%] sm:max-w-none"
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showEmotions.happiness ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 blur-sm opacity-70" />
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-yellow-400 leading-none">Happiness</p>
            </motion.div>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-zinc-300 whitespace-pre-line cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleEmotion('happiness')}
            >
              My kid said 'I love you'
              <br />
              out of nowhere today.
              <br />
              It melted me.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute md:right-[10%] sm:right-[5%] right-[2%] md:top-[10%] top-[25%] text-center flex flex-wrap md:flex-nowrap items-center gap-4 sm:gap-8 max-w-[90%] sm:max-w-none"
          >
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-zinc-300 whitespace-pre-line cursor-pointer order-1 sm:order-1"
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleEmotion('nostalgia')}
            >
              I miss the noodles my
              <br />
              mom used to make.
            </motion.p>
            <motion.div 
              className="flex flex-col items-center order-2 sm:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showEmotions.nostalgia ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-400 blur-sm opacity-70" />
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-cyan-400 leading-none">Nostalgia</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute md:left-[5%] sm:left-[2%] left-[0%] md:bottom-[45%] bottom-[40%] text-center flex flex-wrap md:flex-nowrap items-center gap-4 sm:gap-8 max-w-[90%] sm:max-w-none"
          >
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showEmotions.regret ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-400 blur-sm opacity-70" />
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-pink-400 leading-none">Regret</p>
            </motion.div>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-zinc-300 whitespace-pre-line cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleEmotion('regret')}
            >
              I got home late again. I
              <br />
              didn't even notice
              <br />
              the sunset.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute md:right-[23%] sm:right-[15%] right-[5%] md:bottom-[35%] bottom-[15%] text-center flex flex-wrap md:flex-nowrap items-center gap-4 sm:gap-8 max-w-[90%] sm:max-w-none"
          >
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-zinc-300 whitespace-pre-line cursor-pointer order-1 sm:order-1"
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleEmotion('anxious')}
            >
              Everyone else seems to
              <br />
              be moving so fast. I'm
              <br />
              just trying to keep up.
            </motion.p>
            <motion.div 
              className="flex flex-col items-center order-2 sm:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showEmotions.anxious ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-400 blur-sm opacity-70" />
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-blue-400 leading-none">Anxious</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Divider */}
      <div className="h-[1vh] relative overflow-hidden">
        <motion.div
          style={{
            scaleY: useTransform(mainScrollProgress, [0.55, 0.65], [0, 1]),
            opacity: useTransform(mainScrollProgress, [0.55, 0.65], [0, 0.3])
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-800 to-transparent"
        />
      </div>

      {/* Third Section */}
      <motion.section
        ref={thirdSectionRef}
        className={cn(
          "min-h-screen",
          "flex flex-col items-center",
          "px-4 md:px-8",
          "pt-16 sm:pt-20 pb-10",
          "relative",
          "snap-start",
          "gap-0"
        )}
      >
        {/* Cards Container */}
        <div 
          className="relative w-full max-w-7xl mx-auto flex justify-center items-end" 
          style={{ height: '55vh', minHeight: '280px', maxHeight: '400px', perspective: '1000px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Cards - Hidden on Mobile */}
          <div className="hidden md:block w-full h-full relative">
            {/* Left Card */}
            <motion.div
              style={{
                position: 'absolute',
                left: leftCardX,
                x: leftCardTranslateX,
                rotate: leftCardRotate,
                scale: cardsScale,
                opacity: cardsOpacity,
                zIndex: leftCardZ,
                transformOrigin: 'center center',
              }}
              className="transform" 
            >
              <div className={cn(
                "bg-white rounded-3xl p-6",
                "w-[300px] h-[380px]",
                "flex flex-col",
                "shadow-lg",
                "transform hover:scale-105 transition-transform duration-300"
              )}>
                <div className="mb-4">
                  <div className="text-black/60">Fri, Jan 12</div>
                </div>
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-yellow-300/90 to-yellow-400/90 mb-6 opacity-95 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                </div>
                <p className="text-black/80 text-lg">
                  Morning run in Mission Bay as usual, meditated by the water, the breeze was so clean
                </p>
              </div>
            </motion.div>

            {/* Center Card */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                x: '-50%',
                y: centerCardY,
                scale: cardsScale,
                opacity: cardsOpacity,
                zIndex: centerCardZ,
                transformOrigin: 'center center',
              }}
              className="transform" 
            >
              <div className={cn(
                "bg-white rounded-3xl p-6",
                "w-[300px] h-[380px]",
                "flex flex-col",
                "shadow-lg",
                "transform hover:scale-105 transition-transform duration-300"
              )}>
                <div className="mb-4">
                  <div className="text-black/60">Wed, April 2</div>
                </div>
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-emerald-400/90 to-emerald-500/90 mb-6 opacity-95 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                </div>
                <p className="text-black/80 text-lg">
                  Acai bowl, morning workout, the day my love arrives from across the ocean
                </p>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              style={{
                position: 'absolute',
                left: rightCardX,
                x: rightCardTranslateX,
                rotate: rightCardRotate,
                scale: cardsScale,
                opacity: cardsOpacity,
                zIndex: rightCardZ,
                transformOrigin: 'center center',
              }}
              className="transform" 
            >
              <div className={cn(
                "bg-white rounded-3xl p-6",
                "w-[300px] h-[380px]",
                "flex flex-col",
                "shadow-lg",
                "transform hover:scale-105 transition-transform duration-300"
              )}>
                <div className="mb-4">
                  <div className="text-black/60">Fri, April 4</div>
                </div>
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-blue-300/90 to-blue-400/90 mb-6 opacity-95 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                </div>
                <p className="text-black/80 text-lg">
                  Evening walk in Marina, the sunset painting the sky in colors I've never seen 
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mobile Swipeable Cards - Shown only on mobile */}
          <div className="md:hidden w-full h-full relative flex items-center justify-center">
            <div className="relative w-[250px] h-[290px]">
              {/* Left Card (Card 0) */}
              <motion.div
                animate={{
                  x: activeCardIndex === 0 ? 0 : activeCardIndex === 1 ? -25 : -50,
                  y: activeCardIndex === 0 ? 0 : activeCardIndex === 1 ? 0 : 0,
                  scale: activeCardIndex === 0 ? 1 : 0.9,
                  rotate: activeCardIndex === 0 ? -20 : -10,
                  opacity: activeCardIndex === 0 ? 1 : 0.7,
                  zIndex: activeCardIndex === 0 ? 3 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 w-full h-full"
                style={{ transformOrigin: 'center center' }}
              >
                <div className={cn(
                  "bg-white rounded-3xl p-3",
                  "w-full h-full",
                  "flex flex-col",
                  "shadow-lg",
                  "transform hover:scale-105 transition-transform duration-300"
                )}>
                  <div className="mb-2">
                    <div className="text-black/60 text-sm">Fri, Jan 12</div>
                  </div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-yellow-300/90 to-yellow-400/90 mb-2 opacity-95 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                  </div>
                  <p className="text-black/80 text-sm">
                    Morning run in Mission Bay as usual, meditated by the water, the breeze was so clean
                  </p>
                </div>
              </motion.div>

              {/* Center Card (Card 1) */}
              <motion.div
                animate={{
                  x: activeCardIndex === 0 ? 25 : activeCardIndex === 1 ? 0 : -25,
                  y: activeCardIndex === 1 ? -10 : 0,
                  scale: activeCardIndex === 1 ? 1 : 0.9,
                  rotate: 0,
                  opacity: activeCardIndex === 1 ? 1 : 0.7,
                  zIndex: activeCardIndex === 1 ? 3 : 2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 w-full h-full"
                style={{ transformOrigin: 'center center' }}
              >
                <div className={cn(
                  "bg-white rounded-3xl p-3",
                  "w-full h-full",
                  "flex flex-col",
                  "shadow-lg",
                  "transform hover:scale-105 transition-transform duration-300"
                )}>
                  <div className="mb-2">
                    <div className="text-black/60 text-sm">Wed, April 2</div>
                  </div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-emerald-400/90 to-emerald-500/90 mb-2 opacity-95 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                  </div>
                  <p className="text-black/80 text-sm">
                    Acai bowl, morning workout, the day my love arrives from across the ocean
                  </p>
                </div>
              </motion.div>

              {/* Right Card (Card 2) */}
              <motion.div
                animate={{
                  x: activeCardIndex === 2 ? 0 : activeCardIndex === 1 ? 25 : 50,
                  y: activeCardIndex === 2 ? 0 : activeCardIndex === 1 ? 0 : 0,
                  scale: activeCardIndex === 2 ? 1 : 0.9,
                  rotate: activeCardIndex === 2 ? 20 : 10,
                  opacity: activeCardIndex === 2 ? 1 : 0.7,
                  zIndex: activeCardIndex === 2 ? 3 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 w-full h-full"
                style={{ transformOrigin: 'center center' }}
              >
                <div className={cn(
                  "bg-white rounded-3xl p-3",
                  "w-full h-full",
                  "flex flex-col",
                  "shadow-lg",
                  "transform hover:scale-105 transition-transform duration-300"
                )}>
                  <div className="mb-2">
                    <div className="text-black/60 text-sm">Fri, April 4</div>
                  </div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-blue-300/90 to-blue-400/90 mb-2 opacity-95 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50" />
                  </div>
                  <p className="text-black/80 text-sm">
                    Evening walk in Marina, the sunset painting the sky in colors I've never seen 
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Card Indicators */}
            <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-2">
              <button 
                onClick={() => goToCard(0)}
                className={`w-2 h-2 rounded-full ${activeCardIndex === 0 ? 'bg-white' : 'bg-white/40'}`}
                aria-label="Go to card 1"
              />
              <button 
                onClick={() => goToCard(1)}
                className={`w-2 h-2 rounded-full ${activeCardIndex === 1 ? 'bg-white' : 'bg-white/40'}`}
                aria-label="Go to card 2"
              />
              <button 
                onClick={() => goToCard(2)}
                className={`w-2 h-2 rounded-full ${activeCardIndex === 2 ? 'bg-white' : 'bg-white/40'}`}
                aria-label="Go to card 3"
              />
            </div>
          </div>
        </div>

        {/* Bottom Title and CTA */}
        <div className="flex flex-col items-center mt-2 sm:mt-12">
          <motion.h2
            style={{
              opacity: cardsOpacity,
              scale: cardsScale,
            }}
            className={cn(
              "text-3xl sm:text-4xl md:text-6xl",
              "text-center",
              "-mt-0 sm:-mt-15",
              "px-4",
              lora.className
            )}
          >
            Echo is your memory
            <br />
            to your true self
          </motion.h2>
          
          <motion.div
            style={{
              opacity: cardsOpacity,
              scale: cardsScale,
            }}
            className="mt-6 sm:mt-12"
          >
            <Link href="https://www.echome.chat/">
              <Button
                size="lg"
                className={cn(
                  "bg-white text-black hover:bg-zinc-200",
                  "rounded-full",
                  "px-6 py-4 sm:px-8 sm:py-6",
                  "text-base sm:text-lg",
                  "transition-all duration-300",
                  "shadow-lg hover:shadow-xl",
                  "transform hover:scale-105"
                )}
              >
                Create your echo moments now
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Link */}
      <Link 
        href="/about"
        className={cn(
          "fixed top-6 right-8",
          "text-sm font-medium text-white/80 hover:text-white",
          "transition-colors duration-200",
          "z-50"
        )}
      >
        About
      </Link>

      {/* Echome Logo */}
      <div className="fixed top-4 left-8 z-50">
        <Link 
          href="https://echome.im" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // 如果希望同时也导航到链接，可以使用延时

          }}
        >
          <Image 
            src="/assets/Echome_logo_square.png"
            alt="Echome Logo"
            width={40}
            height={12}
            className="object-contain"
          />
        </Link>
      </div>

    </motion.main>
  );
} 