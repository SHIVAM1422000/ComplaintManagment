// export default function Navbar() {
//   return (
//     <div className="h-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center px-6 shadow-lg">
      
//       <h1 className="text-2xl font-bold">📬 Audience Query Manager</h1>
//     </div>
//   );
// }


import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 16 }}
      className="h-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white flex justify-center items-center shadow-lg z-10"
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.08 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
        className="text-3xl font-extrabold drop-shadow-lg flex items-center gap-2"
      >
        <span className="animate-bounce">📬</span>
        Audience Query Manager
      </motion.h1>
    </motion.nav>
  );
}
