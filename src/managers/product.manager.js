const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
    }

    async getProducts() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id == id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { 
            id: products.length ? products[products.length - 1].id + 1 : 1,
            ...product 
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedFields, id: products[index].id };
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const newProducts = products.filter(p => p.id != id);
        await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
    }
}

module.exports = ProductManager;