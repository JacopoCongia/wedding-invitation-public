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
          title={getTranslation("guest_view.about_us_title")}
          content="content"
          id={"about-us"}
          dark
        />
        <Section
          title={getTranslation("guest_view.location_title")}
          content="content"
          id={"venue"}
        />
        <Section
          title={getTranslation("guest_view.accommodation_title")}
          content="content"
          id={"accommodation"}
          dark
        />
        <Section
          title={getTranslation("guest_view.food_title")}
          content="content"
          id={"menu"}
        />
        <Section
          title={getTranslation("guest_view.dress_code_title")}
          content="content"
          id={"dress-code"}
          dark
        />
        <Section
          title={getTranslation("guest_view.gifts_title")}
          content="content"
          id={"gifts"}
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
