document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementsByTagName('form')[0];
  const toast = document.getElementById('toast');
  const loader = document.getElementById('loader');
  form.addEventListener('submit', (e) => {
    loader.classList.add('active');
    document.body.classList.add('noscroll');
    e.preventDefault();
    const hotelUri = location.pathname.split('/')[1];
    let inputHotelUri = document.createElement('input');
    inputHotelUri.setAttribute('name', 'hotel_nombre_uri');
    inputHotelUri.setAttribute('value', hotelUri);
    inputHotelUri.setAttribute('type', 'hidden');
    form.appendChild(inputHotelUri);

    const dataForm = new FormData(form);
    const jsonToSend = Object.fromEntries(dataForm.entries());
    jsonToSend.adultos = Number(jsonToSend.adultos);
    jsonToSend.menores = Number(jsonToSend.menores);
    fetch(`${location.origin}/api/mensajes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonToSend),
    })
      .then((response) => response.json())
      .then((dataJson) => {
        if (dataJson.status === 'SUCCESS') {
          form.reset();
          toast.innerHTML = `
            <p>Mensaje enviado correctamente</p>
          `;
          toast.classList.add('active', 'success');
        } else {
          console.log(dataJson);
          let erroresLi = ``;
          dataJson.message.forEach((mensaje, index) => {
            erroresLi += `<li>${++index}. ${mensaje}</li>`;
          });
          toast.innerHTML = `
            <ul>
              ${erroresLi}
            </ul>
          `;
          toast.classList.add('active', 'error');
        }
        document.body.className = '';
        loader.className = '';
        setTimeout(function () {
          toast.className = '';
        }, 7000);
      });
  });
});
