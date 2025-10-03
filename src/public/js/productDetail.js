document.getElementById('add-to-cart')?.addEventListener('click', async (e) => {
  const pid = e.target.dataset.id;
  let cartId = localStorage.getItem('cartId');
  if (!cartId) {
    const res = await fetch('/api/carts', { method: 'POST' });
    const data = await res.json();
    cartId = data.payload?._id || data._id || data.id || data.payload;
    localStorage.setItem('cartId', cartId);
  }
  const res = await fetch(`/api/carts/${cartId}/product/${pid}`, { method: 'POST' });
  if (res.ok) alert('Producto agregado');
  else alert('Error agregando producto');
});