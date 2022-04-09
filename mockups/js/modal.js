document.addEventListener('DOMContentLoaded', () => {
  const btnFotos = document.getElementsByClassName('btn-ver-fotos');
  Array.from(btnFotos).forEach((elem) => {
    elem.addEventListener('click', () => {
      //antes de ponerlo active, hacer un fetch para tomar las fotos de ésta habitacion
      //TODO: fetch habitacionFotos de this.habitacion y armar los li>img correspondientes
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
