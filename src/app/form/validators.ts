import { AbstractControl, ValidatorFn } from "@angular/forms";

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

    // good
    if (value.startsWith("+3")) {
      return null;
    }

    // bad
    return { incorrectPhone: true };
  };
}


export function emailMatcher(
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
