import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formSubmitStatus: boolean = false;

  registerGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private http: HttpService, private toastr: ToastrService, private route: Router) {

  }

  sendForm() {

    this.formSubmitStatus = true;

    if (this.registerGroup.valid) {
      this.http.register('auth/register', this.registerGroup.value).subscribe({
        next: (data) => {
          this.toastr.success("User register successfully");
          this.route.navigateByUrl('/auth/login');
          this.registerGroup.reset();

        },
        error: (error) => {
          this.toastr.error('Password must be 8+ characters, with at least one uppercase, one lowercase, one number, and one special character.');
        }
      })
    }

  }

}
