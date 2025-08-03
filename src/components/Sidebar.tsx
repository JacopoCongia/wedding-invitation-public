import { useRef, useEffect } from "react";
import { getNavigationLinks } from "../utils/getNavigationLinks";
import { useLanguage } from "../hooks/useLanguage";
import { useMenu } from "../hooks/useMenu";

interface SidebarProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
  setFadeIn: (fadeIn: boolean) => void;
  setIsFading: (isFading: boolean) => void;
}

function Sidebar({ setLoggedInView, setFadeIn, setIsFading }: SidebarProps) {
  // Use the custom hook to access the language context
  const { getTranslation } = useLanguage();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to access the menu context
  const { isMenuOpen, closeMenu } = useMenu();

  const handleGoBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFadeIn(false); // Reset fade-in state
    setTimeout(() => {
      setLoggedInView("login");
      closeMenu(); // Close the menu
      setTimeout(() => {
        setIsFading(false);
      }, 10);
    }, 400);
  };

  const links = getNavigationLinks(getTranslation);

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

  // Function to handle the click event and scroll to the section with the corresponding ID
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // Close the menu after clicking a link
    }
  };

  // Handle click outside of the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Check if click is on toggle button or its children
      const isExcludedFromClick = target.closest(".excluded-from-click");

      if (
        isMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isExcludedFromClick
      ) {
        closeMenu();
      }
    };

    // Add event listener when sidebar is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);
  return (
    <>
      <div
        ref={sidebarRef}
        className={`flex flex-col items-center pt-15 fixed top-[56px] left-0 z-40 h-screen bg-neutral-50 text-neutral-700 gap-8 w-full min-[500px]:w-[300px] min-[850px]:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
        <div
          onClick={handleGoBackClick}
          className="flex items-center mt-10 gap-3 cursor-pointer ml-[-26px]"
        >
          <button
            aria-label="Back to login"
            className="cursor-pointer"
          >
            <svg
              width="26"
              height="26"
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
          <h1 className="text-neutral-700">
            {getTranslation("sidebar.logout")}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
