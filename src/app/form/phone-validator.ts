import { AbstractControl } from "@angular/forms";

export function phoneValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  let value = control.value as string;

  // good
  if (value.startsWith("+3")) {
    return null;
  }

  // bad
  return { incorrectPhone: true };
}
