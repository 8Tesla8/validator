import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  public form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      street: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      houseNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(1),
        Validators.maxLength(3)
      ]),
      city: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phones: new FormArray([new FormControl("+3", [Validators.required, this.phoneValidator])])
    });
  }
  
  public addPhone() {
    (<FormArray>this.form.controls["phones"]).push(
      new FormControl("+3", Validators.required)
    );
  }


  phoneValidator(control: FormControl): { [key: string]: boolean } {
    let value = control.value as string;
    
    // good
    if (value.startsWith("+3")) {
      return null;
    }
    
    // bad
    return { phones: true };
  }
}
