import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  REGEX_EMAIL,
  REGEX_STRING,
  REGEX_NUMBER,
  REGEX_TELEFONO,
} from './helpers/regex-helpers.js';

const data = [
  {
    id: 6,
    nombre: 'Elsa',
    apellido: 'Rampion',
    email: 'erampion@mail.com',
    dni: '11222333',
    fecha_nacimiento: '1995-05-20',
    telefono: 11444555666,
    created_at: '2022-04-17T20:39:45.167Z',
  },
  {
    id: 1,
    nombre: 'Elsa',
    apellido: 'Lamin',
    email: 'elamin@mail.com',
    dni: '22333444',
    fecha_nacimiento: '1985-12-15',
    telefono: 22333444555,
    created_at: '2022-04-18T20:39:45.167Z',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/huespedes`,
      params: [],
      validations: {
        'new-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        'new-dni': {
          required: true,
          regexNumber: REGEX_NUMBER,
        },
        'new-fecha-nacimiento': {
          required: true,
        },
        'new-telefono': {
          required: true,
          regexTelefono: REGEX_TELEFONO,
        },
      },
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/huespedes/:id`,
      params: ['id'],
      validations: {},
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/huespedes/:id`,
      params: ['id'],
      validations: {
        'update-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        'update-dni': {
          required: true,
          regexNumber: REGEX_NUMBER,
        },
        'update-fecha-nacimiento': {
          required: true,
        },
        'update-telefono': {
          required: true,
          regexTelefono: REGEX_TELEFONO,
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
    /*return fetch(`${location.origin}/api/huespedes/${id}`, {
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
      document.getElementById('read-nombre').innerHTML = dataOne.nombre;
      document.getElementById('read-apellido').innerHTML = dataOne.apellido;
      document.getElementById('read-email').innerHTML = dataOne.email;
      document.getElementById('read-dni').innerHTML = dataOne.dni;
      document.getElementById('read-fecha-nacimiento').innerHTML =
        dataOne.fecha_nacimiento;
      document.getElementById('read-telefono').innerHTML = dataOne.telefono;
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
      document.getElementById('update-apellido').value = dataOne.apellido;
      document.getElementById('update-email').value = dataOne.email;
      document.getElementById('update-dni').value = dataOne.dni;
      document.getElementById('update-fecha-nacimiento').value =
        dataOne.fecha_nacimiento;
      document.getElementById('update-telefono').value = dataOne.telefono;
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
