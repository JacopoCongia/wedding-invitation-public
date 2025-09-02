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
    window.scrollTo(0, 0);
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
          content={[
            getTranslation("guest_view.sections.us_1"),
            getTranslation("guest_view.sections.us_2"),
            getTranslation("guest_view.sections.us_3"),
          ]}
          picture={{
            src: "/couple_picture.jpg",
            alt: "Picture of the Couple",
            credit: "Photo by: Nathan McBride on Unsplash",
          }}
          id={"us"}
          dark
        />
        <Section
          title={getTranslation("guest_view.where_and_when_title")}
          content={["Content"]}
          id={"where_and_when"}
        />
        <Section
          title={getTranslation("guest_view.menu_title")}
          content={["Content"]}
          id={"menu"}
          dark
        />
        <Section
          title={getTranslation("guest_view.gift_title")}
          content={["Content"]}
          id={"gift"}
        />
        <Section
          title={getTranslation("guest_view.rsvp_title")}
          content={[]}
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
