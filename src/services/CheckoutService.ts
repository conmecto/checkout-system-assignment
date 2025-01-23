import { Product } from "../models/Product";
import { Discount } from "../models/Discount";
import { PricingRuleService } from "./PricingRules/PricingRuleService";

export class CheckoutService {
    private items: Map<string, number>  = new Map();
    private products: Map<string, number> = new Map();
    public pricingRuleSerivce: PricingRuleService;

    constructor(
        products: Product[],
        pricingRuleSerivce: PricingRuleService,
        private discounts: Discount[]
    ) { 
        products.forEach((p) => {
            this.products.set(p.sku, p.price);
        });
        this.pricingRuleSerivce = pricingRuleSerivce;
    }

    scan(sku: string): void {
        if (this.products.has(sku)) {
            const itemCount = this.items.has(sku) ? this.items.get(sku)! : 0;
            this.items.set(sku, itemCount + 1);
            console.log(`Item added: ${sku}`);
        }
    }

    total(): number {
        const totalPriceWithDiscountApplied = this.pricingRuleSerivce.applyPricingRules(
            this.items,
            this.products,
            this.discounts
        );
        const totalPriceWithoutNoDiscount = this.calculateTotalPriceWithNoDiscount();
        return totalPriceWithDiscountApplied + totalPriceWithoutNoDiscount;
    }

    private calculateTotalPriceWithNoDiscount(): number {
        let total = 0;
        for (const [key, value] of this.items) {
            const sku = key;
            const count = value;
            const hasDiscount = this.discounts.some((d) => d.sku === sku);
            if (!hasDiscount) {
                total += count * this.products.get(sku)!;
            }
        }
        return total;
    }
}