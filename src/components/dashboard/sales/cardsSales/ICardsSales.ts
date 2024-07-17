export interface CardSalesProps {
    idQuotation: number;
    client: string; 
    QuotationDate: Date;
    type: "mano de obra" | "servicio" | "refacciones";
    productService: string;
    description: string;
    quantity: number;
    price: number;
    subTotal: number;
    IVA: number;  
    total: number;
    
   
  }
  