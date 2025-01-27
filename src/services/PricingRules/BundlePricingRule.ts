import { PricingRule } from "./PricingRule";
import { Discount } from "../../models/Discount";

export class BundlePricingRule implements PricingRule {
    apply(
        items: Map<string, number>,
        productPrices: Map<string, number>,
        discount: Discount
    ): number {
        const props = discount.bundleProps;
        const count = items.get(discount.sku) || 0;
        const price = productPrices.get(discount.sku)!;
        const totalDiscountedQuantity = Math.floor(count / props.bundleSize!) * props.quantityPaidForBundleSize!;
        const remainingQuantity = count % props.bundleSize!;
        const total = totalDiscountedQuantity + remainingQuantity;
        return total * price;
   }
}