'use server'
import { IBranch } from "@/src/interfaces/branch";
import { BranchService } from "@/src/services/BranchService";

export async function AddBranch(branch: IBranch) {
    try {
        const response = await BranchService.AddBranch(branch)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function UpdateBrach(branchId: number, payload: IBranch) {
    try {
        const response = await BranchService.UpdateBranch(branchId, payload)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function GetBranchById(branchId: number) {
    try {
        const response = await BranchService.GetBranchById(branchId)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteBranch(branchId: number) {
    try {
        const response = await BranchService.DeleteBranch(branchId)
        return response
    } catch (error) {
        console.log(error)
    }
}