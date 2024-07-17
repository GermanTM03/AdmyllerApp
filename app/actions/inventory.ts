import { InventoryService } from "@/src/services/InventoryServices";
import { IInventory } from "@/src/interfaces/inventory";

export async function AddProduct(branchId: number, product: IInventory) {
    try {
        const response = await InventoryService.AddProduct(branchId, product);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateProduct(branchId: number, productId: number, payload: IInventory) {
    try {
        const response = await InventoryService.UpdateProduct(branchId, productId, payload);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function GetProduct(branchId: number, productId: number) {
    try {
        const response = await InventoryService.GetProduct(branchId, productId);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function DeleteProduct(branchId: number, productId: number) {
    try {
        const response = await InventoryService.DeleteProduct(branchId, productId);
        return response;
    } catch (error) {
        console.error(error);
    }
}
