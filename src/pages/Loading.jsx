import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200">
      {/* 3D Cube-like Spinner */}
      <motion.div
        className="w-16 h-16 bg-black rounded-sm shadow-lg"
        animate={{ rotateY: 360, rotateX: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      
      {/* Optional: Loading text */}
      <motion.p
        className="text-black text-xl font-semibold ml-4"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
