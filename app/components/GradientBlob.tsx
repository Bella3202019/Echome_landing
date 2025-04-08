import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const GradientBlob = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div 
      className="absolute"
      style={{
        width: "607.928px",
        height: "249.242px",
        flexShrink: 0,
        right: "65%",
        bottom: "60%",
        fill: "url(<path-to-image>) lightgray 50% / cover no-repeat",
        filter: "blur(7.307744979858398px)",
        x,
        opacity,
      }}
    >
      <Image
        src="/assets/gradient-blob.svg"
        alt="Gradient Background"
        fill
        priority
        className="object-cover"
      />
    </motion.div>
  );
}; 