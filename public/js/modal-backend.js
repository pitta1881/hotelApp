import { removeFormValidations } from './helpers/common-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnOpenModal = document.getElementsByClassName('open-modal');
  Array.from(btnOpenModal).forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.add('noscroll');
      const targetEl = document.getElementById(btn.dataset.target);
      targetEl.classList.add('active');
    });
  });
  const closeModalBtns = document.getElementsByClassName('close-modal');
  Array.from(closeModalBtns).forEach((btn) => {
    btn.addEventListener('click', () => {
      const form = btn.closest('form');
      btn.closest('.modal').classList.remove('active');
      document.body.classList.remove('noscroll');
      removeFormValidations(form);
      form.reset();
    });
  });
  const modals = document.getElementsByClassName('modal');
  Array.from(modals).forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        const forms = modal.querySelectorAll('form');
        modal.classList.remove('active');
        document.body.classList.remove('noscroll');
        forms.forEach((form) => {
          removeFormValidations(form);
          form.reset();
        });
      }
    });
  });
});
