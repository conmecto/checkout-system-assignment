import { PricingRule } from "./PricingRule";
import { Discount } from "../../models/Discount";

export class BulkPricingRule implements PricingRule {
    apply(
        items: Map<string, number>,
        productPrices: Map<string, number>,
        discount: Discount
    ): number {
        const props = discount.bulkProps;
        const count = items.get(discount.sku) || 0;
        const price = count > (props.threshold || 0) 
            ? props.discountedPrice! 
            : productPrices.get(discount.sku)!;
        return count * price;
    }
}