import { useRef, useEffect } from "react";
import { getNavigationLinks } from "../utils/getNavigationLinks";
import { useLanguage } from "../hooks/useLanguage";
import { useMenu } from "../hooks/useMenu";

interface SidebarProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
}

function Sidebar({ setLoggedInView }: SidebarProps) {
  // Use the custom hook to access the language context
  const { getTranslation } = useLanguage();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to access the menu context
  const { isMenuOpen, closeMenu } = useMenu();

  const handleGoBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoggedInView("login");
    closeMenu(); // Close the menu
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
        className={`fixed top-[56px] left-0 z-40 flex h-screen w-full flex-col items-center gap-8 bg-neutral-50 pt-15 text-neutral-700 transition-transform duration-300 ease-in-out select-none min-[500px]:w-[300px] min-[850px]:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
        <div
          onClick={handleGoBackClick}
          className="mt-10 ml-[-26px] flex cursor-pointer items-center gap-3"
        >
          <button aria-label="Back to login" className="cursor-pointer">
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
              <line x1="9" y1="12" x2="21" y2="12" />
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
