import { Product } from './models/Product';
import { Discount } from './models/Discount';
import { CheckoutService } from './services/CheckoutService';
import { PricingRuleService } from './services/PricingRules/PricingRuleService';

const productsData = [
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
    { sku: "atv", name: "Apple TV", price: 109.5 },
    { sku: "vga", name: "VGA adapter", price: 30.0 }
];

const discountData = [
    { type: "bulk", sku: "ipd", bulkProps: { threshold: 4, discountedPrice: 499.99 } },
    { type: "bundle", sku: "atv", bundleProps: { bundleSize: 3, quantityPaidForBundleSize: 2 } }
];

const products = productsData.map(
    ({ sku, name, price }) => new Product(sku, name, price)
);

const discounts = discountData.map(({ type, sku, bulkProps, bundleProps }) => 
    new Discount(type, sku, bulkProps, bundleProps)
);

const pricingRuleService = new PricingRuleService();

const checkoutService1 = new CheckoutService(products, pricingRuleService, discounts);

checkoutService1.scan("atv");
checkoutService1.scan("atv");
checkoutService1.scan("atv");
checkoutService1.scan("vga");

console.log(`Total price: $${checkoutService1.total()}`);

console.log();

const checkoutService2 = new CheckoutService(products, pricingRuleService, discounts);

checkoutService2.scan("atv");
checkoutService2.scan("ipd");
checkoutService2.scan("ipd");
checkoutService2.scan("atv");
checkoutService2.scan("ipd");
checkoutService2.scan("ipd");
checkoutService2.scan("ipd");

console.log(`Total price: $${checkoutService2.total()}`);