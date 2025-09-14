const socket = io();

// Referencias
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const deleteForm = document.getElementById('delete-form');

// Enviar nuevo producto
productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(productForm));
  socket.emit('newProduct', data);
  productForm.reset();
});

// Eliminar producto
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = e.target.id.value;
  socket.emit('deleteProduct', id);
  deleteForm.reset();
});

// Actualizar lista
socket.on('updateProducts', (product) => {
  const li = document.createElement('li');
  li.id = `prod-${product.id}`;
  li.textContent = `${product.title} - ${product.price}`;
  productList.appendChild(li);
});

// Eliminar producto en lista
socket.on('removeProduct', (id) => {
  const li = document.getElementById(`prod-${id}`);
  if (li) li.remove();
});