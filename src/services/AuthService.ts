import { IUser } from "../interfaces/user"
import { API_URL } from "../utils/environment"

// const API_URL = process.env.API_URL

export interface Credentials {
    email: string
    password: string
}

export class AuthService {
    static async Login(credentials: Credentials) {
        const response = await fetch(`${API_URL}/Auth/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            
        })
        return response
    }

    static async Register(body: IUser) {
        const response = await fetch(`${API_URL}/Auth/SignUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return response
    }
}
