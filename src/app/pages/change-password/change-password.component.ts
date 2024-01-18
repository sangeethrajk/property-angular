import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.changeForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  sendOTP() {
    const username = this.changeForm.get('username')?.value;
  }
}
