document.addEventListener('DOMContentLoaded', () => {
  const miniaturas = document.getElementsByClassName('slide-miniatura');
  Array.from(miniaturas).forEach((miniatura) => {
    miniatura.addEventListener('click', () => {
      const activeSlide = document.getElementsByClassName('slide active')[0];
      activeSlide.classList.remove('active');
      document
        .querySelector(`[data-img-id='${miniatura.dataset.imgId}']`)
        .classList.add('active');
    });
  });
});
