import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../shared/types/form.type';
import { UserInterface } from '../../shared/types/user.interface';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup<Form<UserInterface>>;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (!this.form.invalid) {
      this.submitted = true;

      const user: UserInterface = {
        email: this.form.value.email as string,
        password: this.form.value.password as string,
      }

      this.auth.login(user).subscribe(response => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      }, () => {
        this.submitted = false
        }
      )
    }
  }
}
