import { AuthOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import { NextAuthUser } from "../interfaces/user";

export default async function GetToken() {
    const session = await getServerSession(AuthOptions)
    const user = session?.user as NextAuthUser
    let token = user.accessToken
    const auth = "Bearer " + token
    return auth
}