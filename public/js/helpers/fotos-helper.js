export const checkPlusSlide = () => {
  const carouselUl = document.getElementById('oneSlide').firstElementChild;
  const activeSlide = carouselUl.getElementsByClassName('slide active')[0];
  const btnDeleteFoto = document.getElementById('btn-delete-foto');
  if (activeSlide.id === 'galeria-add-foto') {
    btnDeleteFoto.classList.add('hide');
  } else {
    btnDeleteFoto.classList.remove('hide');
  }
};

export const eventMiniaturas = () => {
  const miniaturas = document.getElementsByClassName('slide-miniatura');
  Array.from(miniaturas).forEach((miniatura) => {
    miniatura.addEventListener('click', () => {
      const activeSlide = document.getElementsByClassName('slide active')[0];
      activeSlide.classList.remove('active');
      document
        .querySelector(`[data-img-id='${miniatura.dataset.imgId}']`)
        .classList.add('active');
      checkPlusSlide();
    });
  });
};

export const fotoNextPrev = () => {
  document.getElementById('foto-next').addEventListener('click', () => {
    const activeSlide = document.getElementsByClassName('slide active')[0];
    activeSlide.classList.remove('active');
    const nextSibling = activeSlide.nextElementSibling;
    if (nextSibling) {
      nextSibling.classList.add('active');
    } else {
      activeSlide.parentElement.firstElementChild.classList.add('active');
    }
    checkPlusSlide();
  });

  document.getElementById('foto-prev').addEventListener('click', () => {
    const activeSlide = document.getElementsByClassName('slide active')[0];
    activeSlide.classList.remove('active');
    const prevSibling = activeSlide.previousElementSibling;
    if (prevSibling) {
      prevSibling.classList.add('active');
    } else {
      activeSlide.parentElement.lastElementChild.classList.add('active');
    }
    checkPlusSlide();
  });
};
