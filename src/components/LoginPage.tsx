import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

interface LoginPageProps {
  onLogin: (role: "guest" | "couple") => void;
  errorMessage: string;
}

function LoginPage({ onLogin, errorMessage }: LoginPageProps) {
  // Use the custom hook to get translation function and language state from context
  const { getTranslation, setLanguage } = useLanguage();

  // Function to handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Language selection UI */}
        <div className="fixed top-5 right-4 flex justify-center gap-3">
          <p
            className="cursor-pointer hover:text-neutral-400"
            onClick={() => handleLanguageChange("it")}
          >
            ITA
          </p>
          |
          <p
            className="cursor-pointer hover:text-neutral-400"
            onClick={() => handleLanguageChange("en")}
          >
            ENG
          </p>
        </div>
        <div
          className={`flex h-screen flex-col items-center justify-center gap-1 bg-neutral-50 text-center text-neutral-700`}
        >
          {/* Welcome message */}
          {/* Title */}
          <h1 className="great-vibes-font p-5 text-[3.2rem] md:text-[4.5rem] md:leading-[1em]">
            {getTranslation("login.welcome_title")}
          </h1>
          {/* Demo buttons */}
          <div className="flex w-[80%] items-center justify-center gap-[0.1em] min-[750px]:w-[700px]">
            <motion.button
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0.85 }}
              onClick={() => onLogin("guest")}
              className="flex-1 cursor-pointer bg-emerald-800 p-3 text-nowrap text-neutral-50 select-none"
            >
              {getTranslation("login.guest_button")}
            </motion.button>
            <motion.button
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0.85 }}
              onClick={() => onLogin("couple")}
              className="flex-1 cursor-pointer bg-cyan-800 p-3 text-nowrap text-neutral-50 select-none"
            >
              {getTranslation("login.couple_button")}
            </motion.button>
          </div>
          {errorMessage && (
            <p className="font-[500] text-red-600">{errorMessage}</p>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default LoginPage;
