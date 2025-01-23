interface DiscountInterface {
    type: string;
    sku: string;
    bundleSize?: number;
    quantityPaidForBundleSize?: number;
    threshold?: number;
    discountedPrice?: number;
}

export class Discount implements DiscountInterface {
    constructor(
        public type: string,
        public sku: string,
        public bundleSize?: number,
        public quantityPaidForBundleSize?: number,
        public threshold?: number,
        public discountedPrice?: number
    ) {}
}