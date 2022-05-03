import { ProductCategory } from './productCategory'

export class Product{
    _id? : string;
    name? : string;
    description? : string;
    richDescription? : string;
    image? : string;
    images? : string[];
    price? : number;
    isFeatured? : boolean;
    countInStock? : string;
    category? : ProductCategory;
}