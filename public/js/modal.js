document.addEventListener('DOMContentLoaded', () => {
  const btnFotos = document.getElementsByClassName('btn-ver-fotos');
  Array.from(btnFotos).forEach((elem) => {
    elem.addEventListener('click', async (e) => {
      let dataFotos = [];
      const hotelUri = location.pathname.split('/')[1];
      const habitacionId = e.target.dataset.habitacionId;
      await fetch(
        `${location.origin}/api/habitaciones/${hotelUri}/${habitacionId}/fotos`,
      )
        .then((response) => response.json())
        .then((dataJson) => (dataFotos = dataJson.data));

      let innerHTMLFotos = ``;
      dataFotos.forEach((foto, index) => {
        innerHTMLFotos += `
          <li class="slide ${index === 0 ? 'active' : ''}">
              <img src="${foto.path}" alt="${foto.descripcion}"/>
            </li>
          `;
      });
      const oneSlide = document.getElementById('oneSlide');
      const ulOneSlide = oneSlide.getElementsByTagName('ul')[0];
      ulOneSlide.innerHTML = innerHTMLFotos;
      document.getElementById('modal-fotos').classList.add('active');
    });
  });
  const closeModalBtn = document.getElementById('close-modal');
  const modalFotos = document.getElementById('modal-fotos');
  closeModalBtn.addEventListener('click', () => {
    modalFotos.classList.remove('active');
  });
  modalFotos.addEventListener('click', (e) => {
    if (e.target.id === 'modal-fotos') {
      modalFotos.classList.remove('active');
    }
  });
});
