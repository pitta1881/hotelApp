document.addEventListener('DOMContentLoaded', () => {
  const nextSlide = () => {
    const activeSlide = document.getElementsByClassName('slide active')[0];
    activeSlide.classList.remove('active');
    const nextSibling = activeSlide.nextElementSibling;
    if (nextSibling) {
      nextSibling.classList.add('active');
    } else {
      activeSlide.parentElement.firstElementChild.classList.add('active');
    }
  };

  const prevSlide = () => {
    const activeSlide = document.getElementsByClassName('slide active')[0];
    activeSlide.classList.remove('active');
    const prevSibling = activeSlide.previousElementSibling;
    if (prevSibling) {
      prevSibling.classList.add('active');
    } else {
      activeSlide.parentElement.lastElementChild.classList.add('active');
    }
  };

  document.getElementById('foto-next').addEventListener('click', nextSlide);
  document.getElementById('foto-prev').addEventListener('click', prevSlide);
});
