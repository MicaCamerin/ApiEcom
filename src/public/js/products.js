async function ensureCart() {
  let cartId = localStorage.getItem('cartId');
  if (!cartId) {
    const res = await fetch('/api/carts', { method: 'POST' });
    const data = await res.json();
    const id = data.payload?._id || data._id || data.id || data.payload;
    cartId = id;
    localStorage.setItem('cartId', cartId);
  }
  return cartId;
}

document.addEventListener('click', async (e) => {
  if (e.target.matches('.add-to-cart')) {
    const pid = e.target.dataset.id;
    const cid = await ensureCart();
    const res = await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'POST' });
    if (res.ok) {
      alert('Agregado al carrito');
    } else {
      alert('Error al agregar');
    }
  }
});