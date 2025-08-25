import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { type FormState } from "../types/rsvp-form";
import { submitRSVP } from "../utils/firestore";

function RSVP() {
  const { getTranslation } = useLanguage();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    attendance: "",
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
    if (value === "no") {
      setForm((prev) => ({
        ...prev,
        menu: "",
        plusOnes: [],
      }));
    }
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
          Array.from({ length: newCount - plusOnes.length }, () => ({
            firstName: "",
            lastName: "",
            menu: "",
            dietaryRestrictions: "",
          }))
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
        "guest_view.rsvp_validation_lastname"
      );
    }
    if (!form.email.trim()) {
      newErrors.email = getTranslation("guest_view.rsvp_validation_email");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = getTranslation(
        "guest_view.rsvp_validation_email_invalid"
      );
    }
    if (!form.attendance) {
      newErrors.attendance = getTranslation(
        "guest_view.rsvp_validation_attendance"
      );
    }

    // Validate conditional fields if attending
    if (form.attendance === "yes") {
      if (!form.menu)
        newErrors.menu = getTranslation("guest_view.rsvp_validation_menu");

      // Validate each plus one
      form.plusOnes.forEach((plusOne, index) => {
        if (!plusOne.firstName.trim()) {
          newErrors[`plusOneFirstName${index}`] = getTranslation(
            "guest_view.rsvp_validation_name"
          );
        }
        if (!plusOne.lastName.trim()) {
          newErrors[`plusOneLastName${index}`] = getTranslation(
            "guest_view.rsvp_validation_lastname"
          );
        }
        if (!plusOne.menu) {
          newErrors[`plusOneMenu${index}`] = getTranslation(
            "guest_view.rsvp_validation_menu"
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
      try {
        // FORM SUBMISSION LOGIC HERE -- FIREBASE ETC
        console.log("Form is valid, submitting...", form);
        // alert("RSVP submitted successfully!");
        await Promise.resolve(submitRSVP(form)).catch((error) => {
          throw error;
        });
        // Reset the form after successful submission
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          attendance: "",
          menu: "",
          dietaryRestrictions: "",
          plusOnes: [],
        });
        // Set submitted state to true to show success message
        setIsSubmitted(true);
        // ### IMPLEMENT CONFIRMATION EMAIL SERVICE ###
      } catch (error) {
        console.error("Submission failed:", error);
        alert("There was an error submitting your RSVP. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
      <div className="text-center text-[1.8rem] whitespace-pre-line leading-12">
        <p>{getTranslation("general.loading")}</p>
      </div>
    );
  }

  // If the form is submitted, show a success message
  if (isSubmitted) {
    return (
      <div className="text-center text-[1.8rem] whitespace-pre-line leading-12">
        <p>{getTranslation("guest_view.rsvp_message_success")}</p>
      </div>
    );
  }

  // Render the RSVP form
  return (
    <div className="flex items-center w-[90%] sm:w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full text-center"
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
          className={`bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center`}
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
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center"
          value={form.lastName}
          onChange={handleChange}
        />
        {/* END Last Name */}

        {/* Email */}
        <label
          htmlFor="email"
          className={errors.email ? "text-red-500" : ""}
        >
          {errors.email ? errors.email : getTranslation("general.email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={getTranslation("guest_view.rsvp_email_placeholder")}
          className="bg-neutral-50 p-2 text-neutral-700 mt-1 mb-4 rounded text-center"
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
          className={`flex gap-3 mt-1 mb-4 text-center ${
            errors.attendance ? "border-2 rounded border-red-500 p-2" : ""
          }`}
        >
          <div className="flex items-center flex-1">
            <label
              htmlFor="attendance-yes"
              className={`py-2 w-full cursor-pointer rounded font-[500] md:transition-colors ${
                form.attendance === "yes"
                  ? "bg-teal-500 text-neutral-50"
                  : "bg-neutral-50 text-neutral-700"
              } hover:bg-teal-500 hover:text-neutral-50 $`}
            >
              {getTranslation("general.yes")}
            </label>
            <input
              type="radio"
              id="attendance-yes"
              name="attendance"
              value="yes"
              checked={form.attendance === "yes"}
              onChange={handleChange}
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
              {getTranslation("general.no")}
            </label>
            <input
              type="radio"
              id="attendance-no"
              name="attendance"
              value="no"
              checked={form.attendance === "no"}
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>
        {/* END Attendance */}
        {form.attendance === "yes" && (
          <div>
            {/* Menu */}
            <label
              htmlFor="menu"
              className={errors.menu ? "text-red-500" : ""}
            >
              {errors.menu
                ? errors.menu
                : getTranslation("guest_view.rsvp_menu_label")}
            </label>
            <div
              className={`flex gap-3 mt-1 mb-4 text-center ${
                errors.menu ? "border-2 rounded border-red-500 p-2" : ""
              }`}
            >
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
                  "guest_view.rsvp_dietary_restrictions_placeholder"
                )}
                className="bg-neutral-50 p-2 w-full text-neutral-700 mt-1 mb-4 rounded text-center"
                value={form.dietaryRestrictions}
                onChange={handleChange}
              />
            </div>
            {/* Plus Ones */}
            {/* Render plus ones based on the number selected */}
            <label
              htmlFor="plusOnes"
              className="mt-2"
            >
              {getTranslation("guest_view.rsvp_plus_one_label")}
            </label>
            {/* Render the plus ones radio buttons (to add/remove plus ones) */}
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
                    className={`bg-neutral-50 p-2 text-neutral-700 w-full text-center rounded ${
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
                    className={`bg-neutral-50 p-2 text-neutral-700 w-full text-center rounded ${
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
                  <p className="text-red-500 mb-[-10px]">
                    {errors[`plusOneMenu${idx}`]}
                  </p>
                )}
                <div
                  className={`flex gap-3 mt-1 mb-4 text-center ${
                    errors[`plusOneMenu${idx}`] &&
                    "border-2 rounded border-red-500 p-2"
                  }`}
                >
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
                    "guest_view.rsvp_dietary_restrictions_placeholder"
                  )}
                  className={`bg-neutral-50 p-2 text-neutral-700 w-full text-center rounded`}
                  onChange={(e) => {
                    const { value } = e.target;
                    setForm((prev) => ({
                      ...prev,
                      plusOnes: prev.plusOnes.map((po, i) =>
                        i === idx ? { ...po, dietaryRestrictions: value } : po
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
