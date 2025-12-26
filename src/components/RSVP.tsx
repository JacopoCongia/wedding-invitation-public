import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
// import { addGuest } from "../utils/supabaseClient";

import { type FormState } from "../types/rsvp-form";

function RSVP() {
  const { getTranslation } = useLanguage();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    attendance: null,
    menu: "",
    dietaryRestrictions: "",
    plusOnes: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Special handling for attendance to convert string to boolean
    if (name === "attendance") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "true" ? true : false,
      }));
      // Reset menu and plusOnes if attendance is "no"
      if (value === "false") {
        setForm((prev) => ({
          ...prev,
          menu: "",
          plusOnes: [],
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle changes for the plus ones
  const handlePlusOnesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10);
    setForm((prev) => {
      let plusOnes = [...prev.plusOnes];
      if (newCount > plusOnes.length) {
        // Add empty plus ones
        plusOnes = plusOnes.concat(
          Array.from({ length: newCount - plusOnes.length }, () => ({
            firstName: "",
            lastName: "",
            menu: "",
            dietaryRestrictions: "",
          })),
        );
      } else {
        // Remove extra plus ones
        plusOnes = plusOnes.slice(0, newCount);
      }
      return { ...prev, plusOnes };
    });
  };

  // Validate the form fields
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // Validate main guest info
    if (!form.firstName.trim()) {
      newErrors.firstName = getTranslation("guest_view.rsvp_validation_name");
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = getTranslation(
        "guest_view.rsvp_validation_lastname",
      );
    }
    if (!form.email.trim()) {
      newErrors.email = getTranslation("guest_view.rsvp_validation_email");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = getTranslation(
        "guest_view.rsvp_validation_email_invalid",
      );
    }
    if (form.attendance === null) {
      newErrors.attendance = getTranslation(
        "guest_view.rsvp_validation_attendance",
      );
    }

    // Validate conditional fields if attending
    if (form.attendance) {
      if (!form.menu)
        newErrors.menu = getTranslation("guest_view.rsvp_validation_menu");

      // Validate each plus one
      form.plusOnes.forEach((plusOne, index) => {
        if (!plusOne.firstName.trim()) {
          newErrors[`plusOneFirstName${index}`] = getTranslation(
            "guest_view.rsvp_validation_name",
          );
        }
        if (!plusOne.lastName.trim()) {
          newErrors[`plusOneLastName${index}`] = getTranslation(
            "guest_view.rsvp_validation_lastname",
          );
        }
        if (!plusOne.menu) {
          newErrors[`plusOneMenu${index}`] = getTranslation(
            "guest_view.rsvp_validation_menu",
          );
        }
      });
    }

    return newErrors;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are no errors, proceed with submission

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // const { data, error } = await addGuest(form);
      // if (error) {
      //   if (error.code === "23505") {
      //     // Duplicate email error
      //     setErrors({
      //       email: getTranslation("guest_view.rsvp_validation_email_used"),
      //     });
      //   }
      //   console.error("Submission failed:", error.code, error.message);
      //   // alert("There was an error submitting your RSVP. Please try again.");
      //   setIsSubmitting(false);
      //   return;
      // }

      // Reset the form after successful submission
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        attendance: null,
        menu: "",
        dietaryRestrictions: "",
        plusOnes: [],
      });

      // Set submitted state to true to show success message and hide the form
      setIsSubmitted(true);
      setIsSubmitting(false);

      // ### IMPLEMENT CONFIRMATION EMAIL SERVICE ###
    } else {
      console.log("Validation Errors:", validationErrors);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Clear errors after a delay
      const timer = setTimeout(() => {
        setErrors({});
      }, 5000);

      // Cleanup timer if component unmounts or errors change
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // If the form is submitting, show a loading message
  if (isSubmitting) {
    return (
      <div className="text-center text-[1.8rem] leading-12 whitespace-pre-line">
        <p>{getTranslation("general.loading")}</p>
      </div>
    );
  }

  // If the form is submitted, show a success message
  if (isSubmitted) {
    return (
      <div className="text-center text-[1.8rem] leading-12 whitespace-pre-line">
        <p>{getTranslation("guest_view.rsvp_message_success")}</p>
      </div>
    );
  }

  // Render the RSVP form
  return (
    <div className="flex w-[90%] items-center sm:w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col text-center"
      >
        {/* First Name */}
        <label
          htmlFor="firstName"
          className={errors.firstName ? "text-red-500" : ""}
        >
          {errors.firstName
            ? errors.firstName
            : getTranslation("general.first_name")}
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder={getTranslation("guest_view.rsvp_name_placeholder")}
          className={`mt-1 mb-4 rounded bg-neutral-50 p-2 text-center text-neutral-700`}
          value={form.firstName}
          onChange={handleChange}
        />
        {/* END First Name */}
        {/* Last Name */}
        <label
          htmlFor="lastName"
          className={errors.lastName ? "text-red-500" : ""}
        >
          {errors.lastName
            ? errors.lastName
            : getTranslation("general.last_name")}
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder={getTranslation("guest_view.rsvp_lastname_placeholder")}
          className="mt-1 mb-4 rounded bg-neutral-50 p-2 text-center text-neutral-700"
          value={form.lastName}
          onChange={handleChange}
        />
        {/* END Last Name */}

        {/* Email */}
        <label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
          {errors.email ? errors.email : getTranslation("general.email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={getTranslation("guest_view.rsvp_email_placeholder")}
          className="mt-1 mb-4 rounded bg-neutral-50 p-2 text-center text-neutral-700"
          value={form.email}
          onChange={handleChange}
        />
        {/* END Email */}
        {/* Attendance */}
        <label className={errors.attendance ? "text-red-500" : ""}>
          {errors.attendance
            ? errors.attendance
            : getTranslation("guest_view.rsvp_attending_label")}
        </label>
        <div
          className={`mt-1 mb-4 flex gap-3 text-center ${
            errors.attendance ? "rounded border-2 border-red-500 p-2" : ""
          }`}
        >
          <div className="flex flex-1 items-center">
            <label
              htmlFor="attendance-yes"
              className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
                form.attendance === true
                  ? "bg-teal-500 text-neutral-50"
                  : "bg-neutral-50 text-neutral-700"
              } $ hover:bg-teal-500 hover:text-neutral-50`}
            >
              {getTranslation("general.yes")}
            </label>
            <input
              type="radio"
              id="attendance-yes"
              name="attendance"
              value="true"
              checked={form.attendance === true}
              onChange={handleChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-1 items-center">
            <label
              htmlFor="attendance-no"
              className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
                form.attendance === false
                  ? "bg-teal-500 text-neutral-50"
                  : "bg-neutral-50 text-neutral-700"
              } hover:bg-teal-500 hover:text-neutral-50`}
            >
              {getTranslation("general.no")}
            </label>
            <input
              type="radio"
              id="attendance-no"
              name="attendance"
              value="false"
              checked={form.attendance === false}
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>
        {/* END Attendance */}
        {form.attendance && (
          <div>
            {/* Menu */}
            <label htmlFor="menu" className={errors.menu ? "text-red-500" : ""}>
              {errors.menu
                ? errors.menu
                : getTranslation("guest_view.rsvp_menu_label")}
            </label>
            <div
              className={`mt-1 mb-4 flex gap-3 text-center ${
                errors.menu ? "rounded border-2 border-red-500 p-2" : ""
              }`}
            >
              <div className="flex flex-1 items-center">
                <label
                  htmlFor="menu-regular"
                  className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
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
                  className="hidden"
                />
              </div>
              <div className="flex flex-1 items-center">
                <label
                  htmlFor="menu-vegetarian"
                  className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
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
                  className="hidden"
                />
              </div>
              {/* END Menu */}
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="dietaryRestrictions">
                {getTranslation("guest_view.rsvp_dietary_restrictions_label")}
              </label>
              <input
                type="text"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                placeholder={getTranslation(
                  "guest_view.rsvp_dietary_restrictions_placeholder",
                )}
                className="mt-1 mb-4 w-full rounded bg-neutral-50 p-2 text-center text-neutral-700"
                value={form.dietaryRestrictions}
                onChange={handleChange}
              />
            </div>
            {/* Plus Ones */}
            {/* Render plus ones based on the number selected */}
            <label htmlFor="plusOnes" className="mt-2">
              {getTranslation("guest_view.rsvp_plus_one_label")}
            </label>
            {/* Render the plus ones radio buttons (to add/remove plus ones) */}
            <div className="mt-1 mb-4 flex gap-2 text-center sm:gap-3">
              {plusOnesRadios.map((radio) => (
                <div key={radio.id} className="flex flex-1 items-center">
                  <label
                    htmlFor={radio.id}
                    className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
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
                className="mb-4 flex flex-col gap-2 border-b border-neutral-200 pb-4"
              >
                <h1>
                  {getTranslation("guest_view.rsvp_plus_one")} {idx + 1}
                </h1>
                {/* Plus one first name */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={
                      errors[`plusOneFirstName${idx}`]
                        ? errors[`plusOneFirstName${idx}`]
                        : getTranslation("general.first_name") + ` +${idx + 1}`
                    }
                    className={`w-full rounded bg-neutral-50 p-2 text-center text-neutral-700 ${
                      errors[`plusOneFirstName${idx}`] ? "text-red-500" : ""
                    }`}
                    value={plusOne.firstName}
                    onChange={(e) => {
                      const { value } = e.target;
                      setForm((prev) => {
                        const plusOnes = [...prev.plusOnes];
                        plusOnes[idx].firstName = value;
                        return { ...prev, plusOnes };
                      });
                    }}
                  />
                  {/* Plus one last name */}
                  <input
                    type="text"
                    name="lastName"
                    placeholder={
                      errors[`plusOneLastName${idx}`]
                        ? errors[`plusOneLastName${idx}`]
                        : getTranslation("general.last_name") + ` +${idx + 1}`
                    }
                    className={`w-full rounded bg-neutral-50 p-2 text-center text-neutral-700 ${
                      errors[`plusOneLastName${idx}`] ? "text-red-500" : ""
                    }`}
                    value={plusOne.lastName}
                    onChange={(e) => {
                      const { value } = e.target;
                      setForm((prev) => {
                        const plusOnes = [...prev.plusOnes];
                        plusOnes[idx].lastName = value;
                        return { ...prev, plusOnes };
                      });
                    }}
                  />
                </div>
                {/* Radio Button for the plus ones menu choice */}
                {errors[`plusOneMenu${idx}`] && (
                  <p className="mb-[-10px] text-red-500">
                    {errors[`plusOneMenu${idx}`]}
                  </p>
                )}
                <div
                  className={`mt-1 mb-4 flex gap-3 text-center ${
                    errors[`plusOneMenu${idx}`] &&
                    "rounded border-2 border-red-500 p-2"
                  }`}
                >
                  <div className="flex flex-1 items-center">
                    {/* Menu Regular Plus Ones */}
                    <label
                      htmlFor={`menu-regular-${idx}`}
                      className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
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
                            i === idx ? { ...po, menu: value } : po,
                          ),
                        }));
                      }}
                      className="hidden"
                    />
                  </div>
                  <div className="flex flex-1 items-center">
                    {/* Menu Vegetarian Plus Ones */}
                    <label
                      htmlFor={`menu-vegetarian-${idx}`}
                      className={`w-full cursor-pointer rounded py-2 font-[500] md:transition-colors ${
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
                            i === idx ? { ...po, menu: value } : po,
                          ),
                        }));
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                {/* Dietary Restrictions PlusOnes */}
                <input
                  type="text"
                  id={`menu-dietary-restrictions-${idx}`}
                  name={`menu-dietary-restrictions-${idx}`}
                  value={plusOne.dietaryRestrictions}
                  placeholder={getTranslation(
                    "guest_view.rsvp_dietary_restrictions_placeholder",
                  )}
                  className={`w-full rounded bg-neutral-50 p-2 text-center text-neutral-700`}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm((prev) => ({
                      ...prev,
                      plusOnes: prev.plusOnes.map((po, i) =>
                        i === idx ? { ...po, dietaryRestrictions: value } : po,
                      ),
                    }));
                  }}
                />
                {/* End of Dietary Restrictions PlusOnes */}
              </div>
            ))}
            {/* End of plus ones selection */}
          </div>
        )}

        {/* Submit Form Button */}
        <motion.button
          initial={{ backgroundColor: "#F3F4F6" }}
          whileHover={{ backgroundColor: "#00BBA7", color: "#FFFFFF" }}
          type="submit"
          className="mt-7 cursor-pointer rounded bg-neutral-50 p-2 text-neutral-700"
        >
          {getTranslation("guest_view.submit_rsvp")}
        </motion.button>
      </form>
    </div>
  );
}

export default RSVP;
