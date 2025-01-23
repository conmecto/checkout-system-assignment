import { PricingRule } from "./PricingRule";
import { Discount } from "../../models/Discount";
import { BulkPricingRule } from "./BulkPricingRule";
import { BundlePricingRule } from "./BundlePricingRule";

export class PricingRuleFactory {
    static getPricingRule(discount: Discount): PricingRule {
        switch (discount.type) {
            case "bulk":
                return new BulkPricingRule();
            case "bundle":
                return new BundlePricingRule();
            default:
                throw new Error(`Unknown discount type: ${discount.type}`);
        }
    }
}