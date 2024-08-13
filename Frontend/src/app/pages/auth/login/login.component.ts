import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formSubmitStatus = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
  });
  constructor(
    private loader: NgxUiLoaderService,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.formSubmitStatus = true;

    if (this.loginForm.valid) {
      this.http.login('auth/login', this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('Login successfully');
          localStorage.setItem('token', data['accessToken']);
          localStorage.setItem('loginUser', JSON.stringify(data['user']));
          this.route.navigateByUrl('/home');
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          console.log(error);
        },
      });
    }
  }
}
