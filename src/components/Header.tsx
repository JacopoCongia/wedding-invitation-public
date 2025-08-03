import { useLanguage } from "../hooks/useLanguage";
import { useMenu } from "../hooks/useMenu";
import { getNavigationLinks } from "../utils/getNavigationLinks";

interface HeaderProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
  setFadeIn: (fadeIn: boolean) => void;
  setIsFading: (isFading: boolean) => void;
  showNavigation?: boolean;
}

function Header({
  setLoggedInView,
  setFadeIn,
  setIsFading,
  showNavigation = false,
}: HeaderProps) {
  // Use the custom hook to access the language context
  const { getTranslation, setLanguage } = useLanguage();

  // Use the custom hook to access the menu context
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

  const links = getNavigationLinks(getTranslation);

  // Function to handle language change
  const handleLanguageChange = (lang: "en" | "it") => {
    setLanguage(lang);
  };

  const handleGoBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFadeIn(false); // Reset fade-in state
    setTimeout(() => {
      setLoggedInView("login");
      setTimeout(() => {
        setIsFading(false);
      }, 10);
    }, 400);
  };

  // Function to handle the click event and scroll to the section with the corresponding ID
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // Close the menu after clicking a link
    }
  };

  // Map through the links and render buttons for each link
  let navigationContent = null;
  if (showNavigation) {
    navigationContent = links.map((link) => (
      <button
        key={link.id}
        onClick={() => handleClick(link.id)}
        className="cursor-pointer hover:text-neutral-500"
      >
        {link.label}
      </button>
    ));
  }

  return (
    <>
      {/* Language selection UI */}
      <header className="flex text-[0.9rem] justify-center items-center sticky top-0 z-50 p-4 bg-neutral-50 lg:text-[1rem]">
        {/* Go back button */}
        <button
          onClick={handleGoBackClick}
          aria-label="Back to login"
          className={`cursor-pointer ${
            showNavigation ? "hidden min-[850px]:flex" : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700"
          >
            <polyline points="15 18 9 12 15 6" />
            <line
              x1="9"
              y1="12"
              x2="21"
              y2="12"
            />
          </svg>
        </button>
        {/* Hamburger/X menu for mobile */}
        {showNavigation && (
          <button
            className="flex items-center cursor-pointer excluded-from-click min-[850px]:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              // X icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700"
              >
                <line
                  x1="4"
                  y1="7"
                  x2="20"
                  y2="7"
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                />
                <line
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                />
              </svg>
            )}
          </button>
        )}
        {
          <div className="hidden flex-1 gap-5 justify-center min-[850px]:flex lg:gap-9">
            {navigationContent}
          </div>
        }
        {/* Language selection UI */}
        <div className="flex gap-3 ml-auto excluded-from-click">
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
      </header>
    </>
  );
}

export default Header;
