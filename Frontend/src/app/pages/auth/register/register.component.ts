import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formSubmitStatus: boolean = false;

  registerGroup = this.fb.group({
    name: ['', Validators.required],
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
    private fb: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  sendForm() {
    this.formSubmitStatus = true;
    console.log(this.registerGroup.controls['email']);

    if (this.registerGroup.valid) {
      this.http.register('auth/register', this.registerGroup.value).subscribe({
        next: (data) => {
          this.toastr.success('User register successfully');
          this.route.navigateByUrl('/auth/login');
          this.registerGroup.reset();
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
    }
  }
}
