import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordLengthErrValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const login: string = control.get('login').value;
    const password: string = control.get('password').value;
    return login && password && login.length >= password.length ? { 'passLengthErr': true } : null;
};