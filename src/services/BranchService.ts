import { revalidatePath } from "next/cache"
import { IBranch } from "../interfaces/branch"
import { ResponseType } from "../interfaces/response"
import { API_URL } from "../utils/environment"
import GetToken from "../utils/getToken"

export class BranchService {

    private static async getToken() {
        return await GetToken()
    }

    static async GetBranchs() {
        const response = await fetch(`${API_URL}/Branchs/Branchs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
        })
        const data: ResponseType<IBranch[]> = await response.json()
        return data
    }

    static async AddBranch(payload: IBranch) {
        const response = await fetch(`${API_URL}/Branchs/AddBranch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            body: JSON.stringify(payload),
            cache: 'no-store'
        })
        const data: ResponseType<IBranch> = await response.json()
        revalidatePath("/start")
        return data
    }

    static async GetBranchById(branchId: number) {
        const response = await fetch(`${API_URL}/Branchs/Branchs/${branchId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            cache: 'no-store'
        })
        const data: ResponseType<IBranch> = await response.json()
        return data
    }

    static async DeleteBranch(branchId: number) {
        const response = await fetch(`${API_URL}/Branchs/DeleteBranch/${branchId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            cache: 'no-store'
        })
        revalidatePath("/start")
        const data: ResponseType<IBranch> = await response.json()
        return data
    }

    static async UpdateBranch(branchId: number, payload: IBranch) {
        const response = await fetch(`${API_URL}/Branchs/UpdateBranch/${branchId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            body: JSON.stringify(payload),
            cache: 'no-cache'
        })
        const data: ResponseType<IBranch> = await response.json()
        // console.log(data)
        revalidatePath(`/`)
        return data
    }
}