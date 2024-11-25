const fs = require("fs");
const path = require("path");

// Đọc dữ liệu từ db.json (hoặc kết nối với cơ sở dữ liệu thật)
const getProducts = () => {
  const dataPath = path.join(__dirname, "../data/db.json");
  const data = JSON.parse(fs.readFileSync(dataPath));
  return data.products;
};

// Lưu dữ liệu vào db.json
const saveProducts = (products) => {
  const dataPath = path.join(__dirname, "../data/db.json");
  const data = JSON.parse(fs.readFileSync(dataPath));
  data.products = products;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = (req, res) => {
  const products = getProducts();
  res.json(products);
};

// Lấy chi tiết sản phẩm theo ID
exports.getProductById = (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Thêm sản phẩm mới
exports.createProduct = (req, res) => {
  const products = getProducts();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

// Cập nhật sản phẩm theo ID
exports.updateProduct = (req, res) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    saveProducts(products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Xóa sản phẩm theo ID
exports.deleteProduct = (req, res) => {
  let products = getProducts();
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  saveProducts(products);
  res.status(204).send();
};
