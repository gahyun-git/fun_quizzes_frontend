export interface FormState {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  birthMinute: string;
  ampm: string;
  unknownBirthTime: boolean;
  loading: boolean;
  error: string;
}

export const initialFormState: FormState = {
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  birthHour: "",
  birthMinute: "",
  ampm: "",
  unknownBirthTime: false,
  loading: false,
  error: "",
};
