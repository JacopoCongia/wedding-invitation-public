import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Header from "./Header";
import Section from "./Section";
import RSVP from "./RSVP";

function GuestPage({ setLoggedInView, setIsFading }) {
  const { t } = useLanguage();
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
        />
        <Section
          title={t("guest_view.about_us_title")}
          content="content"
          id={"about-us"}
          dark
        />
        <Section
          title={t("guest_view.location_title")}
          content="content"
          id={"venue"}
        />
        <Section
          title={t("guest_view.accomodation_title")}
          content="content"
          id={"accomodation"}
          dark
        />
        <Section
          title={t("guest_view.food_title")}
          content="content"
          id={"menu"}
        />
        <Section
          title={t("guest_view.dress_code_title")}
          content="content"
          id={"dress-code"}
          dark
        />
        <Section
          title={t("guest_view.gifts_title")}
          content="content"
          id={"gifts"}
        />
        <Section
          title={t("guest_view.rsvp_title")}
          content="content"
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
