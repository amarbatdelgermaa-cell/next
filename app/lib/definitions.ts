// ТАЙЛБАР: Customer, Invoice зэрэг өгөгдөл ямар талбартайг TypeScript-ээр тодорхойлно.
export type Customer={id:string;name:string;email:string;image_url:string};
export type Invoice={id:string;customer_id:string;amount:number;status:'paid'|'pending';date:string};
export type User={id:string;name:string;email:string;password:string};
export type InvoiceRow=Invoice&{customer_name:string;customer_email:string};
