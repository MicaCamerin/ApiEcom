const getCidFromPath = () => {
  const parts = location.pathname.split('/');
  return parts[2]; 
};

document.addEventListener('click', async (e) => {
  const cid = getCidFromPath();
  if (e.target.matches('.remove-item')) {
    const pid = e.target.dataset.pid;
    const res = await fetch(`/api/carts/${cid}/products/${pid}`, { method: 'DELETE' });
    if (res.ok) location.reload();
    else alert('Error al quitar item');
  }

  if (e.target.matches('.update-qty')) {
    const pid = e.target.dataset.pid;
    const input = document.querySelector(`.qty-input[data-pid="${pid}"]`);
    const quantity = Number(input.value);
    const res = await fetch(`/api/carts/${cid}/products/${pid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    if (res.ok) location.reload();
    else alert('Error al actualizar cantidad');
  }

  if (e.target.id === 'empty-cart') {
    const res = await fetch(`/api/carts/${cid}`, { method: 'DELETE' });
    if (res.ok) location.reload();
    else alert('Error al vaciar carrito');
  }
});