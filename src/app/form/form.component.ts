import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray  } from "@angular/forms";
import { emailMatcherValidator, startWithValidator, samePhoneValidator } from "./validators";

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

      phones: new FormArray(
        [new FormControl("", [Validators.required, startWithValidator("+3")] )]
        , samePhoneValidator), 
      
      account: new FormGroup ({
        email: new FormControl("", [
          Validators.required,
          Validators.email
        ]), 
        confirm: new FormControl("", [
          Validators.required,
          Validators.email
        ]),
      }, emailMatcherValidator) 
    } );
  }
  
  public addPhone() {
    (<FormArray>this.form.controls["phones"]).push(
      new FormControl("", [Validators.required, startWithValidator("+3")])
    );
  }

}
