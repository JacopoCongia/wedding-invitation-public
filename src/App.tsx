import React, { useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import LoginPage from "./components/LoginPage";
import GuestPage from "./components/GuestPage";

function App() {
  const { getTranslation } = useLanguage();

  const [passwordInput, setPasswordInput] = useState("");
  const [loggedInView, setLoggedInView] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  // Transition state
  const [isFading, setIsFading] = useState(false);

  // Temporary solution, to be replaced with env variables!!!
  const GUEST_PASSWORD = "guestsecret";
  const COUPLE_PASSWORD = "couplesecret";

  // Handle the login logic, depending on the password input
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === GUEST_PASSWORD) {
      setIsFading(true);
      setTimeout(() => {
        setLoggedInView("guest");
        // setIsFading(false); // Reset fading state
        setPasswordInput(""); // Clear input on error
        setErrorMessage(""); // Clear error message
      }, 400);
    } else if (passwordInput === COUPLE_PASSWORD) {
      setIsFading(true);
      setTimeout(() => {
        setLoggedInView("couple");
        // setIsFading(false); // Reset fading state
        setPasswordInput(""); // Clear input on error
        setErrorMessage(""); // Clear error message
      }, 400);
    } else {
      setErrorMessage(getTranslation("login.incorrect_password"));
      setPasswordInput(""); // Clear input on error
    }
  };

  return (
    <>
      {loggedInView === "login" && (
        <LoginPage
          onLogin={handleLogin}
          passwordInput={passwordInput}
          setPasswordInput={setPasswordInput}
          errorMessage={errorMessage}
          isFading={isFading}
        />
      )}

      {loggedInView === "guest" && (
        <GuestPage
          setLoggedInView={setLoggedInView}
          setIsFading={setIsFading}
        />
      )}
    </>
  );
}

export default App;
