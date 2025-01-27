import { CheckoutService } from "../src//services/CheckoutService";
import { PricingRuleService } from "../src/services/PricingRules/PricingRuleService";
import { Product } from "../src/models/Product";
import { Discount } from "../src/models/Discount";

const products: Product[] = [
    { sku: "ipd", name: "Super iPad", price: 15 },
    { sku: "mbp", name: "MacBook Pro", price: 25 },
    { sku: "atv", name: "Apple TV", price: 20 },
    { sku: "vga", name: "VGA adapter", price: 8 },
];

const discounts: Discount[] = [
    {
        type: "bulk",
        sku: "ipd",
        bulkProps: {
            threshold: 5,
            discountedPrice: 12,
        }
    },
    {
        type: "bundle",
        sku: "atv",
        bundleProps: {
            bundleSize: 4,
            quantityPaidForBundleSize: 3
        }
    },
];

let pricingRuleService: PricingRuleService;

describe("CheckoutService", () => {
    beforeEach(() => {
        pricingRuleService = new PricingRuleService();
    })

    it("should calculate total for Apple TV and VGA adapter", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("vga");
        expect(checkout.total()).toBe(68);
    });

    it("should calculate total for a mix of Apple TV, Super iPad, and MacBook Pro", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");
        expect(checkout.total()).toBe(115); 
    });

    it("should calculate total without any discounts for single items", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("ipd");
        checkout.scan("mbp");
        expect(checkout.total()).toBe(40); 
    });

    it("should apply bulk discount for Super iPad when buying 5", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        for (let i = 0; i < 6; i++) {
            checkout.scan("ipd");
        }
        expect(checkout.total()).toBe(72);
    });

    it("should apply bundle discount correctly for 6 Apple TVs", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        for (let i = 0; i < 6; i++) {
            checkout.scan("atv");
        }
        expect(checkout.total()).toBe(100);
    });

    it("should handle the case where no items are scanned", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        expect(checkout.total()).toBe(0);
    });

    it("should handle invalid SKUs gracefully", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("xyz");
        checkout.scan("mbp");
        expect(checkout.total()).toBe(25);
    });

    it("should calculate the total for a large mixed basket (Scenario I)", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("mbp");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("atv");
        checkout.scan("vga");
        expect(checkout.total()).toBe(161);
    });

    it("should calculate the total for a large mixed basket (Scenario II)", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("atv");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("mbp");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("atv");
        checkout.scan("vga");
        checkout.scan("ipd");
        expect(checkout.total()).toBe(176);
    });

    it("should calculate total for a new large mixed basket scenario (Scenario III)", () => {
        const checkout = new CheckoutService(products, pricingRuleService, discounts);
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("ipd");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("atv");
        checkout.scan("mbp");
        checkout.scan("vga");
        checkout.scan("ipd");
        checkout.scan("mbp");
        checkout.scan("mbp");

        expect(checkout.total()).toBe(215);
    });
});
