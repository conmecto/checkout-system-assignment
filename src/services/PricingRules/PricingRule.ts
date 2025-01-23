import { Discount } from "../../models/Discount";

export interface PricingRule {
    apply(
        items: Map<string, number>,
        products: Map<string, number>,
        discount: Discount
    ): number;
}