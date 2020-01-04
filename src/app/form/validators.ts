import { AbstractControl, ValidatorFn, FormArray } from "@angular/forms";
import { filter, uniqBy } from "lodash-es";

function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { ageRange: true };
    }
    return null;
  };
}

export function startWithValidator(text: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let value = control.value as string;

    if (value.startsWith(text)) return null;

    return { incorrectStart: true };
  };
}

export function samePhoneValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  let formArray = control as FormArray;

  if (formArray.length === 0 || formArray.length === 1) return null;

  let validControlls = filter(formArray.controls, { valid: true });

  if (validControlls.length === 0 || validControlls.length === 1) return null;

  if (uniqBy(validControlls, "value").length === validControlls.length)
    return null;

  return { notUniq: true };
}

export function emailMatcherValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  const email = control.get("email");
  const confirm = control.get("confirm");

  if (!email || !confirm) return null;

  if (email.value === confirm.value) {
    return null;
  }

  return { notMatch: true };
}
