import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

const LoginView = () => {
  const background = "/assets/loginBackground.jpg"; //in public folder
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    navigate("/artists");
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3 } },
  };

  const boxVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delay: 1.5, 
        duration: 0.8,
        ease: "easeInOut"
      } 
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-end pr-20 z-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Blurred overlay */}
      <div className="fixed inset-0 bg-black/40"></div>

    {/* Title and Logo */}
    <div className="absolute top-10 left-10 flex items-center space-x-4 mb-6 z-10">
      <TypeAnimation
        sequence={[
          'E',
          100, 'El',
          100, 'Ely',
          100, 'Elys',
          100, 'Elysi',
          100, 'Elysia',
          100, 'Elysian',
          100, 'Elysiana',
        ]}
        wrapper="div"
        cursor={false}
        repeat={0}
        className="text-7xl text-white font-waterfall"
      />
    </div>


      {/* Sign-in/Register Box */}
      <motion.div
        className="font-alexbrush relative w-[400px] bg-white/10 rounded-3xl backdrop-blur-xl p-8 flex flex-col items-center shadow-lg z-10"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Toggle Sign In & Register */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`w-[130px] h-[60px] rounded-2xl text-xl capitalize ${
              !isRegistering
                ? "bg-[#241103] text-white"
                : "bg-transparent border-2 border-white text-white"
            }`}
            onClick={() => setIsRegistering(false)}
          >
            Sign In
          </button>
          <button
            className={`w-[130px] h-[60px] rounded-2xl text-xl font-medium capitalize ${
              isRegistering
                ? "bg-[#241103] text-white"
                : "bg-transparent border-2 border-white text-white"
            }`}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col px-10">
          <input
            type="text"
            placeholder="Email"
            className="font-quicksand p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none backdrop-blur-sm border border-white/30 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="font-quicksand p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none backdrop-blur-sm border border-white/30 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering && (
            <input
              type="password"
              placeholder="Retype Password"
              className="font-quicksand p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none backdrop-blur-sm border border-white/30 mb-4"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          )}
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-lg mb-4">{error}</div>}

        {/* Confirm Button */}
        <button
          className="w-[260px] h-[60px] mt-6 bg-[#241103] rounded-2xl text-white text-xl capitalize"
          onClick={handleButtonClick}
        >
          {isRegistering ? "Register" : "Sign In"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LoginView;
