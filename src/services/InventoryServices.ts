import { API_URL } from "../utils/environment";
import GetToken from "../utils/getToken";

export class InventoryService {
    private static async getToken() {
        return await GetToken();
    }

    static async GetProducts(branchId: number) {
        const response = await fetch(`${API_URL}/Inventory/GetProducts/${branchId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
        });
        const data = await response.json();
        return data;
    }

    static async AddProduct(branchId: number, product: any) {
        const response = await fetch(`${API_URL}/Inventory/AddProduct/${branchId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    }

    static async UpdateProduct(branchId: number, productId: number, product: any) {
        const response = await fetch(`${API_URL}/Inventory/UpdateProduct/${branchId}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    }

    static async DeleteProduct(branchId: number, productId: number) {
        const response = await fetch(`${API_URL}/Inventory/DeleteProduct/${branchId}/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": await this.getToken()
            },
        });
        const data = await response.json();
        return data;
    }
}
