interface BundleDiscountProps {
    bundleSize: number
    quantityPaidForBundleSize: number
}

interface BulkDiscountProps {
    threshold: number
    discountedPrice: number
}

interface DiscountInterface {
    type: string;
    sku: string;
    bulkProps?: BulkDiscountProps
    bundleProps?: BundleDiscountProps
}

export class Discount implements DiscountInterface {
    constructor(
        public type: string,
        public sku: string,
        public bulkProps?: BulkDiscountProps,
        public bundleProps?: BundleDiscountProps
    ) {}
}