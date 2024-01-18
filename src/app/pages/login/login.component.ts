import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setAuthData(response.code, response.token, response.username);
        this.router.navigate(['/property/home/all-schemes']);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
