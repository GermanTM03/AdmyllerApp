import { NextAuthUser } from "@/src/interfaces/user";
import { AuthService, Credentials } from "@/src/services/AuthService";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface User {
        token: string;
    }

    interface Session {
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}

export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'email',
                    type: 'email'
                },
                password: {
                    label: 'password',
                    type: 'password'
                },
            },
            async authorize(credentials, req) {
                const response = await AuthService.Login({ email: credentials?.email, password: credentials?.password } as Credentials)
                const data = await response.json()
                if (data && data.isSuccess) {
                    return data.user
                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.user = user
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = token.user as NextAuthUser
            return session
        },
        async redirect({ url, baseUrl, }) {
            return baseUrl
        },
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    pages: {
        signIn: '/login',
        signOut: '/logout'
    }
}
