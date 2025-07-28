import { useLanguage } from "../hooks/useLanguage";

function LoginPage({
  onLogin,
  passwordInput,
  setPasswordInput,
  errorMessage,
  isFading,
}) {
  // Use the custom hook to get translation function and language state from context
  const { t, setLanguage } = useLanguage();

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
        <div className="flex justify-center gap-3 fixed right-5 top-3">
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
          <h1 className="text-[1.5rem] md:text-[2.2rem]">
            {t("login.welcome_title")}
          </h1>
          <p className="text-[0.8rem] px-5 md:text-[1.1rem]">
            {t("login.password_prompt")}
          </p>
          {/* Password input form */}
          <form
            onSubmit={onLogin}
            className="flex flex-col items-center mt-5 w-[90%] md:w-[500px]"
          >
            <input
              type="password"
              placeholder={t("login.password_placeholder")}
              className="border p-2 w-full text-center focus:outline-none"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-neutral-700 text-neutral-50 p-2 mt-2 hover:bg-neutral-600 cursor-pointer w-full"
            >
              {t("login.enter_button")}
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-600 font-[500]">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
