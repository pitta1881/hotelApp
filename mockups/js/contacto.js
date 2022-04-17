document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementsByTagName('form')[0];
  const toast = document.getElementById('toast');
  const loader = document.getElementById('loader');
  form.addEventListener('submit', async (e) => {
    loader.classList.add('active');
    document.body.classList.add('noscroll');
    e.preventDefault();
    const hotelUri = 'hotelpato'; //TODO: cambiar hotelUri por el location algo
    let inputHotelUri = document.createElement('input');
    inputHotelUri.setAttribute('name', 'hotel_nombre_uri');
    inputHotelUri.setAttribute('value', hotelUri);
    inputHotelUri.setAttribute('type', 'hidden');

    //TODO: hacer un fetch de post a api/mensajes
    setTimeout(() => {
      if (true) {
        form.reset();
        toast.innerHTML = `
          <p>Mensaje enviado correctamente</p>
        `;
        toast.classList.add('active', 'success');
      } else {
        toast.innerHTML = `
          <ul>
            <li>Error 1</li>
            <li>Error 2</li>
          </ul>
        `;
        toast.classList.add('active', 'error');
      }
      document.body.className = '';
      loader.className = '';
      setTimeout(function () {
        toast.className = '';
      }, 3000);
    }, 1000);
  });
});
