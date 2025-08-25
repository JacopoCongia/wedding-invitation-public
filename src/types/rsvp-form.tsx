export interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  attendance: string;
  menu: string;
  dietaryRestrictions: string;
  plusOnes: PlusOne[];
}

interface PlusOne {
  firstName: string;
  lastName: string;
  menu: string;
  dietaryRestrictions: string;
}
