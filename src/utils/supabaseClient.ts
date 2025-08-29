import supabase from "./supabaseConfig";

// Fetch all rows from the "guests" table
export async function fetchGuests() {
  const { data, error } = await supabase.from("guests").select(`
    *,
    plus_ones(*)
  `);
  if (error) throw error;
  console.log(data);
  return data;
}

export async function addGuest(guestData: {
  firstName: string;
  lastName: string;
  email: string;
  attendance: string;
  menu: string;
  dietaryRestrictions: string;
  plusOnes?: {
    firstName: string;
    lastName: string;
    menu: string;
    dietaryRestrictions: string;
  }[];
}) {
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert({
      first_name: guestData.firstName,
      last_name: guestData.lastName,
      email: guestData.email,
      attendance: guestData.attendance,
      menu_choice: guestData.menu,
      dietary_restrictions: guestData.dietaryRestrictions,
    })
    .select()
    .single();
  if (guestError) {
    throw guestError;
  }

  if (guestData.plusOnes && guestData.plusOnes.length > 0) {
    const plusOnesData = guestData.plusOnes.map((po) => ({
      first_name: po.firstName,
      last_name: po.lastName,
      menu_choice: po.menu,
      dietary_restrictions: po.dietaryRestrictions,
      guest_id: guest.id,
    }));

    const { error: plusOnesError } = await supabase
      .from("plus_ones")
      .insert(plusOnesData);

    if (plusOnesError) {
      console.error(plusOnesError);
    }
  }
}
