import { useState, useEffect } from "react";
import Header from "./Header";
import { useLanguage } from "../hooks/useLanguage";
import { fetchRSVPs } from "../utils/firestore";
import { firstLetterUppercase } from "../utils/firstLetterUppercase";

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
        const fetchedRSVPs = await fetchRSVPs();
        setLoading(true);
        // Sort by createdAt descending (newest first)
        const sortedRSVPs = [...fetchedRSVPs].sort((a, b) => {
          const aTime = a.submittedAt?.toMillis
            ? a.submittedAt.toMillis()
            : a.submittedAt.toMillis();
          const bTime = b.submittedAt?.toMillis
            ? b.submittedAt.toMillis()
            : b.submittedAt.toMillis();
          return bTime - aTime;
        });
        setRsvps(sortedRSVPs);
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
        <h1 className="text-3xl font-bold mb-4">
          {getTranslation("couple_view.dashboard_title")}
        </h1>

        {loading && <p>{getTranslation("general.loading")}</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div>
            {/* Stats for nerds */}
            <div className="mb-6 gap-4 grid grid-cols-1 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-4">
              {/* Total RSVPs card */}
              <div className="bg-fuchsia-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.rsvp_count")}
                </h3>
                <p className="text-3xl font-bold">{rsvps.length}</p>
              </div>
              {/* Total Guests card */}
              <div className="bg-amber-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_guests")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    if (rsvp.attendance === "yes") {
                      return total + 1 + rsvp.plusOnes.length;
                    }
                    return total;
                  }, 0)}
                </p>
              </div>
              {/* Total Regular Meals card */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_regular_meals")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    const mainReg = rsvp.menu === "regular" ? 1 : 0;
                    const plusReg = rsvp.plusOnes.filter(
                      (p) => p.menu === "regular"
                    ).length;
                    return total + mainReg + plusReg;
                  }, 0)}
                </p>
              </div>
              {/* Total Vegetarian Meals card */}
              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_vegetarian_meals")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    const mainVeg = rsvp.menu === "vegetarian" ? 1 : 0;
                    const plusVeg = rsvp.plusOnes.filter(
                      (p) => p.menu === "vegetarian"
                    ).length;
                    return total + mainVeg + plusVeg;
                  }, 0)}
                </p>
              </div>
            </div>
            {/* END Stats for nerds */}

            {rsvps.length === 0 ? (
              <p>{getTranslation("couple_view.no_rsvps")}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-neutral-50  text-nowrap">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("general.first_name")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("general.last_name")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("general.email")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("couple_view.attending_column")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("guest_view.rsvp_menu_label")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation(
                          "guest_view.rsvp_dietary_restrictions_label"
                        )}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {getTranslation("couple_view.plus_one_column")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((rsvp, index) => (
                      <tr
                        key={rsvp.id}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-neutral-50"
                        }
                      >
                        {/* Name */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {firstLetterUppercase(rsvp.firstName)}
                        </td>
                        {/* Last Name */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {firstLetterUppercase(rsvp.lastName)}
                        </td>
                        {/* Email */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {rsvp.email}
                        </td>
                        {/* Attendance */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rsvp.attendance === "yes"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {rsvp.attendance === "yes" ? "✓ Yes" : "✗ No"}
                          </span>
                        </td>
                        {/* Menu */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {rsvp.menu && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                rsvp.menu === "vegetarian"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {firstLetterUppercase(rsvp.menu)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {rsvp.menu && (
                            <span className="text-[0.9rem] font-regular">
                              {rsvp.dietaryRestrictions}
                            </span>
                          )}
                        </td>
                        {/* Plus Ones */}
                        <td className="px-4 py-3 border-b border-neutral-100">
                          {rsvp.plusOnes.length > 0 ? (
                            <div className="space-y-1">
                              {rsvp.plusOnes.map((plusOne, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm"
                                >
                                  {/* Plus One Name and Last Name */}
                                  <span className="font-medium">
                                    {firstLetterUppercase(plusOne.firstName)}{" "}
                                    {firstLetterUppercase(plusOne.lastName)}
                                  </span>
                                  {/* Plus One Menu */}
                                  <span
                                    className={`ml-2 px-1 py-0.5 rounded text-xs ${
                                      plusOne.menu === "vegetarian"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {firstLetterUppercase(plusOne.menu)}
                                  </span>
                                  {/* Plus One Dietary Restrictions */}
                                  <span>
                                    {plusOne.dietaryRestrictions && (
                                      <span className="ml-2 text-[0.8rem] font-regular">
                                        ({plusOne.dietaryRestrictions})
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CouplePage;
