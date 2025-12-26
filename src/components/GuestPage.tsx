import { useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Section from "./Section";
import RSVP from "./RSVP";

interface GuestPageProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
}

function GuestPage({ setLoggedInView }: GuestPageProps) {
  const { getTranslation } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header setLoggedInView={setLoggedInView} showNavigation />
      <Sidebar setLoggedInView={setLoggedInView} />
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
        content={[getTranslation("guest_view.sections.where_and_when")]}
        id={"where_and_when"}
      />
      <Section
        title={getTranslation("guest_view.menu_title")}
        content={[getTranslation("guest_view.sections.menu")]}
        id={"menu"}
        dark
      />
      <Section
        title={getTranslation("guest_view.gift_title")}
        content={[getTranslation("guest_view.sections.gift_registry")]}
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
    </motion.div>
  );
}

export default GuestPage;
