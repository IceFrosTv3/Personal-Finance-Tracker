import config from "../config/config";

export class AuthUtils {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoTokenKey = 'userInfo';
    static rememberMeKey = 'rememberMe';

    static setAuthInfo (accessToken, refreshToken, userInfo = null, remember = false) {
        const storage = remember ? localStorage : sessionStorage;
        localStorage.setItem(this.rememberMeKey, String(remember));

        storage.setItem(this.accessTokenKey, accessToken);
        storage.setItem(this.refreshTokenKey, refreshToken);
        if ( userInfo ) {
            storage.setItem(this.userInfoTokenKey, JSON.stringify(userInfo));
        }
    }

    static getStorage () {
        return localStorage.getItem(this.rememberMeKey) === 'true' ? localStorage : sessionStorage;
    }

    static getAuthInfo (key = null) {
        if ( key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoTokenKey].includes(key) ) {
            return this.getStorage().getItem(key);
        } else {
            return {
                [this.accessTokenKey]: this.getStorage().getItem(this.accessTokenKey),
                [this.refreshTokenKey]: this.getStorage().getItem(this.refreshTokenKey),
                [this.userInfoTokenKey]: JSON.parse(this.getStorage().getItem(this.userInfoTokenKey)),
            }
        }
    }

    static async updateRefreshToken () {
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        if ( !refreshToken ) {
            this.removeAuthInfo();
            return false
        }

        try {
            const response = await fetch(config.api + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ refreshToken })
            });
            if ( response.status === 200 ) {
                const tokens = await response.json();
                if ( tokens?.accessToken && tokens?.refreshToken ) {
                    this.setAuthInfo(tokens.accessToken, tokens.refreshToken);
                    return true;
                }
            } else if ( response.status === 400 || response.status === 401 ) {
                this.removeAuthInfo();
            }
        } catch (e) {
            console.error('Failed to refresh token:', e)
            return false;
        }
    }

    static removeAuthInfo () {
        this.getStorage().removeItem(this.accessTokenKey);
        this.getStorage().removeItem(this.refreshTokenKey);
        this.getStorage().removeItem(this.userInfoTokenKey);
    }
}
