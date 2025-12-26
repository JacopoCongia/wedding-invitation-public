import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Header from "./Header";
import { useLanguage } from "../hooks/useLanguage";
import { fetchGuests } from "../utils/supabaseClient";
import { firstLetterUppercase } from "../utils/firstLetterUppercase";

import { type Database } from "../types/supabase";
type PlusOneRow = Database["public"]["Tables"]["plus_ones"]["Row"];
type GuestRowWithPlusOnes = Database["public"]["Tables"]["guests"]["Row"] & {
  plus_ones: PlusOneRow[];
};
// Define the types for the CouplePage component
interface CouplePageProps {
  setLoggedInView: (view: "login" | "guest" | "couple") => void;
}

function CouplePage({ setLoggedInView }: CouplePageProps) {
  const { getTranslation } = useLanguage();
  const [rsvps, setRsvps] = useState<GuestRowWithPlusOnes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch RSVPs from Supabase
    const loadGuests = async () => {
      try {
        const fetchedGuests = await fetchGuests();
        setLoading(true);
        // Sort by createdAt descending (newest first)
        const sortedGuests = [...fetchedGuests].sort((a, b) => {
          const aTime = a.created_at ? a.created_at : a.created_at;
          const bTime = b.created_at ? b.created_at : b.created_at;
          return bTime - aTime;
        });
        setRsvps(sortedGuests);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch RSVPs:", err);
        setError("Failed to load RSVPs");
      } finally {
        setLoading(false);
      }
    };

    loadGuests();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header setLoggedInView={setLoggedInView} />
      <div>
        <h1 className="mb-4 text-3xl font-bold">
          {getTranslation("couple_view.dashboard_title")}
        </h1>

        {loading && <p>{getTranslation("general.loading")}</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div>
            {/* Stats for nerds */}
            <div className="mb-6 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-4">
              {/* Total RSVPs card */}
              <div className="rounded-xl bg-fuchsia-50 p-4">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.rsvp_count")}
                </h3>
                <p className="text-3xl font-bold">{rsvps.length}</p>
              </div>
              {/* Total Guests card */}
              <div className="rounded-xl bg-amber-50 p-4">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_guests")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    if (rsvp.attendance) {
                      return total + 1 + rsvp.plus_ones.length;
                    }
                    return total;
                  }, 0)}
                </p>
              </div>
              {/* Total Regular Meals card */}
              <div className="rounded-xl bg-blue-50 p-4">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_regular_meals")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    const mainReg = rsvp.menu_choice === "regular" ? 1 : 0;
                    const plusReg = rsvp.plus_ones.filter(
                      (p) => p.menu_choice === "regular",
                    ).length;
                    return total + mainReg + plusReg;
                  }, 0)}
                </p>
              </div>
              {/* Total Vegetarian Meals card */}
              <div className="rounded-xl bg-green-50 p-4">
                <h3 className="font-semibold">
                  {getTranslation("couple_view.total_vegetarian_meals")}
                </h3>
                <p className="text-3xl font-bold">
                  {rsvps.reduce((total, rsvp) => {
                    const mainVeg =
                      rsvp.menu_choice?.toLowerCase() === "vegetarian" ? 1 : 0;
                    const plusVeg = rsvp.plus_ones.filter(
                      (p) => p.menu_choice?.toLowerCase() === "vegetarian",
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
                <table className="min-w-full bg-neutral-50 text-nowrap">
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
                          "guest_view.rsvp_dietary_restrictions_label",
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
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {firstLetterUppercase(rsvp.first_name ?? "")}
                        </td>
                        {/* Last Name */}
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {firstLetterUppercase(rsvp.last_name ?? "")}
                        </td>
                        {/* Email */}
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {rsvp.email}
                        </td>
                        {/* Attendance */}
                        <td className="border-b border-neutral-100 px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              rsvp.attendance
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {rsvp.attendance ? "✓ Yes" : "✗ No"}
                          </span>
                        </td>
                        {/* Menu */}
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {rsvp.menu_choice && (
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                rsvp.menu_choice.toLowerCase() === "vegetarian"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {firstLetterUppercase(rsvp.menu_choice)}
                            </span>
                          )}
                        </td>
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {rsvp.menu_choice && rsvp.dietary_restrictions && (
                            <span className="font-regular text-[0.9rem]">
                              {firstLetterUppercase(rsvp.dietary_restrictions)}
                            </span>
                          )}
                        </td>
                        {/* Plus Ones */}
                        <td className="border-b border-neutral-100 px-4 py-3">
                          {rsvp.plus_ones.length > 0 ? (
                            <div className="space-y-3">
                              {rsvp.plus_ones.map((plusOne, idx) => (
                                <div key={idx} className="text-sm">
                                  {/* Plus One Name and Last Name */}
                                  <span className="font-medium">
                                    {firstLetterUppercase(
                                      plusOne.first_name ?? "",
                                    )}{" "}
                                    {firstLetterUppercase(
                                      plusOne.last_name ?? "",
                                    )}
                                  </span>
                                  {/* Plus One Menu */}
                                  <span
                                    className={`ml-2 rounded-full px-2 py-1 text-xs ${
                                      plusOne.menu_choice?.toLowerCase() ===
                                      "vegetarian"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {firstLetterUppercase(
                                      plusOne.menu_choice ?? "",
                                    )}
                                  </span>
                                  {/* Plus One Dietary Restrictions */}
                                  <span>
                                    {plusOne.dietary_restrictions && (
                                      <span className="font-regular ml-2 text-[0.8rem]">
                                        (
                                        {firstLetterUppercase(
                                          plusOne.dietary_restrictions,
                                        )}
                                        )
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">None</span>
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
    </motion.div>
  );
}

export default CouplePage;
