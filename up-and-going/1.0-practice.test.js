/*
  DONE: Write a program to calculate the total price of your phone purchase. 
  DONE: You will keep purchasing phones (hint: loop!) until you run out of money in your bank account. 
  DONE: You'll also buy accessories for each phone as long as your purchase amount is below your mental spending threshold.
  
  DONE: After you've calculated your purchase amount, add in the tax, then print out the calculated purchase amount, properly formatted.
  
  TODO: Finally, check the amount against your bank account balance to see if you can afford it or not.
  
  DONE: You should set up some constants for the "tax rate," "phone price," "accessory price," and "spending threshold," as well as a variable for your "bank account balance.""
  
  DONE: You should define functions for calculating the tax and for formatting the price with a "$" and rounding to two decimal places.
  
  Bonus Challenge: Try to incorporate input into this program, perhaps with the prompt(..) covered in "Input" earlier. 
  You may prompt the user for their bank account balance, for example. 
  Have fun and be creative!
*/

import PhoneShop from "./1.0-practice.js";

describe("it should handle setting and getting core values", () => {
	test("set and check tax rate, phone price and accessory price", () => {
		const taxRate = 0.2;
		const phonePrice = 299.95;
		const accessoryPrice = 49.95;
		const ps = new PhoneShop(taxRate, phonePrice, accessoryPrice);
		expect(ps.taxRate).toBe(taxRate);
		expect(ps.phonePrice).toBe(phonePrice);
		expect(ps.accessoryPrice).toBe(accessoryPrice);
	});
	test("it should use defaults", () => {
		const ps = new PhoneShop();
		expect(ps.taxRate).toBe(0);
		expect(ps.phonePrice).toBe(0);
		expect(ps.accessoryPrice).toBe(0);
	});
});

describe("it should allow phone purchases", () => {
	test("it should purchase 1 phone", () => {
		const ps = new PhoneShop(0, 199.99, 0);
		ps.purchasePhone(1);
		expect(ps.phones).toBe(1);
	});
	test("it should purchase 5 phones", () => {
		const ps = new PhoneShop(0, 199.99, 0);
		ps.purchasePhone(5);
		expect(ps.phones).toBe(5);
	});
	test("it should purchase multiple quantities of phones in turn", () => {
		const ps = new PhoneShop(0, 199.99, 0);
		ps.purchasePhone(2);
		expect(ps.phones).toBe(2);
		ps.purchasePhone(7);
		expect(ps.phones).toBe(9);
		ps.purchasePhone(1);
		expect(ps.phones).toBe(10);
	});
});

describe("it should allow accessory purchases", () => {
	test("it should purchase 1 accessory", () => {
		const ps = new PhoneShop(0, 199.99, 75.0);
		ps.purchaseAccessory(1);
		expect(ps.accessories).toBe(1);
	});
	test("it should purchase 3 accessories", () => {
		const ps = new PhoneShop(0, 199.99, 20.0);
		ps.purchaseAccessory(3);
		expect(ps.accessories).toBe(3);
	});
	test("it should purchase multiple quantities of accessories in turn", () => {
		const ps = new PhoneShop(0, 199.99, 99.99);
		ps.purchaseAccessory(2);
		expect(ps.accessories).toBe(2);
		ps.purchaseAccessory(7);
		expect(ps.accessories).toBe(9);
		ps.purchaseAccessory(1);
		expect(ps.accessories).toBe(10);
	});
});

describe("it should format currency", () => {
	test("it should format various prices in sterling", () => {
		const ps = new PhoneShop();
		expect(ps.formatCurrency(12.95)).toBe("£12.95");
		expect(ps.formatCurrency(1)).toBe("£1.00");
		expect(ps.formatCurrency(299.95001)).toBe("£299.95");
		expect(ps.formatCurrency(99.999)).toBe("£100.00");
		expect(ps.formatCurrency(50.0)).toBe("£50.00");
	});
});

describe("it should calculate tax", () => {
	test("it should calculate tax", () => {
		const ps = new PhoneShop(20, 299.95, 49.95);
		expect(ps.calculateTax(100)).toBe(20);
		expect(ps.calculateTax(49.95)).toBe(9.99);
		expect(ps.calculateTax(299.95)).toBe(59.99);
	});
});

describe("it should keep track of total spend", () => {
	test("it should calculate total net spend", () => {
		const ps = new PhoneShop(20, 299.95, 49.95);
		ps.purchasePhone(1);
		ps.purchaseAccessory(1);
		expect(ps.totalCostNet()).toBe(299.95 + 49.95);
	});
	test("it should calculate total gross spend (with tax)", () => {
		const ps = new PhoneShop(20, 299.95, 49.95);
		ps.purchasePhone(1);
		ps.purchaseAccessory(1);
		expect(ps.totalCostGross()).toBe(((299.95 + 49.95) * (100 + 20)) / 100);
	});
});

describe("Write the program", () => {
	test("it should satisfy the requirements of the problem", () => {
		const BANK_BALANCE = 1000.0;
		const SPEND_THRESHOLD = 800.0;
		const ps = new PhoneShop(20, 299.95, 39.95);
		while (ps.totalCostNet() < BANK_BALANCE) {
			ps.purchasePhone(1);
			if (ps.totalCostNet() < SPEND_THRESHOLD) {
				ps.purchaseAccessory(1);
			}
		}
		expect(ps.totalCostNet()).toBe(
			299.95 + 39.95 + 299.95 + 39.95 + 299.95 + 299.95 // 1279.70
		);
		expect(ps.formatCurrency(ps.totalCostGross())).toBe("£1535.64"); // 1279.70 + 20% tax
		expect(ps.isInBudget(BANK_BALANCE)).toBeFalsy();
	});
});
