import { FormState } from "./FormState";

type Setter = React.Dispatch<React.SetStateAction<FormState>>;

export const handleYearChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, birthYear: value }));
};

export const handleMonthChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, birthMonth: value }));
};

export const handleDayChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, birthDay: value }));
};

export const handleHourChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, birthHour: value }));
};

export const handleMinuteChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, birthMinute: value }));
};

export const handleAmPmChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, ampm: value }));
};

export const handleUnknownTimeChange = (checked: boolean, setFormState: Setter) => {
  setFormState((prev) => ({
    ...prev,
    unknownBirthTime: checked,
    birthHour: "",
    birthMinute: "",
    ampm: "",
  }));
};
