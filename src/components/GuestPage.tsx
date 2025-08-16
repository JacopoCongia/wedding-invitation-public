import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Section from "./Section";
import RSVP from "./RSVP";

interface GuestPageProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
  setIsFading: (isFading: boolean) => void;
}

function GuestPage({ setLoggedInView, setIsFading }: GuestPageProps) {
  const { getTranslation } = useLanguage();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10); // Delay to allow fade-in effect
  }, []);

  return (
    <>
      <div
        className={`${
          fadeIn ? "opacity-100" : "opacity-0"
        } transition-opacity duration-400`}
      >
        <Header
          setLoggedInView={setLoggedInView}
          setFadeIn={setFadeIn}
          setIsFading={setIsFading}
          showNavigation
        />
        <Sidebar
          setLoggedInView={setLoggedInView}
          setFadeIn={setFadeIn}
          setIsFading={setIsFading}
        />
        <Section
          title={getTranslation("guest_view.us_title")}
          content="content"
          id={"us"}
          dark
        />
        <Section
          title={getTranslation("guest_view.where_and_when_title")}
          content="content"
          id={"where_and_when"}
        />
        <Section
          title={getTranslation("guest_view.menu_title")}
          content="content"
          id={"menu"}
          dark
        />
        <Section
          title={getTranslation("guest_view.gift_title")}
          content="content"
          id={"gift"}
        />
        <Section
          title={getTranslation("guest_view.rsvp_title")}
          content=""
          id={"rsvp"}
          dark
        >
          <RSVP />
        </Section>
      </div>
    </>
  );
}

export default GuestPage;
