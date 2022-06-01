//TODO: sacar habitacionId como PK en el back
import { toggleLoader } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import { REGEX_NUMBER } from './helpers/regex-helpers.js';

const data = [
  {
    id: 0,
    checkin: '2022-05-20',
    checkout: '2022-05-22',
    monto_final: 20000,
    monto_pagado: 15000,
    created_at: '2022-04-17T20:39:45.167Z',
    habitacion: {
      id: 1,
      nombre: 'Simple Comun',
    },
    huesped: [
      {
        id: 1,
        nombre: 'Elsa',
        apellido: 'Rampion',
        dni: 12345678,
        fecha_nacimiento: '15/03/1994',
        telefono: null,
      },
      {
        id: 2,
        nombre: 'Elsa',
        apellido: 'Patito',
        dni: 87654321,
        fecha_nacimiento: '10/01/1992',
        telefono: 123456777,
      },
    ],
  },
  {
    id: 1,
    checkin: '2022-05-22',
    checkout: '2022-05-28',
    monto_final: 25000,
    monto_pagado: 17000,
    created_at: '2022-04-19T20:39:45.167Z',
    habitacion: {
      id: 2,
      nombre: 'Doble Comun',
    },
    huesped: [
      {
        id: 3,
        nombre: 'Elsa',
        apellido: 'Pallo',
        dni: 11122233,
        fecha_nacimiento: '19/09/1999',
        telefono: null,
      },
      {
        id: 4,
        nombre: 'Elsa',
        apellido: 'Lame',
        dni: 44332222,
        fecha_nacimiento: '16/06/1996',
        telefono: null,
      },
      {
        id: 5,
        nombre: 'Elsa',
        apellido: 'Sonado',
        dni: 77889955,
        fecha_nacimiento: '11/11/1991',
        telefono: 1122222222,
      },
    ],
  },
];
const dataHuespedes = [
  [
    {
      id: 1,
      nombre: 'Elsa',
      apellido: 'Rampion',
      dni: 12345678,
      fecha_nacimiento: '15/03/1994',
      telefono: null,
    },
    {
      id: 2,
      nombre: 'Elsa',
      apellido: 'Patito',
      dni: 87654321,
      fecha_nacimiento: '10/01/1992',
      telefono: 123456777,
    },
  ],
  [
    {
      id: 3,
      nombre: 'Elsa',
      apellido: 'Pallo',
      dni: 11122233,
      fecha_nacimiento: '19/09/1999',
      telefono: null,
    },
    {
      id: 4,
      nombre: 'Elsa',
      apellido: 'Lame',
      dni: 44332222,
      fecha_nacimiento: '16/06/1996',
      telefono: null,
    },
    {
      id: 5,
      nombre: 'Elsa',
      apellido: 'Sonado',
      dni: 77889955,
      fecha_nacimiento: '11/11/1991',
      telefono: 1122222222,
    },
  ],
];
const dataHuespedesNotInReserva = [
  [
    {
      id: 3,
      nombre: 'Elsa',
      apellido: 'Pallo',
      dni: 11122233,
      fecha_nacimiento: '19/09/1999',
      telefono: null,
    },
    {
      id: 4,
      nombre: 'Elsa',
      apellido: 'Lame',
      dni: 44332222,
      fecha_nacimiento: '16/06/1996',
      telefono: null,
    },
    {
      id: 5,
      nombre: 'Elsa',
      apellido: 'Sonado',
      dni: 77889955,
      fecha_nacimiento: '11/11/1991',
      telefono: 1122222222,
    },
  ],
  [
    {
      id: 1,
      nombre: 'Elsa',
      apellido: 'Rampion',
      dni: 12345678,
      fecha_nacimiento: '15/03/1994',
      telefono: null,
    },
    {
      id: 2,
      nombre: 'Elsa',
      apellido: 'Patito',
      dni: 87654321,
      fecha_nacimiento: '10/01/1992',
      telefono: 123456777,
    },
  ],
];

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/reservas`,
      params: [],
      validations: {
        'new-checkin': {
          required: true,
        },
        'new-checkout': {
          required: true,
        },
        'new-monto-final': {
          required: true,
          regexNumber: REGEX_NUMBER,
          min: 0,
        },
        'new-habitacion-id': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/reservas`,
      params: [],
      validations: {
        'update-checkin': {
          required: true,
        },
        'update-checkout': {
          required: true,
        },
        'update-monto-final': {
          required: true,
          regexNumber: REGEX_NUMBER,
          min: 0,
        },
        'update-habitacion-id': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-update-monto-pagado'),
      method: 'patch',
      apiUrl: `${location.origin}/api/reservas/:id`,
      params: ['id'],
      validations: {
        'update-reserva-monto-pagado-id': {
          required: true,
        },
        'update-monto-pagado': {
          required: true,
          regexNumber: REGEX_NUMBER,
          min: 0,
        },
      },
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/reservas/:id`,
      params: ['id'],
      validations: {},
    },
    {
      form: document.getElementById('form-manage-delete-huespedes'),
      method: 'post',
      apiUrl: `${location.origin}/api/huespedes/reserva`,
      params: [],
      validations: {
        'operacion-false': {
          required: true,
        },
        'delete-huesped-reservaId': {
          required: true,
        },
        'delete-huesped': {
          required: true,
        },
      },
    },
    {
      form: document.getElementById('form-manage-add-huespedes'),
      method: 'post',
      apiUrl: `${location.origin}/api/huespedes/reserva`,
      params: [],
      validations: {
        'operacion-true': {
          required: true,
        },
        'add-huesped-reservaId': {
          required: true,
        },
        'add-huesped': {
          required: true,
        },
      },
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const fetchReadOne = (reservaId) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) => setTimeout(() => res(data[reservaId]), 1000));
    /*return fetch(`${location.origin}/api/reservas/${id}`, {
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
  const fetchHuespedesReserva = (reservaId) => {
    //TODO: en prod habilitar el fetch
    return new Promise((res) =>
      setTimeout(() => res(dataHuespedes[reservaId]), 1000),
    );
    /*return fetch(`${location.origin}/api/huespedes/${reservaId}`, {
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
  const fetchHuespedesNotInReserva = (reservaId) => {
    //TODO: en prod habilitar el fetch
    //TODO: crear el endpoint para esto !
    return new Promise((res) =>
      setTimeout(() => res(dataHuespedesNotInReserva[reservaId]), 1000),
    );
    /*return fetch(`${location.origin}/api/huespedes/notIn/${reservaId}`, {
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
      document.getElementById('read-id').innerHTML = dataOne.id;
      document.getElementById('read-checkin').innerHTML = dataOne.checkin;
      document.getElementById('read-checkout').innerHTML = dataOne.checkout;
      document.getElementById('read-habitacion').innerHTML =
        dataOne.habitacion.nombre;
      document.getElementById('read-monto-final').innerHTML =
        '$' + dataOne.monto_final;
      document.getElementById('read-monto-pagado').innerHTML =
        '$' + dataOne.monto_pagado;
      document.getElementById('read-huespedes').innerHTML =
        '<ul>' +
        dataOne.huesped.reduce(
          (sumHTML, huesped) =>
            (sumHTML += `
                  <li>${huesped.nombre} ${huesped.apellido}</li>
                    `),
          ``,
        ) +
        '</ul>';
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
      document.getElementById('update-checkin').value = dataOne.checkin;
      document.getElementById('update-checkout').value = dataOne.checkout;
      document.getElementById('update-monto-final').value = dataOne.monto_final;
      document.getElementById('update-habitacion-id').value =
        dataOne.habitacion.id;
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalManageHuespedes = document.getElementsByClassName(
    'open-modal-manage-huespedes',
  );
  Array.from(btnsOpenModalManageHuespedes).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      const huespedesReserva = await fetchHuespedesReserva(btn.dataset.value);
      const huespedesNotInReserva = await fetchHuespedesNotInReserva(
        btn.dataset.value,
      );
      document.getElementById('add-huesped-reservaId').value =
        btn.dataset.value;
      document.getElementById('delete-huesped-reservaId').value =
        btn.dataset.value;
      document.getElementById('delete-huesped').innerHTML =
        huespedesReserva.reduce(
          (sumHTML, huesped) =>
            (sumHTML += `
              <option value="${huesped.id}">${huesped.nombre} ${huesped.apellido} - DNI: ${huesped.dni}</option>
            `),
          ``,
        );
      document.getElementById('add-huesped').innerHTML =
        huespedesNotInReserva.reduce(
          (sumHTML, huesped) =>
            (sumHTML += `
              <option value="${huesped.id}">${huesped.nombre} ${huesped.apellido} - DNI: ${huesped.dni}</option>
            `),
          ``,
        );
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalUpdateMontoPagado = document.getElementsByClassName(
    'open-modal-update-monto-pagado',
  );
  Array.from(btnsOpenModalUpdateMontoPagado).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('update-reserva-monto-pagado-id').value =
        btn.dataset.value;
      const dataOne = await fetchReadOne(btn.dataset.value);
      document.getElementById('update-monto-pagado-span').innerHTML =
        dataOne.monto_final;
      document.getElementById('update-monto-pagado').value =
        dataOne.monto_pagado;
      document.getElementById('update-monto-pagado').max = dataOne.monto_final;
      document.body.classList.toggle('noscroll');
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });

  const btnsOpenModalDelete =
    document.getElementsByClassName('open-modal-delete');
  Array.from(btnsOpenModalDelete).forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      toggleLoader();
      const modalTarget = document.getElementById(btn.dataset.target);
      document.getElementById('delete-id').value = btn.dataset.value;
      document.getElementById('data-value').innerHTML = btn.dataset.value;
      modalTarget.classList.add('active');
      toggleLoader();
    });
  });
});
