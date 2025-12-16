import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const {logout} = useAuth();
  const logOutHandler = (e) => {
    e.preventDefault();
    logout();
  }
  return (

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="h-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white flex justify-center items-center shadow-lg z-10"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.08 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.2,
          }}
          className="text-3xl font-extrabold drop-shadow-lg flex items-center gap-2"
        >
          <span className="animate-bounce">📬</span>
          Query360: AI Complaint Manager
        </motion.h1>
        <button className="ml-auto mr-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e)=>logOutHandler(e)}>Logout</button>
      </motion.nav>

  );
}
