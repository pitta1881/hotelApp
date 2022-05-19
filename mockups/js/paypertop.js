import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  REGEX_EMAIL,
  REGEX_STRING,
  REGEX_URL,
  REGEX_NUMBER,
  REGEX_RAZON_SOCIAL,
  REGEX_LAT_LNG,
} from './helpers/regex-helpers.js';

const data = [
  {
    id: 6,
    titular: 'Manuel Blest',
    razon_social: 'Cervezeria Blest',
    email: 'mblest@blest.com',
    descripcion: 'Cervezería/bar.',
    url: 'http://www.cervezablest.com/',
    abono_mensual: 20000,
    lat_lng: [-41.12759211083225, -71.35126058495128],
    activo: false,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 1,
      nombre: 'Gastronomia',
    },
  },
  {
    id: 1,
    titular: 'Pedro Perez',
    razon_social: 'PePerez S.R.L',
    email: 'pperez@mail.com',
    descripcion: 'Empresa que brinda servicios de Turismo por la ciudad.',
    url: 'http://www.turismopperez.com.ar',
    abono_mensual: 15000,
    lat_lng: [-41.13534742815715, -71.30578269365238],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 2,
      nombre: 'Atracciones',
    },
  },
  {
    id: 2,
    titular: 'María Lopez',
    razon_social: 'MaLopez S.A',
    email: 'mlopez@mail.com',
    descripcion: 'Supermercado mas grande de la ciudad.',
    url: 'http://www.supermalopez.com.ar',
    abono_mensual: 12000,
    lat_lng: [-41.13761429688297, -71.31278257990219],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 3,
      nombre: 'Supermercado',
    },
  },
  {
    id: 5,
    titular: '-',
    razon_social: 'La Marca Patagónica',
    email: '-',
    descripcion: 'Restaurante familiar.',
    url: 'https://la-marca-patagonica.negocio.site/',
    abono_mensual: 0,
    lat_lng: [-41.13386676160742, -71.30935194768804],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 1,
      nombre: 'Gastronomia',
    },
  },
  {
    id: 7,
    titular: '-',
    razon_social: 'Teleférico Cerro Otto',
    email: '-',
    descripcion: 'Teleférico cerca del centro.',
    url: 'http://www.telefericobariloche.com.ar/',
    abono_mensual: 0,
    lat_lng: [-41.130162240139754, -71.36963340452075],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 2,
      nombre: 'Atracciones',
    },
  },
  {
    id: 8,
    titular: '-',
    razon_social: 'Si Turismo',
    email: '-',
    descripcion: 'Empresa de Turismo.',
    url: 'https://siturismo.com/',
    abono_mensual: 0,
    lat_lng: [-41.13402538670256, -71.30681160975384],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 2,
      nombre: 'Atracciones',
    },
  },
  {
    id: 3,
    titular: '-',
    razon_social: 'Supermercados Todo',
    email: '-',
    descripcion: 'Supermercado cerca del hotel.',
    url: 'http://www.supertodo.com.ar/',
    abono_mensual: 0,
    lat_lng: [-41.12784799083812, -71.35088738966584],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 3,
      nombre: 'Supermercados',
    },
  },
  {
    id: 4,
    titular: '-',
    razon_social: 'Familia Weiss',
    email: '-',
    descripcion: 'Restaurante familiar.',
    url: 'https://www.weiss.com.ar/',
    abono_mensual: 0,
    lat_lng: [-41.13312094364556, -71.30382863726463],
    activo: true,
    created_at: '2022-04-17T20:39:45.167Z',
    tipoPPT: {
      id: 1,
      nombre: 'Gastronomia',
    },
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/paypertop`,
      params: [],
      validations: {
        'new-titular': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-razon-social': {
          required: true,
          regexRazonSocial: REGEX_RAZON_SOCIAL,
        },
        'new-url': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'new-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        'new-latitud': {
          required: true,
          regexLatLng: REGEX_LAT_LNG,
          min: -90,
          max: 90,
        },
        'new-longitud': {
          required: true,
          regexLatLng: REGEX_LAT_LNG,
          min: -180,
          max: 180,
        },
        'new-tipo': {
          required: true,
        },
        'new-abono-mensual': {
          required: true,
          regexNumber: REGEX_NUMBER,
          min: 0,
        },
        'new-descripcion': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/paypertop/:id`,
      params: ['id'],
      validations: {},
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/paypertop/:id`,
      params: ['id'],
      validations: {
        'update-titular': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-razon-social': {
          required: true,
          regexRazonSocial: REGEX_RAZON_SOCIAL,
        },
        'update-url': {
          required: true,
          regexUrl: REGEX_URL,
        },
        'update-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
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
        'update-tipo': {
          required: true,
        },
        'update-abono-mensual': {
          required: true,
          regexNumber: REGEX_NUMBER,
          min: 0,
        },
        'update-descripcion': {
          required: true,
        },
      },
    },
    ,
    {
      form: document.getElementById('form-update-status'),
      method: 'patch',
      apiUrl: `${location.origin}/api/paypertop/activo/:id`,
      params: ['id'],
      validations: {
        'update-estado': {
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

  const btnsOpenModalRead = document.getElementsByClassName('open-modal-read');
  Array.from(btnsOpenModalRead).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('read-titular').innerHTML = dataOne.titular;
      document.getElementById('read-razon-social').innerHTML =
        dataOne.razon_social;
      document.getElementById('read-email').innerHTML = dataOne.email;
      document.getElementById('read-tipo').innerHTML = dataOne.tipoPPT.nombre;
      document.getElementById('read-descripcion').innerHTML =
        dataOne.descripcion;
      document.getElementById('read-url').innerHTML = dataOne.url;
      document.getElementById('read-abono-mensual').innerHTML =
        '$' + dataOne.abono_mensual;
      document.getElementById('read-latitud').innerHTML = dataOne.lat_lng[0];
      document.getElementById('read-longitud').innerHTML = dataOne.lat_lng[1];
      document.getElementById('read-activo').innerHTML = dataOne.activo
        ? 'Activo'
        : 'Inactivo';
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
      document.getElementById('update-titular').value = dataOne.titular;
      document.getElementById('update-razon-social').value =
        dataOne.razon_social;
      document.getElementById('update-email').value = dataOne.email;
      document.getElementById('update-tipo').value = dataOne.tipoPPT.id;
      document.getElementById('update-descripcion').value = dataOne.descripcion;
      document.getElementById('update-url').value = dataOne.url;
      document.getElementById('update-abono-mensual').value =
        dataOne.abono_mensual;
      document.getElementById('update-latitud').value = dataOne.lat_lng[0];
      document.getElementById('update-longitud').value = dataOne.lat_lng[1];
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
      document.getElementById('update-status-span').innerHTML =
        dataOne.razon_social;
      document.getElementById('update-estado').value = dataOne.activo;
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
