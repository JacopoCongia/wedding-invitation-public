import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

function Header({ setLoggedInView, setFadeIn, setIsFading }) {
  const { t, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: t("header.about_us"), id: "about-us" },
    { label: t("header.location"), id: "venue" },
    { label: t("header.accomodation"), id: "accomodation" },
    { label: t("header.food"), id: "menu" },
    { label: t("header.dress_code"), id: "dress-code" },
    { label: t("header.gifts"), id: "gifts" },
    { label: t("header.rsvp"), id: "rsvp" },
  ];

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleGoBackClick = (e) => {
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
  const handleClick = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close the menu after clicking a link
    }
  };

  // Map through the links and render buttons for each link
  const content = links.map((link) => (
    <button
      key={link.id}
      onClick={() => handleClick(link.id)}
      className="cursor-pointer hover:text-neutral-500"
    >
      {link.label}
    </button>
  ));

  return (
    <>
      {/* Language selection UI */}

      <header className="flex text-[0.8rem] justify-center items-center sticky top-0 z-50 p-4 bg-neutral-50 lg:text-[1rem]">
        <button
          onClick={(e) => {
            handleGoBackClick(e);
          }}
          aria-label="Back to login"
          className="cursor-pointer hidden min-[850px]:flex"
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
        <button
          className="flex items-center min-[850px]:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
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
        <div className="hidden flex-1 gap-5 justify-center min-[850px]:flex lg:gap-9">
          {content}
        </div>
        <div className="flex gap-3 ml-auto">
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
