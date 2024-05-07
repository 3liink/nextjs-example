import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import axios from "axios"

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & {
            userId?: number;
            serverToken?: string;
            role?: string;
            status?: boolean;
        };
    }
}

export const authOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            authorize: async (credentials) => {
                const data = {
                    provider: "credentials",
                    email: credentials?.email,
                    password: credentials?.password
                }
                const res = await axios.post(process.env.NEXT_PUBLIC_API + "/check-authentication", data)
                const user = await res.data.user
                if (res.data.ok) {
                    return user
                }
                return null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // signIn: "/login",
        // signOut: "/logout",
        // error: "/error",
    },
    callbacks: {
        async signIn(user: any) {
            return user
        },

        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token = {
                    ...token,
                    serverToken: user.serverToken,
                    userId: user.id,
                    role: user.role,
                    status: user.status,
                }
            }
            return token
        },

        async session({ session, token }: { session: any, token: any }) {
            if (token && session.user) {
                session = {
                    ...session,
                    user: {
                        ...session.user,
                        serverToken: token.serverToken,
                        userId: token.userId,
                        role: token.role,
                        status: token.status,
                    }
                }
            }
            return session
        },
    },
}