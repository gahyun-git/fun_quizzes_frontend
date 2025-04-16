import { RefObject } from "react";
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

export const handleHourChange = (
  value: string,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  nextRef?: React.RefObject<HTMLSelectElement>
) => {
  setFormState((prev) => ({ ...prev, birthHour: value }));
  if (value && nextRef?.current) {
    nextRef.current!.focus();
  }
};

export const handleMinuteChange = (
    value: string,
    setFormState: React.Dispatch<React.SetStateAction<FormState>>,
    nextRef: RefObject<HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, birthMinute: value }));
    if (value && nextRef?.current) {
      nextRef.current!.focus();
    }
  };

export const handleAmPmChange = (value: string, setFormState: Setter) => {
  setFormState((prev) => ({ ...prev, ampm: value }));
};

export const handleUnknownTimeChange = (checked: boolean, setFormState: Setter) => {
  setFormState((prev) => ({
    ...prev,
    unknownBirthTime: checked,
    birthHour: checked ? "" : prev.birthHour,
    birthMinute: checked ? "" : prev.birthMinute,
    ampm: checked ? "" : prev.ampm,
  }));
};
