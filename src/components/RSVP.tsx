import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  attendance: string;
  menu: string;
  plusOnes: PlusOne[];
}

interface PlusOne {
  firstName: string;
  lastName: string;
  menu: string;
}

function RSVP() {
  const { getTranslation } = useLanguage();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    attendance: "",
    menu: "",
    plusOnes: [],
  });

  const plusOnesRadios = [
    { id: "plusOnes-0", name: "plusOnes", value: 0 },
    { id: "plusOnes-1", name: "plusOnes", value: 1 },
    { id: "plusOnes-2", name: "plusOnes", value: 2 },
    { id: "plusOnes-3", name: "plusOnes", value: 3 },
    { id: "plusOnes-4", name: "plusOnes", value: 4 },
    { id: "plusOnes-5", name: "plusOnes", value: 5 },
  ];

  // Handle changes for the main form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for the plus ones
  const handlePlusOnesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // FORM SUBMISSION LOGIC HERE
    console.log(form);
  };

  return (
    <div className="flex items-center w-[90%] sm:w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full text-center"
      >
        {/* First Name */}
        <label htmlFor="firstName">
          {getTranslation("guest_view.rsvp_name_label")}
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder={getTranslation("guest_view.rsvp_name_placeholder")}
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center"
          required
          value={form.firstName}
          onChange={handleChange}
        />
        {/* END First Name */}
        {/* Last Name */}
        <label htmlFor="lastName">
          {getTranslation("guest_view.rsvp_lastname_label")}
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder={getTranslation("guest_view.rsvp_lastname_placeholder")}
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center"
          required
          value={form.lastName}
          onChange={handleChange}
        />
        {/* END Last Name */}

        {/* Email */}
        <label htmlFor="email">
          {getTranslation("guest_view.rsvp_email_label")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={getTranslation("guest_view.rsvp_email_placeholder")}
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center"
          required
          value={form.email}
          onChange={handleChange}
        />
        {/* END Email */}
        {/* Attendance */}
        <label>{getTranslation("guest_view.rsvp_attending_label")}</label>
        <div className="flex gap-3 mt-1 mb-4 text-center">
          <div className="flex items-center flex-1">
            <label
              htmlFor="attendance-yes"
              className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                form.attendance === "yes"
                  ? "bg-teal-500 text-neutral-50"
                  : "bg-neutral-50 text-neutral-700"
              } hover:bg-teal-500 hover:text-neutral-50`}
            >
              {getTranslation("guest_view.yes")}
            </label>
            <input
              type="radio"
              id="attendance-yes"
              name="attendance"
              value="yes"
              checked={form.attendance === "yes"}
              onChange={handleChange}
              required
              className="hidden"
            />
          </div>
          <div className="flex items-center flex-1">
            <label
              htmlFor="attendance-no"
              className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                form.attendance === "no"
                  ? "bg-teal-500 text-neutral-50"
                  : "bg-neutral-50 text-neutral-700"
              } hover:bg-teal-500 hover:text-neutral-50`}
            >
              {getTranslation("guest_view.no")}
            </label>
            <input
              type="radio"
              id="attendance-no"
              name="attendance"
              value="no"
              checked={form.attendance === "no"}
              onChange={handleChange}
              required
              className="hidden"
            />
          </div>
        </div>
        {/* END Attendance */}
        {form.attendance === "yes" && (
          <div>
            {/* Menu */}
            <label htmlFor="menu">
              {getTranslation("guest_view.rsvp_menu_label")}
            </label>
            <div className="flex gap-3 mt-1 mb-4 text-center">
              <div className="flex items-center flex-1">
                <label
                  htmlFor="menu-regular"
                  className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                    form.menu === "regular"
                      ? "bg-teal-500 text-neutral-50"
                      : "bg-neutral-50 text-neutral-700"
                  } hover:bg-teal-500 hover:text-neutral-50`}
                >
                  {getTranslation("guest_view.rsvp_regular_label")}
                </label>
                <input
                  type="radio"
                  id="menu-regular"
                  name="menu"
                  value="regular"
                  checked={form.menu === "regular"}
                  onChange={handleChange}
                  required
                  className="hidden"
                />
              </div>
              <div className="flex items-center flex-1">
                <label
                  htmlFor="menu-vegetarian"
                  className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                    form.menu === "vegetarian"
                      ? "bg-teal-500 text-neutral-50"
                      : "bg-neutral-50 text-neutral-700"
                  } hover:bg-teal-500 hover:text-neutral-50`}
                >
                  {getTranslation("guest_view.rsvp_vegetarian_label")}
                </label>
                <input
                  type="radio"
                  id="menu-vegetarian"
                  name="menu"
                  value="vegetarian"
                  checked={form.menu === "vegetarian"}
                  onChange={handleChange}
                  required
                  className="hidden"
                />
              </div>
            </div>
            {/* END Menu */}

            {/* Plus Ones */}
            {/* Render plus ones based on the number selected */}
            <label
              htmlFor="plusOnes"
              className="mt-2"
            >
              {getTranslation("guest_view.rsvp_plus_one_label")}
            </label>
            {/* Render the plus one radio buttons */}
            <div className="flex gap-2 mt-1 mb-4 text-center sm:gap-3">
              {plusOnesRadios.map((radio) => (
                <div
                  key={radio.id}
                  className="flex items-center flex-1"
                >
                  <label
                    htmlFor={radio.id}
                    className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                      form.plusOnes.length === radio.value
                        ? "bg-teal-500 text-neutral-50"
                        : "bg-neutral-50 text-neutral-700"
                    } hover:bg-teal-500 hover:text-neutral-50`}
                  >
                    {radio.value}
                  </label>
                  <input
                    type="radio"
                    id={radio.id}
                    name="plusOnes"
                    value={radio.value}
                    checked={form.plusOnes.length === radio.value}
                    onChange={handlePlusOnesChange}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
            {/* Render plus ones input fields */}
            {form.plusOnes.map((plusOne, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 mb-4 pb-4 border-b border-neutral-200"
              >
                <h1>
                  {getTranslation("guest_view.rsvp_plus_one")} {idx + 1}
                </h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={
                      getTranslation("guest_view.rsvp_name_label") +
                      ` +${idx + 1}`
                    }
                    className="bg-neutral-50 p-2 text-neutral-700 w-full text-center"
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
                      getTranslation("guest_view.rsvp_lastname_label") +
                      ` +${idx + 1}`
                    }
                    className="bg-neutral-50 p-2 text-neutral-700 w-full text-center"
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
                {/* Radio Button for the menu choice */}
                <div className="flex gap-3 mt-1 mb-4 text-center">
                  <div className="flex items-center flex-1">
                    {/* Menu Regular Plus Ones */}
                    <label
                      htmlFor={`menu-regular-${idx}`}
                      className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                        plusOne.menu === "regular"
                          ? "bg-teal-500 text-neutral-50"
                          : "bg-neutral-50 text-neutral-700"
                      } hover:bg-teal-500 hover:text-neutral-50`}
                    >
                      {getTranslation("guest_view.rsvp_regular_label")}
                    </label>
                    <input
                      type="radio"
                      id={`menu-regular-${idx}`}
                      name={`menu-${idx}`}
                      value="regular"
                      checked={plusOne.menu === "regular"}
                      onChange={(e) => {
                        const { value } = e.target;
                        setForm((prev) => ({
                          ...prev,
                          plusOnes: prev.plusOnes.map((po, i) =>
                            i === idx ? { ...po, menu: value } : po
                          ),
                        }));
                      }}
                      required
                      className="hidden"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    {/* Menu Vegetarian Plus Ones */}
                    <label
                      htmlFor={`menu-vegetarian-${idx}`}
                      className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                        plusOne.menu === "vegetarian"
                          ? "bg-teal-500 text-neutral-50"
                          : "bg-neutral-50 text-neutral-700"
                      } hover:bg-teal-500 hover:text-neutral-50`}
                    >
                      {getTranslation("guest_view.rsvp_vegetarian_label")}
                    </label>
                    <input
                      type="radio"
                      id={`menu-vegetarian-${idx}`}
                      name={`menu-${idx}`}
                      value="vegetarian"
                      checked={plusOne.menu === "vegetarian"}
                      onChange={(e) => {
                        const { value } = e.target;
                        setForm((prev) => ({
                          ...prev,
                          plusOnes: prev.plusOnes.map((po, i) =>
                            i === idx ? { ...po, menu: value } : po
                          ),
                        }));
                      }}
                      required
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* End of plus ones selection */}
          </div>
        )}

        {/* Submit Form Button */}
        <button
          type="submit"
          className="bg-neutral-50 p-2 text-neutral-700 mt-7 cursor-pointer rounded hover:bg-neutral-200"
        >
          {getTranslation("guest_view.submit_rsvp")}
        </button>
      </form>
    </div>
  );
}

export default RSVP;
