"use strict";

class PhoneShop {
	constructor(taxRate = 0.0, phonePrice = 0.0, accessoryPrice = 0.0) {
		this.taxRate = taxRate;
		this.phonePrice = phonePrice;
		this.accessoryPrice = accessoryPrice;
		this.phones = 0;
		this.accessories = 0;
	}
	calculateTax(price) {
		return (price * this.taxRate) / 100;
	}
	formatCurrency(price) {
		return `£${price.toFixed(2)}`;
	}
	isInBudget(budget) {
		return this.totalCostGross < budget;
	}
	purchaseAccessory(quantity) {
		this.accessories += quantity;
	}
	purchasePhone(quantity) {
		this.phones += quantity;
	}
	totalCostGross() {
		return (this.totalCostNet() * (100 + this.taxRate)) / 100;
	}
	totalCostNet() {
		return (
			this.phones * this.phonePrice + this.accessories * this.accessoryPrice
		);
	}
}

export default PhoneShop;
