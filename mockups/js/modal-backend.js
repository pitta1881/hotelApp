document.addEventListener('DOMContentLoaded', () => {
  const btnOpenModal = document.getElementsByClassName('open-modal');
  Array.from(btnOpenModal).forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('noscroll');
      const targetEl = document.getElementById(btn.dataset.target);
      targetEl.classList.add('active');
    });
  });
  const closeModalBtns = document.getElementsByClassName('close-modal');
  Array.from(closeModalBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('active');
      document.body.classList.toggle('noscroll');
    });
  });
  const modals = document.getElementsByClassName('modal');
  Array.from(modals).forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        modal.classList.remove('active');
        document.body.classList.toggle('noscroll');
      }
    });
  });
});
