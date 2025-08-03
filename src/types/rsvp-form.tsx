export interface FormState {
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
