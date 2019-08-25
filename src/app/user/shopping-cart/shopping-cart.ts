import { Product } from 'src/app/admin/admin-products/product';

export class ShoppingCart {
    id?:string;
    dateCreated:number;
    items:Product[]
}
