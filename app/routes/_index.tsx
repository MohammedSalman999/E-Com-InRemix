import { SparklesCore } from "~/components/ui/sparkles";
import { motion } from "framer-motion";
import { useNavigate } from "@remix-run/react";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const handleAnimationComplete = () => {
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };
  return (
    <div className="w-full h-screen">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        className="fixed inset-0 bg-black flex items-center justify-center z-50 w-full h-screen"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white w-full h-screen"
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full absolute inset-0 h-screen">
              <SparklesCore
                id="tsparticlesfullpage"
                // background="#05032B"
                // background="#1C1847"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>

            <div className="relative w-full flex flex-col items-center gap-10">
              <div className="text-white text-8xl w-[78%] self-start">
                Welcome To
              </div>
              <div>
                <img
                  className="w-[963px] h-[235px] "
                  src="/images/logo.png"
                  alt="Placeholder"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
