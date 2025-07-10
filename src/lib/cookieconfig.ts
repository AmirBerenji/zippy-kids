import { cookies } from 'next/headers'


export default class CookieConfig {
    token: string | undefined;
    constructor() {
        this.token = '';
    }

    getToken = async (cookieName: string) => {
        try {
            const cookiesList = await cookies()
            const hasCookie = cookiesList.has(cookieName)
            if (hasCookie) {
                const cookieStore = cookies()
                this.token = (await cookieStore).get(cookieName)?.value
            }
            return this.token;
        } catch
        {
            return '';
        }

    }

    setToken = async (cookieName: string, value: string) => {
        try {
            const cookieStore = cookies()
            console.log(value);
            (await cookieStore).set(cookieName, value)
        } catch
        {
            return '';
        }
    }

    deleteCookie = async (cookieName: string) => {
        try {
            const cookieStore = cookies();
            (await cookieStore).delete('jwt');
        } catch (e) {
            console.log(e);
        }
    }
}