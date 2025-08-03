import { useState, useEffect } from "react";
import Header from "./Header";
import { useLanguage } from "../hooks/useLanguage";
import { fetchRSVPs } from "../utils/firestore";

import { type RSVPDocument } from "../utils/firestore";

// Define the types for the CouplePage component
interface CouplePageProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
  setIsFading: (isFading: boolean) => void;
}

function CouplePage({ setLoggedInView, setIsFading }: CouplePageProps) {
  const { getTranslation } = useLanguage();
  const [fadeIn, setFadeIn] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10); // Delay to allow fade-in effect

    // Function to fetch RSVPs from Firestore
    const loadRSVPs = async () => {
      try {
        setLoading(true);
        const fetchedRSVPs = await fetchRSVPs();
        setRsvps(fetchedRSVPs);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch RSVPs:", err);
        setError("Failed to load RSVPs");
      } finally {
        setLoading(false);
      }
    };

    loadRSVPs();
  }, []);

  console.log("RSVPs:", rsvps);

  return (
    <>
      <Header
        setLoggedInView={setLoggedInView}
        setFadeIn={setFadeIn}
        setIsFading={setIsFading}
      />
      <div
        className={`${
          fadeIn ? "opacity-100" : "opacity-0"
        } transition-opacity duration-400 p-8`}
      >
        <h1 className="text-2xl font-bold mb-4">
          {getTranslation("couple_view.dashboard_title")}
        </h1>

        {loading && <p>{getTranslation("general.loading")}</p>}

        {error && <p className="text-red-500">{error}</p>}

        {/* ### TEMPORARY SOLUTION, TO CHANGE TO A TABLE ### */}
        {!loading && !error && (
          <div>
            <p className="mb-4">
              {getTranslation("couple_view.rsvp_count")}: {rsvps.length}
            </p>
            {/* ADD TOTAL PEOPLE, INCLUDING PLUS ONES */}
            {/* ADD TOTAL VEGGIES/REGULAR MENUS, INCLUDING PLUS ONES */}
            {rsvps.length === 0 ? (
              <p>{getTranslation("couple_view.no_rsvps")}</p>
            ) : (
              <div className="space-y-2">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="border p-4 rounded"
                  >
                    <div>
                      <h1>
                        {getTranslation("general.first_name")}:{" "}
                        {rsvp.firstName.slice(0, 1).toUpperCase() +
                          rsvp.firstName.slice(1)}
                      </h1>
                      <h1>
                        {getTranslation("general.last_name")}:{" "}
                        {rsvp.lastName.slice(0, 1).toUpperCase() +
                          rsvp.lastName.slice(1)}
                      </h1>
                    </div>
                    <p>
                      {getTranslation("general.email")}: {rsvp.email}
                    </p>
                    <p>
                      {getTranslation("guest_view.rsvp_menu_label")}:{" "}
                      {rsvp.menu.slice(0, 1).toUpperCase()}
                      {rsvp.menu.slice(1)}
                    </p>
                    <p>{getTranslation("couple_view.plus_one_column")}: </p>
                    <ul className="list-disc pl-5">
                      {rsvp.plusOnes.map((plusOne, index) => (
                        <li key={index}>
                          {plusOne.firstName} {plusOne.lastName} {plusOne.menu}
                        </li>
                      ))}
                    </ul>
                    <p>
                      {getTranslation("couple_view.attending_column")}:{" "}
                      {rsvp.attendance}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* END OF TEMPORARY SOLUTION */}
      </div>
    </>
  );
}

export default CouplePage;
