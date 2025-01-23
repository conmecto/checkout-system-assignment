interface ProductInterface {
    sku: string;
    name: string;
    price: number;
}

export class Product implements ProductInterface {
    constructor(
        public sku: string,
        public name: string,
        public price: number
    ) {}
}