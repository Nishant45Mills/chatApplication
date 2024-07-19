import { FormControl } from "@angular/forms";

export interface RegisterModel {
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}

export interface LoginModel {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}