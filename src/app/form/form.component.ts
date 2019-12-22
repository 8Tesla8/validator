import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from "@angular/forms";
import { phoneValidator } from "./phone-validator";

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
      phones: new FormArray([new FormControl("+3", [Validators.required, phoneValidator])])
    });
  }
  
  public addPhone() {
    (<FormArray>this.form.controls["phones"]).push(
      new FormControl("+3", Validators.required)
    );
  }

}
