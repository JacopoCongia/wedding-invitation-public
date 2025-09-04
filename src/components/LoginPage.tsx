import { useLanguage } from "../hooks/useLanguage";

interface LoginPageProps {
  onLogin: (role: "guest" | "couple") => void;
  errorMessage: string;
  isFading: boolean;
}

function LoginPage({ onLogin, errorMessage, isFading }: LoginPageProps) {
  // Use the custom hook to get translation function and language state from context
  const { getTranslation, setLanguage } = useLanguage();

  // Function to handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <>
      <div
        className={`${
          isFading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-400`}
      >
        {/* Language selection UI */}
        <div className="flex justify-center gap-3 fixed right-4 top-5">
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
          className={`flex flex-col items-center justify-center text-center gap-1 h-screen bg-neutral-50 text-neutral-700`}
        >
          {/* Welcome message */}
          {/* Title */}
          <h1 className="great-vibes-font md:leading-[1em] text-[3.2rem] p-5 md:text-[4.5rem]">
            {getTranslation("login.welcome_title")}
          </h1>
          {/* Demo buttons */}
          <div className="flex gap-[0.1em] items-center justify-center w-full min-[600px]:w-[700px]">
            <button
              onClick={() => onLogin("guest")}
              className="p-5 text-nowrap flex-1 min-[600px]:rounded-l-[0.6em] bg-emerald-800 text-neutral-50 select-none cursor-pointer hover:opacity-90"
            >
              {getTranslation("login.guest_button")}
            </button>
            <button
              onClick={() => onLogin("couple")}
              className="p-5 text-nowrap flex-1 min-[600px]:rounded-r-[0.6em] bg-cyan-800 text-neutral-50 select-none cursor-pointer hover:opacity-90"
            >
              {getTranslation("login.couple_button")}
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-600 font-[500]">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
