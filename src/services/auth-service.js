import { HttpUtils } from "../utils/http-utils";
import * as bootstrap from 'bootstrap';

export class AuthService {
    static async register (data) {
        const result = await HttpUtils.request('/signup', 'POST', false, data);
        this.#showError(result);
        return result.response;
    }

    static async login (data) {
        const result = await HttpUtils.request('/login', 'POST', false, data)
        this.#showError(result);
        return result.response;
    }

    static #showError(result) {
        if ( result.error || !result.response || result.response.error ) {
            const toastElement = document.querySelector('.toast')
            toastElement.querySelector('.toast-body').textContent = result.response.message || 'Unknown error';
            new bootstrap.Toast(toastElement).show();
            return false;
        }
    }

    static async logout(data) {
        return await HttpUtils.request('/logout', 'POST', false, data)
    }
}
