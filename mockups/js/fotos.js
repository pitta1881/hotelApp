import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import { REGEX_STRING, REGEX_URL } from './helpers/regex-helpers.js';

const data = [
  [
    {
      id: 1,
      descripcion: 'foto del hotel - mostrador',
      path: 'https://www.entornoturistico.com/wp-content/uploads/2016/06/recepcion-de-hotel-1280x720.jpg',
      tipoCarouselId: 1,
      hotelId: 1,
    },
    {
      id: 2,
      descripcion: 'foto del hotel - recepcion',
      path: 'https://www.riu.com/blog/wp-content/uploads/2016/07/Recepci%C3%B3n-del-hotel.jpg',
      tipoCarouselId: 1,
      hotelId: 1,
    },
    {
      id: 3,
      descripcion: 'foto del hotel - recepcion 2',
      path: 'https://media-cdn.tripadvisor.com/media/photo-s/02/89/6d/9a/recepcion-del-hotel.jpg',
      tipoCarouselId: 1,
      hotelId: 1,
    },
    {
      id: 4,
      descripcion: 'foto del hotel - comedor 1',
      path: 'https://i.pinimg.com/originals/0b/9b/7b/0b9b7b4e4a5f437581a5d552b24c5052.jpg',
      tipoCarouselId: 1,
      hotelId: 1,
    },
    {
      id: 5,
      descripcion: 'foto del hotel - comedor 2',
      path: 'https://sp-ao.shortpixel.ai/client/q_lqip,ret_wait,w_566,h_377/https://www.fiaka.es/blog/wp-content/uploads/2020/04/mobiliario-para-hoteles-566x377.jpg',
      tipoCarouselId: 1,
      hotelId: 1,
    },
  ],
  [
    {
      id: 6,
      descripcion: 'foto del hotel - afuera 1',
      path: 'https://media-cdn.tripadvisor.com/media/photo-s/03/b2/93/22/amerian-san-luis-park.jpg',
      tipoCarouselId: 2,
      hotelId: 1,
    },
    {
      id: 7,
      descripcion: 'foto del hotel - afuera 2',
      path: 'https://thumbs.dreamstime.com/z/peque%C3%B1o-hotel-las-afueras-de-barcelona-esdolbarcelona-julio-bonito-con-piscina-la-temporada-tur%C3%ADstica-durante-epidemia-192791173.jpg',
      tipoCarouselId: 2,
      hotelId: 1,
    },
  ],
];

document.addEventListener('DOMContentLoaded', () => {
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
        'new-path': {
          required: true,
        },
        'new-descripcion-foto': {
          required: true,
        },
      },
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const fetchDeleteFoto = (id) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(true), 1000));
    /*return fetch(`${location.origin}/api/fotos/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Bearer: sessionStorage.getItem('token'),
        },
      })
        .then((response) => response.json())
        .then((dataJson) => dataJson.data)
        .catch((err) => {
          toggleToast('error', `<p>${err}</p>`);
        });
    */
  };
  const fetchFotos = (carouselId) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(data[carouselId]), 1000));
    /*return fetch(`${location.origin}/api/fotos`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Bearer: sessionStorage.getItem('token'),
        },
      })
        .then((response) => response.json())
        .then((dataJson) => dataJson.data)
        .catch((err) => {
          toggleToast('error', `<p>${err}</p>`);
        });
    */
  };

  const btnsOpenModalManageFotos = document.getElementsByClassName(
    'open-modal-carousel',
  );
  Array.from(btnsOpenModalManageFotos).forEach((btn) => {
    btn.addEventListener('click', async () => {
      toggleLoader();
      document.getElementById('form-create-foto').reset();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('tipo-carousel-id').value = btn.dataset.value;
      document.getElementById('legend-foto').innerHTML =
        btn.dataset.value == 0
          ? 'Crear Foto - Carousel Home'
          : 'Crear Foto - Carousel Servicios';
      const fotos = await fetchFotos(btn.dataset.value);
      if (fotos) {
        const firstLiForm = document.getElementById('galeria-add-foto');
        firstLiForm.classList.remove('active');
        document.getElementById('oneSlide').firstElementChild.innerHTML =
          fotos.reduce(
            (sumHTML, foto, index) =>
              (sumHTML += `
              <li class="slide ${index === 0 ? 'active' : ''}" data-img-id="${
                foto.id
              }">
                <img
                  src="${foto.path}"
                  alt="${foto.descripcion}"
                />
              </li>
            `),
            ``,
          );
        document
          .getElementById('oneSlide')
          .firstElementChild.prepend(firstLiForm);
        const firstLiMiniatura = document.getElementById(
          'galeria-add-foto-miniatura',
        );
        firstLiMiniatura.classList.remove('active');
        document.getElementById('galeria').firstElementChild.innerHTML =
          fotos.reduce(
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
      }
      eventMiniaturas();
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const carouselUl = document.getElementById('oneSlide').firstElementChild;
  const galeriaUl = document.getElementById('galeria').firstElementChild;
  const btnDeleteFoto = document.getElementById('btn-delete-foto');
  btnDeleteFoto.addEventListener('click', async () => {
    toggleLoader();
    const activeSlide = carouselUl.getElementsByClassName('slide active')[0];
    const idToDelete = activeSlide.dataset.imgId;
    const resp = await fetchDeleteFoto(idToDelete);
    if (resp) {
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
    toggleLoader();
  });

  const checkPlusSlide = () => {
    const carouselUl = document.getElementById('oneSlide').firstElementChild;
    const activeSlide = carouselUl.getElementsByClassName('slide active')[0];
    const btnDeleteFoto = document.getElementById('btn-delete-foto');
    if (activeSlide.id === 'galeria-add-foto') {
      btnDeleteFoto.classList.add('hide');
    } else {
      btnDeleteFoto.classList.remove('hide');
    }
  };

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

  const eventMiniaturas = () => {
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
});
