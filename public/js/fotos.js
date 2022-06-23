import { commonFetch, loadFileUploadEvent } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  checkPlusSlide,
  eventMiniaturas,
  fotoNextPrev,
} from './helpers/fotos-helper.js';

const loadFormEvents = () => {
  const formsObj = [
    {
      form: document.getElementById('form-create-foto'),
      method: 'post',
      apiUrl: `${location.origin}/api/fotos`,
      params: [],
      validations: {
        'tipo-carousel-id': {
          required: true,
        },
        'upload-foto': {
          required: true,
        },
        'new-descripcion-foto': {
          required: true,
        },
      },
      callback: [loadFotos],
      withFile: true,
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });
};

const loadInitialDataTiposCarousel = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/fotos/tiposCarousel`,
  );
  if (status === 'SUCCESS') {
    let rowTiposCarousel = ``;
    data.forEach((tipo) => {
      rowTiposCarousel += `
      <button
        type="button"
        class="open-modal-carousel green"
        data-target="modal-carousel"
        data-value="${tipo.id}"
        data-quien="${tipo.nombre}"
      >
        Carousel ${tipo.nombre}
      </button>
  `;
    });
    document.getElementById('buttons-tipos-carousel').innerHTML =
      rowTiposCarousel;
  }
};

const loadFotos = async (btn) => {
  let idCarousel;
  let nombreCarousel;
  document.getElementById('form-create-foto').reset();
  const modalTarget = document.getElementById('modal-carousel');
  if (modalTarget.classList.contains('active')) {
    idCarousel = document.getElementById('tipo-carousel-id').value;
    nombreCarousel = document.getElementById('carousel-nombre').textContent;
    const uploadControl = modalTarget.querySelector('.upload-control');
    if (uploadControl) {
      uploadControl.querySelector('.drop-zone').classList.remove('no-border');
      uploadControl.querySelector('.preview').classList.add('hide');
      uploadControl.querySelector('.drop-zone div').classList.remove('hide');
    }
  } else {
    idCarousel = btn.dataset.value;
    nombreCarousel = btn.dataset.quien;
    document
      .getElementById('tipo-carousel-id')
      .setAttribute('value', btn.dataset.value);
    document.getElementById('carousel-nombre').innerHTML = btn.dataset.quien;
  }
  const { status, data } = await commonFetch(
    `${location.origin}/api/fotos/carousel/${idCarousel}`,
  );
  if (status === 'SUCCESS') {
    document.getElementById('carousel-nombre').innerHTML = nombreCarousel;
    const firstLiForm = document.getElementById('galeria-add-foto');
    firstLiForm.classList.add('active');
    const btnDeleteFoto = document.getElementById('btn-delete-foto');
    btnDeleteFoto.classList.add('hide');
    if (data.length > 0 && !modalTarget.classList.contains('active')) {
      firstLiForm.classList.remove('active');
      btnDeleteFoto.classList.remove('hide');
    }
    document.getElementById('oneSlide').firstElementChild.innerHTML =
      data.reduce(
        (sumHTML, foto, index) =>
          (sumHTML += `
              <li class="slide ${
                index === 0 && !modalTarget.classList.contains('active')
                  ? 'active'
                  : ''
              }" data-img-id="${foto.id}">
                <img
                  src="${foto.path}"
                  alt="${foto.descripcion}"
                  class="contain"
                />
              </li>
            `),
        ``,
      );
    document.getElementById('oneSlide').firstElementChild.prepend(firstLiForm);
    const firstLiMiniatura = document.getElementById(
      'galeria-add-foto-miniatura',
    );
    firstLiMiniatura.classList.remove('active');
    document.getElementById('galeria').firstElementChild.innerHTML =
      data.reduce(
        (sumHTML, foto) =>
          (sumHTML += `
              <li class="slide-miniatura" data-img-id="${foto.id}">
                <img
                  src="${foto.path}"
                  alt="${foto.descripcion}"
                />
              </li>
            `),
        ``,
      );
    document
      .getElementById('galeria')
      .firstElementChild.prepend(firstLiMiniatura);
    eventMiniaturas();
    modalTarget.classList.add('active');
  }
};

const loadButtonsEvents = () => {
  const btnsOpenModalManageFotos = document.getElementsByClassName(
    'open-modal-carousel',
  );
  Array.from(btnsOpenModalManageFotos).forEach((btn) => {
    btn.addEventListener('click', async () => {
      loadFotos(btn);
    });
  });
};
const loadFotosEvents = () => {
  const carouselUl = document.getElementById('oneSlide').firstElementChild;
  const galeriaUl = document.getElementById('galeria').firstElementChild;
  const btnDeleteFoto = document.getElementById('btn-delete-foto');
  btnDeleteFoto.addEventListener('click', async () => {
    const activeSlide = carouselUl.getElementsByClassName('slide active')[0];
    const idToDelete = activeSlide.dataset.imgId;
    const { status } = await commonFetch(
      `${location.origin}/api/fotos/${idToDelete}`,
      'delete',
    );
    if (status === 'SUCCESS') {
      const nextSibling = activeSlide.nextElementSibling;
      if (nextSibling) {
        nextSibling.classList.add('active');
      } else {
        const plusBoton = activeSlide.parentElement.firstElementChild;
        plusBoton.classList.add('active');
      }
      const imgGaleria = galeriaUl.querySelector(
        `[data-img-id="${idToDelete}"]`,
      );
      activeSlide.remove();
      imgGaleria.remove();
    }
    checkPlusSlide();
  });

  fotoNextPrev();
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadInitialDataTiposCarousel();
  loadFormEvents();
  loadButtonsEvents();
  loadFotosEvents();
  loadFileUploadEvent('upload-foto');
});
