import { useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import LoginPage from "./components/LoginPage";
import GuestPage from "./components/GuestPage";
import CouplePage from "./components/CouplePage";

function App() {
  const { getTranslation } = useLanguage();

  const [loggedInView, setLoggedInView] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  // Transition state
  const [isFading, setIsFading] = useState(false);

  // Handle the login logic, depending on the password input
  const handleLogin = (role: "guest" | "couple") => {
    if (role === "guest") {
      setIsFading(true);
      setTimeout(() => {
        setLoggedInView("guest");
        // setIsFading(false); // Reset fading state
        setErrorMessage(""); // Clear error message
      }, 400);
    } else if (role === "couple") {
      setIsFading(true);
      setTimeout(() => {
        setLoggedInView("couple");
        // setIsFading(false); // Reset fading state
        setErrorMessage(""); // Clear error message
      }, 400);
    } else {
      setErrorMessage(getTranslation("login.incorrect_password"));
    }
  };

  return (
    <>
      {loggedInView === "login" && (
        <LoginPage
          onLogin={handleLogin}
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

      {loggedInView === "couple" && (
        <CouplePage
          setLoggedInView={setLoggedInView}
          setIsFading={setIsFading}
        />
      )}
    </>
  );
}

export default App;
