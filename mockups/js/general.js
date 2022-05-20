import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  REGEX_EMAIL,
  REGEX_LAT_LNG,
  REGEX_REDES,
  REGEX_STRING,
  REGEX_TELEFONO,
  REGEX_URL,
} from './helpers/regex-helpers.js';

const data = [
  {
    id: 1,
    nombre: 'Wifi',
    icon_path: '/icons/wifi-signal-svgrepo-com.svg',
    servInstal: false,
  },
  {
    id: 2,
    nombre: 'Estacionamiento',
    icon_path:
      '/icons/parking-garage-transportation-car-parking-svgrepo-com.svg',
    servInstal: true,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-update-hotel'),
      method: 'patch',
      apiUrl: `${location.origin}/api/hoteles`,
      params: [],
      validations: {
        'update-descripcion-home': {
          required: true,
        },
        'update-descripcion-ubicacion': {
          required: true,
        },
        'update-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        'update-telefono-1': {
          required: true,
          regexTelefono: REGEX_TELEFONO,
        },
        'update-telefono-2': {
          regexTelefono: REGEX_TELEFONO,
        },
        'update-direccion': {
          required: true,
        },
        'update-logo-path': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'update-latitud': {
          required: true,
          regexLatLng: REGEX_LAT_LNG,
          min: -90,
          max: 90,
        },
        'update-longitud': {
          required: true,
          regexLatLng: REGEX_LAT_LNG,
          min: -180,
          max: 180,
        },
        'update-facebook': {
          regexRedes: REGEX_REDES,
        },
        'update-twitter': {
          regexRedes: REGEX_REDES,
        },
        'update-instagram': {
          regexRedes: REGEX_REDES,
        },
        'update-horario-contacto': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-create-servicio'),
      method: 'post',
      apiUrl: `${location.origin}/api/servicios/hotel`,
      params: [],
      validations: {
        'new-servicio-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-servicio-icon-path': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'new-servicio-tipo': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-update-servicio'),
      method: 'patch',
      apiUrl: `${location.origin}/api/servicios/:id`,
      params: ['id'],
      validations: {
        'update-servicio-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-servicio-icon-path': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'update-servicio-tipo': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/servicios/:id`,
      params: ['id'],
      validations: {},
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const fetchReadOne = (id) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(data[id]), 1000));
    /*return fetch(`${location.origin}/api/paypertop/${id}`, {
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

  const btnsOpenModalUpdate =
    document.getElementsByClassName('open-modal-update');
  Array.from(btnsOpenModalUpdate).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('update-id').value = btn.dataset.value;
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('update-servicio-nombre').value = dataOne.nombre;
      document.getElementById('update-servicio-icon-path').value =
        dataOne.icon_path;
      document.getElementById('update-servicio-tipo').value =
        dataOne.servInstal;
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
});
