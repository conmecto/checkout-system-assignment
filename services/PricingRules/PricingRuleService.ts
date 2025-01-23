import { Discount } from "../../models/Discount";
import { PricingRuleFactory } from "./PricingRuleFactory";

export class PricingRuleService {
    applyPricingRules(
        items: Map<string, number>,
        prices: Map<string, number>,
        discounts: Discount[]
    ): number {
        let total = 0;
        for (const discount of discounts) {
            const pricingRule = PricingRuleFactory.getPricingRule(discount);
            total += pricingRule.apply(items, prices, discount);
        }
        return total;
    }
}