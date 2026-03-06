import { ValidatorForm } from "../../../utils/validator-form";

export class Login {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute
        const form = document.querySelector('.auth__inputs')

        new ValidatorForm(form, {
            email: [
                {
                    regex: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                    message: 'Enter valid email address'
                },
            ]
        });
    }
}
