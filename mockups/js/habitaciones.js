import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import { REGEX_STRING, REGEX_URL } from './helpers/regex-helpers.js';

const data = [
  {
    id: 0,
    nombre: 'Habitacion Simple',
    descripcion_hab: 'Habitacion totalmente amueblada para 1 persona',
    descripcion_camas: '1 Cama Simple',
    max_pax: 1,
    tamanio_m2: 10,
    ocupado: false,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoHabitacion: {
      id: 1,
      nombre: 'Simple',
    },
    servicios: [
      {
        id: 1,
        nombre: 'Wifi',
        icon_path: '/icons/wifi-signal-svgrepo-com.svg',
        servInstal: false,
      },
      {
        id: 5,
        nombre: 'TV',
        icon_path: '/icons/tv-svgrepo-com.svg',
        servInstal: false,
      },
      {
        id: 6,
        nombre: 'Frigobar',
        icon_path: '/icons/minibar-svgrepo-com.svg',
        servInstal: false,
      },
    ],
  },
  {
    id: 1,
    nombre: 'Habitacion Suite',
    descripcion_hab:
      'Habitacion Suite amueblada para 2 personas y de clase premium',
    descripcion_camas: '1 Cama Suite King',
    max_pax: 2,
    tamanio_m2: 15,
    ocupado: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoHabitacion: {
      id: 2,
      nombre: 'Suite',
    },
    servicios: [
      {
        id: 1,
        nombre: 'Wifi',
        icon_path: '/icons/wifi-signal-svgrepo-com.svg',
        servInstal: false,
      },
      {
        id: 5,
        nombre: 'TV',
        icon_path: '/icons/tv-svgrepo-com.svg',
        servInstal: false,
      },
    ],
  },
];
const dataServicios = [
  [
    {
      id: 1,
      nombre: 'Wifi',
      icon_path: '/icons/wifi-signal-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 5,
      nombre: 'TV',
      icon_path: '/icons/tv-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 6,
      nombre: 'Frigobar',
      icon_path: '/icons/minibar-svgrepo-com.svg',
      servInstal: false,
    },
  ],
  [
    {
      id: 1,
      nombre: 'Wifi',
      icon_path: '/icons/wifi-signal-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 5,
      nombre: 'TV',
      icon_path: '/icons/tv-svgrepo-com.svg',
      servInstal: false,
    },
  ],
];
const dataServiciosNotInHabitacion = [
  [
    {
      id: 2,
      nombre: 'Desayuno',
      icon_path: '/icons/breakfast-time-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 7,
      nombre: 'Secador',
      icon_path: '/icons/hair-dryer-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 11,
      nombre: 'Bañera',
      icon_path: '/icons/bathtub-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 12,
      nombre: 'Caja de Seguridad',
      icon_path: '/icons/security-box-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 13,
      nombre: 'Jacuzzi',
      icon_path: '/icons/jacuzzi-svgrepo-com.svg',
      servInstal: false,
    },
  ],
  [
    {
      id: 6,
      nombre: 'Frigobar',
      icon_path: '/icons/minibar-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 7,
      nombre: 'Secador',
      icon_path: '/icons/hair-dryer-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 11,
      nombre: 'Bañera',
      icon_path: '/icons/bathtub-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 12,
      nombre: 'Caja de Seguridad',
      icon_path: '/icons/security-box-svgrepo-com.svg',
      servInstal: false,
    },
    {
      id: 13,
      nombre: 'Jacuzzi',
      icon_path: '/icons/jacuzzi-svgrepo-com.svg',
      servInstal: false,
    },
  ],
];
const dataFotosHabitacion = [
  [
    {
      id: 1,
      descripcion: 'foto de la habitacion 1',
      path: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/03/33/f1/habitacion-individual.jpg',
      habitacionId: 1,
      hotelId: 1,
    },
    {
      id: 2,
      descripcion: 'foto de la habitacion 1',
      path: 'https://media-cdn.tripadvisor.com/media/photo-s/06/c5/b9/d5/hotel-catedral-campeche.jpg',
      habitacionId: 1,
      hotelId: 1,
    },
    {
      id: 3,
      descripcion: 'foto de la habitacion 1',
      path: 'https://www.hotelzentralparque.com/wp-content/uploads/2018/10/HotelZentral-HabIndividual.jpg',
      habitacionId: 1,
      hotelId: 1,
    },
  ],
  [
    {
      id: 4,
      descripcion: 'foto de la habitacion 2',
      path: 'https://hips.hearstapps.com/hmg-prod/images/dormitorio-hotel-ambiente-freehand-arquitectura-1631001209.jpg',
      habitacionId: 2,
      hotelId: 1,
    },
    {
      id: 5,
      descripcion: 'foto de la habitacion 2',
      path: 'https://www.cataloniahotels.com/es/blog/wp-content/uploads/2016/05/habitaci%C3%B3n-doble-catalonia-620x412.jpg',
      habitacionId: 2,
      hotelId: 1,
    },
  ],
];

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/habitaciones`,
      params: [],
      validations: {
        'new-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-descripcion-hab': {
          required: true,
        },
        'new-descripcion-camas': {
          required: true,
        },
        'new-max-pax': {
          required: true,
          min: 1,
        },
        'new-tamanio': {
          required: true,
          min: 1,
        },
        'new-tipo': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/habitaciones/:id`,
      params: ['id'],
      validations: {},
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/habitaciones/:id`,
      params: ['id'],
      validations: {
        'update-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-descripcion-hab': {
          required: true,
        },
        'update-descripcion-camas': {
          required: true,
        },
        'update-max-pax': {
          required: true,
          min: 1,
        },
        'update-tamanio': {
          required: true,
          min: 1,
        },
        'update-tipo': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-update-status'),
      method: 'patch',
      apiUrl: `${location.origin}/api/habitaciones/ocupado/:id`,
      params: ['id'],
      validations: {
        'update-estado': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-create-foto'),
      method: 'post',
      apiUrl: `${location.origin}/api/habitaciones/:habitacionId/fotos`,
      params: ['habitacionId'],
      validations: {
        'new-path': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'new-descripcion-foto': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-manage-delete-services'),
      method: 'post',
      apiUrl: `${location.origin}/api/servicios/habitacion`,
      params: [],
      validations: {
        'operacion-false': {
          required: true,
        },
        'delete-service-habitacionId': {
          required: true,
        },
        'delete-servicio': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-manage-add-services'),
      method: 'post',
      apiUrl: `${location.origin}/api/servicios/habitacion`,
      params: [],
      validations: {
        'operacion-true': {
          required: true,
        },
        'add-service-habitacionId': {
          required: true,
        },
        'add-servicio': {
          required: true,
        },
      },
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const fetchReadOne = (id) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(data[id]), 1000));
    /*return fetch(`${location.origin}/api/habitacion/${id}`, {
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
  const fetchServicesHabitacion = (habitacionId) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) =>
      setTimeout(() => res(dataServicios[habitacionId]), 1000),
    );
    /*return fetch(`${location.origin}/api/servicios/habitacion/${habitacionId}`, {
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
  const fetchServicesNotInHabitacion = (habitacionId) => {
    //TODO: en prod habilitar el fetch
    //TODO: crear el endpoint para esto !
    return new Promise((res) =>
      setTimeout(() => res(dataServiciosNotInHabitacion[habitacionId]), 1000),
    );
    /*return fetch(`${location.origin}/api/servicios/notIn/habitacion/${habitacionId}`, {
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
  const fetchDeleteFotoHabitacion = (habitacionId, id) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(true), 1000));
    /*return fetch(`${location.origin}/api/habitaciones/${habitacionId}/fotos/${id}`, {
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
  const fetchFotosHabitacion = (habitacionId) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) =>
      setTimeout(() => res(dataFotosHabitacion[habitacionId]), 1000),
    );
    /*return fetch(`${location.origin}/api/habitaciones/${habitacionId}/fotos`, {
        method: 'post',
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

  const btnsOpenModalRead = document.getElementsByClassName('open-modal-read');
  Array.from(btnsOpenModalRead).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('read-nombre').innerHTML = dataOne.nombre;
      document.getElementById('read-descripcion-hab').innerHTML =
        dataOne.descripcion_hab;
      document.getElementById('read-descripcion-camas').innerHTML =
        dataOne.descripcion_camas;
      document.getElementById('read-max-pax').innerHTML = dataOne.max_pax;
      document.getElementById('read-tamanio').innerHTML = dataOne.tamanio_m2;
      document.getElementById('read-tipo').innerHTML =
        dataOne.tipoHabitacion.nombre;
      document.getElementById('read-estado').innerHTML = dataOne.ocupado
        ? 'Ocupado'
        : 'Libre';
      document.getElementById('read-servicios').innerHTML =
        dataOne.servicios.reduce(
          (sumHTML, servicio) =>
            (sumHTML += `
                  <img
                    src="./..${servicio.icon_path}"
                    class="icon24"
                    title="${servicio.nombre}"
                  />`),
          ``,
        );
      document.getElementById('read-creado').innerHTML = dataOne.created_at;
      document.body.classList.toggle('noscroll');
      const targetEl = document.getElementById(btn.dataset.target);
      targetEl.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalUpdate =
    document.getElementsByClassName('open-modal-update');
  Array.from(btnsOpenModalUpdate).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('update-id').value = btn.dataset.value;
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('update-nombre').value = dataOne.nombre;
      document.getElementById('update-descripcion-hab').value =
        dataOne.descripcion_hab;
      document.getElementById('update-descripcion-camas').value =
        dataOne.descripcion_camas;
      document.getElementById('update-max-pax').value = dataOne.max_pax;
      document.getElementById('update-tamanio').value = dataOne.tamanio_m2;
      document.getElementById('update-tipo').value = dataOne.tipoHabitacion.id;
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalUpdateStatus = document.getElementsByClassName(
    'open-modal-update-status',
  );
  Array.from(btnsOpenModalUpdateStatus).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('update-status-id').value = btn.dataset.value;
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('update-status-span').innerHTML = dataOne.nombre;
      document.getElementById('update-estado').value = dataOne.ocupado;
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalManageServices = document.getElementsByClassName(
    'open-modal-manage-services',
  );
  Array.from(btnsOpenModalManageServices).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('add-service-habitacionId').value =
        btn.dataset.value;
      document.getElementById('delete-service-habitacionId').value =
        btn.dataset.value;
      const servicesHabitacion = await fetchServicesHabitacion(
        btn.dataset.value,
      );
      const servicesNotInHabitacion = await fetchServicesNotInHabitacion(
        btn.dataset.value,
      );
      document.getElementById('delete-servicio').innerHTML =
        servicesHabitacion.reduce(
          (sumHTML, servicio) =>
            (sumHTML += `
              <option value="${servicio.id}">${servicio.nombre}</option>
            `),
          ``,
        );
      document.getElementById('add-servicio').innerHTML =
        servicesNotInHabitacion.reduce(
          (sumHTML, servicio) =>
            (sumHTML += `
              <option value="${servicio.id}">${servicio.nombre}</option>
            `),
          ``,
        );
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalDelete =
    document.getElementsByClassName('open-modal-delete');
  Array.from(btnsOpenModalDelete).forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('delete-id').value = btn.dataset.value;
      document.getElementById('data-quien').innerHTML = btn.dataset.quien;
      modalTarget.classList.add('active');
    });
  });

  const btnsOpenModalManageFotos = document.getElementsByClassName(
    'open-modal-carousel',
  );
  Array.from(btnsOpenModalManageFotos).forEach((btn) => {
    btn.addEventListener('click', async () => {
      toggleLoader();
      document.getElementById('form-create-foto').reset();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('habitacion-id-create-foto').value =
        btn.dataset.value;
      const fotosHabitacion = await fetchFotosHabitacion(btn.dataset.value);
      if (fotosHabitacion) {
        const firstLiForm = document.getElementById('galeria-add-foto');
        firstLiForm.classList.remove('active');
        document.getElementById('oneSlide').firstElementChild.innerHTML =
          fotosHabitacion.reduce(
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
          fotosHabitacion.reduce(
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
    const habitacionId = document.getElementById(
      'habitacion-id-create-foto',
    ).value;
    const resp = await fetchDeleteFotoHabitacion(habitacionId, idToDelete);
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
