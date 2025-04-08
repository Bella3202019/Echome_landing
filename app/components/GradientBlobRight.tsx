import { motion, useScroll, useTransform } from "framer-motion";

export const GradientBlobRight = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div 
      className="absolute right-[0%] bottom-[15%]"
      style={{
        opacity,
        x,
      }}
    >
      <svg width="760" height="298" viewBox="0 0 760 298" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_208_183)">
          <path 
            d="M728 167.072C728 243.148 576.839 264.107 508.487 264.107C440.348 273.795 333.009 243.148 268.601 243.148C194.554 243.148 38.5722 247.805 32 201.229C32 157.191 136.918 142.186 207.479 117.391C277.053 92.9417 343.524 32 437.507 32C550.55 32 728 79.6121 728 167.072Z" 
            fill="url(#gradient)"
            fillOpacity="0.9"
          />
        </g>
        <defs>
          <filter id="filter0_f_208_183" x="0" y="0" width="760" height="298" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_208_183"/>
          </filter>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}; 