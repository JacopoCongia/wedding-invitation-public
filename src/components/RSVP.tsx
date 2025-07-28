import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

function RSVP() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    attendance: "",
    menu: "",
    plusOnes: [{ firstName: "", lastName: "", menu: "" }],
  });

  // Handle changes for the main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for the plus ones
  const handlePlusOnesChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setForm((prev) => {
      let plusOnes = [...prev.plusOnes];
      if (newCount > plusOnes.length) {
        // Add empty plus ones
        plusOnes = plusOnes.concat(
          Array(newCount - plusOnes.length).fill({
            firstName: "",
            lastName: "",
            menu: "",
          })
        );
      } else {
        // Remove extra plus ones
        plusOnes = plusOnes.slice(0, newCount);
      }
      return { ...prev, plusOnes };
    });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log(form);
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:w-[450px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full"
      >
        <label htmlFor="firstName">{t("guest_view.rsvp_name_label")}</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">{t("guest_view.rsvp_lastname_label")}</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">{t("guest_view.rsvp_email_label")}</label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="attendance">
          {t("guest_view.rsvp_attending_label")}
        </label>
        <select
          id="attendance"
          name="attendance"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.attendance}
          onChange={handleChange}
        >
          <option value="">{t("guest_view.rsvp_selection")}</option>
          <option value="yes">{t("guest_view.yes")}</option>
          <option value="no">{t("guest_view.no")}</option>
        </select>
        <label htmlFor="menu">{t("guest_view.rsvp_menu_label")}</label>
        <select
          id="menu"
          name="menu"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.menu}
          onChange={handleChange}
        >
          <option value="">{t("guest_view.rsvp_selection")}</option>
          <option value="regular">{t("guest_view.rsvp_regular_label")}</option>
          <option value="vegetarian">
            {t("guest_view.rsvp_vegetarian_label")}
          </option>
        </select>
        {/* Render plus ones based on the number selected */}
        <label htmlFor="plusOnes">{t("guest_view.rsvp_plus_one_label")}</label>
        <select
          id="plusOnes"
          name="plusOnes"
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4"
          required
          value={form.plusOnes.length}
          onChange={(e) => handlePlusOnesChange(e)}
        >
          <option value="">{t("guest_view.rsvp_selection_none")}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {/* Render plus ones input fields */}
        {form.plusOnes.map((plusOne, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 mb-4 border-b pb-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                placeholder={t("guest_view.rsvp_name_label") + ` +${idx + 1}`}
                className="bg-neutral-50 p-2 text-neutral-700 w-full"
                value={plusOne.firstName}
                onChange={(e) => {
                  const { value } = e.target;
                  setForm((prev) => {
                    const plusOnes = [...prev.plusOnes];
                    plusOnes[idx].firstName = value;
                    return { ...prev, plusOnes };
                  });
                }}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder={
                  t("guest_view.rsvp_lastname_label") + ` +${idx + 1}`
                }
                className="bg-neutral-50 p-2 text-neutral-700 w-full"
                value={plusOne.lastName}
                onChange={(e) => {
                  const { value } = e.target;
                  setForm((prev) => {
                    const plusOnes = [...prev.plusOnes];
                    plusOnes[idx].lastName = value;
                    return { ...prev, plusOnes };
                  });
                }}
                required
              />
            </div>
            <select
              name="menu"
              className="bg-neutral-50 p-2 text-neutral-700"
              value={plusOne.menu || ""}
              onChange={(e) => {
                const { value } = e.target;
                setForm((prev) => {
                  const plusOnes = prev.plusOnes.map((po, i) =>
                    i === idx ? { ...po, menu: value } : po
                  );
                  return { ...prev, plusOnes };
                });
              }}
              required
            >
              <option value="">{t("guest_view.rsvp_menu_label")}</option>
              <option value="regular">
                {t("guest_view.rsvp_regular_label")}
              </option>
              <option value="vegetarian">
                {t("guest_view.rsvp_vegetarian_label")}
              </option>
            </select>
          </div>
        ))}
        {/* End of plus ones selection */}

        <button
          type="submit"
          className="bg-neutral-50 p-2 text-neutral-700 mt-7 cursor-pointer hover:bg-neutral-200"
        >
          {t("guest_view.submit_rsvp")}
        </button>
      </form>
    </div>
  );
}

export default RSVP;
