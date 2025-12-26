import { useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { AnimatePresence } from "motion/react";
import LoginPage from "./components/LoginPage";
import GuestPage from "./components/GuestPage";
import CouplePage from "./components/CouplePage";

function App() {
  const { getTranslation } = useLanguage();

  const [loggedInView, setLoggedInView] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle the login logic, depending on the password input
  const handleLogin = (role: "guest" | "couple") => {
    if (role === "guest") {
      setLoggedInView("guest");
      setErrorMessage(""); // Clear error message
    } else if (role === "couple") {
      setLoggedInView("couple");
      setErrorMessage(""); // Clear error message
    } else {
      setErrorMessage(getTranslation("login.incorrect_password"));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {loggedInView === "login" && (
        <LoginPage
          key="login"
          onLogin={handleLogin}
          errorMessage={errorMessage}
        />
      )}

      {loggedInView === "guest" && (
        <GuestPage
          setLoggedInView={setLoggedInView}
          key="guest"
        />
      )}

      {loggedInView === "couple" && (
        <CouplePage
          setLoggedInView={setLoggedInView}
          key="couple"
        />
      )}
    </AnimatePresence>
  );
}

export default App;
