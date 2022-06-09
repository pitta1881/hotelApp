import {
  callbackModal,
  commonFetch,
  dateFormat,
  loadPaginationEvent,
  loadPaginationRepaint,
} from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import { REGEX_NUMBER } from './helpers/regex-helpers.js';

const loadFormEvents = () => {
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/reservas`,
      params: [],
      validations: {
        'new-checkin': {
          required: true,
          minDate: minDate,
          inverseRef: 'new-checkout',
        },
        'new-checkout': {
          required: true,
          dateGreaterThan: 'new-checkin',
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/reservas/:id`,
      params: ['id'],
      validations: {
        'update-checkin': {
          required: true,
          minDate: minDate,
          inverseRef: 'update-checkout',
        },
        'update-checkout': {
          required: true,
          dateGreaterThan: 'update-checkin',
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
      callback: [loadInitialData, callbackModal],
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/reservas/:id`,
      params: ['id'],
      validations: {},
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-manage-delete-huespedes'),
      method: 'post',
      apiUrl: `${location.origin}/api/reservas/manage-huespedes`,
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-manage-add-huespedes'),
      method: 'post',
      apiUrl: `${location.origin}/api/reservas/manage-huespedes`,
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
      callback: [loadInitialData, callbackModal],
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });
};

const loadInitialData = async (skip = 0, limit = 5) => {
  if (typeof skip !== 'number' || typeof limit !== 'number') {
    skip = 0;
    limit = 5;
  }
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  document.getElementById('new-checkin').min = minDate;
  document.getElementById('new-checkin').value = minDate;
  document.getElementById('update-checkin').min = minDate;
  document.getElementById('update-checkin').value = minDate;
  const { status, data, total } = await commonFetch(
    `${location.origin}/api/reservas?skip=${skip}&limit=${limit}`,
  );
  if (status === 'SUCCESS') {
    loadPaginationRepaint('tbody-reservas', total, skip, limit);
    document.getElementById('tbody-reservas').innerHTML =
      data.length === 0
        ? `<tr><td class="no-data" colspan="10">Sin Datos</td></tr>`
        : data.reduce(
            (acum, reserva) =>
              (acum += `
            <tr>
              <td><span class="thbefore">ID</span>${reserva.id}</td>
              <td><span class="thbefore">Habitación</span>
              <a href="#" class="actions open-modal-read-habitacion" 
                data-value="${
                  reserva.id
                }" data-target="modal-read-habitacion">${
                reserva.habitacion.nombre
              }</a></td>
              <td><span class="thbefore">CheckIn</span>${
                dateFormat(reserva.checkin)[0]
              }</td>
              <td><span class="thbefore">CheckOut</span>${
                dateFormat(reserva.checkout)[0]
              }</td>
              <td><span class="thbefore">Pax</span>${
                reserva.huespedes.length
              }</td>
              <td><span class="thbefore">Monto Final</span>$${
                reserva.monto_final
              }</td>
              <td><span class="thbefore">Monto Pagado</span>$${
                reserva.monto_pagado
              }</td>
              <td class="action-column">
                <span class="thbefore">Acción</span>
                <div class="action-flex">
                  <div class="nowrap">
                    <button
                      type="button"
                      title="Detalles"
                      class="actions blue open-modal-read"
                      data-target="modal-read"
                      data-value="${reserva.id}"
                    >
                      <img
                        class="icon24"
                        src="/icons/eye-svgrepo-com.svg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      title="Actualizar"
                      class="actions yellow open-modal-update"
                      data-target="modal-update"
                      data-value="${reserva.id}"
                    >
                      <img
                        class="icon24"
                        src="/icons/pencil-edit-button-svgrepo-com.svg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      title="Actualizar Monto Pagado"
                      class="actions yellow open-modal-update-monto-pagado"
                      data-target="modal-update-monto-pagado"
                      data-value="${reserva.id}"
                    >
                      <img
                        class="icon24"
                        src="/icons/dollar-sign-svgrepo-com.svg"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="nowrap">
                    <button
                      type="button"
                      title="Administrar Huespedes"
                      class="actions yellow open-modal-manage-huespedes"
                      data-target="modal-manage-huespedes"
                      data-value="${reserva.id}"
                    >
                      <img
                        class="icon24"
                        src="/icons/person-svgrepo-com.svg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      title="Eliminar"
                      class="actions red open-modal-delete"
                      data-target="modal-delete"
                      data-value="${reserva.id}"
                    >
                      <img
                        class="icon24"
                        src="/icons/trash-svgrepo-com.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            `),
            ``,
          );
  }
};

const loadInitialDataHabitaciones = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/habitaciones`,
  );
  if (status === 'SUCCESS') {
    let rowHabitaciones = ``;
    data.forEach((habitacion) => {
      if (habitacion.activo) {
        rowHabitaciones += `
          <option value="${habitacion.id}">${habitacion.nombre}(${habitacion.tipoHabitacion.nombre}) | Max.:${habitacion.max_pax} | M²:${habitacion.tamanio_m2}</option>
        `;
      }
    });
    document.getElementById('new-habitacion-id').innerHTML = rowHabitaciones;
    document.getElementById('update-habitacion-id').innerHTML = rowHabitaciones;
  }
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-reservas')
    .addEventListener('click', async (e) => {
      const buttonClicked = e.target.closest('.actions');
      if (buttonClicked) {
        const modalTarget = document.getElementById(
          buttonClicked.dataset.target,
        );
        const { status, data } = await commonFetch(
          `${location.origin}/api/reservas/${buttonClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const reserva = data[0];
          if (buttonClicked.classList.contains('open-modal-read')) {
            document.getElementById('read-id').innerHTML = reserva.id;
            document.getElementById('read-checkin').innerHTML = dateFormat(
              reserva.checkin,
            )[0];
            document.getElementById('read-checkout').innerHTML = dateFormat(
              reserva.checkout,
            )[0];
            document.getElementById('read-habitacion').innerHTML =
              reserva.habitacion.nombre;
            document.getElementById('read-monto-final').innerHTML =
              '$' + reserva.monto_final;
            document.getElementById('read-monto-pagado').innerHTML =
              '$' + reserva.monto_pagado;
            document.getElementById('read-huespedes').innerHTML =
              reserva.huespedes.length === 0
                ? '-'
                : '<ul>' +
                  reserva.huespedes.reduce(
                    (sumHTML, huesped) =>
                      (sumHTML += `
                    <li><a href="#" class="actions open-modal-read-huesped" 
                    data-value="${huesped.id}" data-target="modal-read-huesped">
                      ${huesped.nombre} ${huesped.apellido}
          </a></li>
                      `),
                    ``,
                  ) +
                  '</ul>';
            document.getElementById('read-created-at').innerHTML = dateFormat(
              reserva.created_at,
            ).join(' ');
          } else if (buttonClicked.classList.contains('open-modal-update')) {
            document.getElementById('update-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-checkin').value =
              reserva.checkin.split('T')[0];
            document.getElementById('update-checkout').value =
              reserva.checkout.split('T')[0];
            document.getElementById('update-monto-final').value =
              reserva.monto_final;
            document.getElementById('update-habitacion-id').value =
              reserva.habitacion.id;
          } else if (
            buttonClicked.classList.contains('open-modal-update-monto-pagado')
          ) {
            document.getElementById('update-reserva-monto-pagado-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-monto-pagado-span').innerHTML =
              reserva.monto_final;
            document.getElementById('update-monto-pagado').value =
              reserva.monto_pagado;
            document.getElementById('update-monto-pagado').max =
              reserva.monto_final;
          } else if (buttonClicked.classList.contains('open-modal-delete')) {
            document.getElementById('delete-id').value =
              buttonClicked.dataset.value;
            document.getElementById('data-quien').innerHTML = `${reserva.id}`;
          } else if (
            buttonClicked.classList.contains('open-modal-manage-huespedes')
          ) {
            const huespedesInReserva = await commonFetch(
              `${location.origin}/api/reservas/huespedes/${reserva.id}`,
            );
            const huespedesNotInReserva = await commonFetch(
              `${location.origin}/api/reservas/notIn/huespedes/${reserva.id}`,
            );
            document.getElementById('add-huesped-reservaId').value =
              buttonClicked.dataset.value;
            document.getElementById('delete-huesped-reservaId').value =
              buttonClicked.dataset.value;
            document.getElementById('delete-huesped').innerHTML =
              huespedesInReserva.data.reduce(
                (sumHTML, huesped) =>
                  (sumHTML += `
                  <option value="${huesped.id}">${huesped.nombre} ${huesped.apellido} - DNI: ${huesped.dni}</option>
                `),
                ``,
              );
            document.getElementById('add-huesped').innerHTML =
              huespedesNotInReserva.data.reduce(
                (sumHTML, huesped) =>
                  (sumHTML += `
                <option value="${huesped.id}">${huesped.nombre} ${huesped.apellido} - DNI: ${huesped.dni}</option>
                `),
                ``,
              );
          } else if (
            buttonClicked.classList.contains('open-modal-read-habitacion')
          ) {
            const habitacionResp = await commonFetch(
              `${location.origin}/api/habitaciones/${reserva.habitacion.id}`,
            );
            const habitacion = habitacionResp.data[0];
            document.getElementById('read-nombre-hab').innerHTML =
              habitacion.nombre;
            document.getElementById('read-descripcion-hab').innerHTML =
              habitacion.descripcion_hab;
            document.getElementById('read-descripcion-camas-hab').innerHTML =
              habitacion.descripcion_camas;
            document.getElementById('read-max-pax-hab').innerHTML =
              habitacion.max_pax;
            document.getElementById('read-tamanio-hab').innerHTML =
              habitacion.tamanio_m2;
            document.getElementById('read-tipo-hab').innerHTML =
              habitacion.tipoHabitacion.nombre;
            document.getElementById('read-estado-hab').innerHTML =
              habitacion.activo ? 'Activo' : 'Inactivo';
            document.getElementById('read-servicios-hab').innerHTML =
              habitacion.servicios.reduce(
                (acum, servicio) =>
                  (acum += `
                        <img
                          src="${servicio.icon_path}"
                          class="icon24"
                          title="${servicio.nombre}"
                        />`),
                ``,
              );
            document.getElementById('read-created-at-hab').innerHTML =
              dateFormat(habitacion.created_at).join(' ');
          }
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
        }
      }
    });
};

const loadModalEventsClickHuesped = () => {
  document.getElementById('modal-read').addEventListener('click', async (e) => {
    const buttonClicked = e.target.closest('.actions');
    if (buttonClicked) {
      const modalTarget = document.getElementById(buttonClicked.dataset.target);
      if (buttonClicked.classList.contains('open-modal-read-huesped')) {
        const huespedResp = await commonFetch(
          `${location.origin}/api/huespedes/${buttonClicked.dataset.value}`,
        );
        const huesped = huespedResp.data[0];
        document.getElementById('read-nombre-hue').innerHTML = huesped.nombre;
        document.getElementById('read-apellido-hue').innerHTML =
          huesped.apellido;
        document.getElementById('read-email-hue').innerHTML =
          huesped.email || '-';
        document.getElementById('read-dni-hue').innerHTML = huesped.dni;
        document.getElementById('read-fecha-nacimiento-hue').innerHTML =
          dateFormat(huesped.fecha_nacimiento)[0];
        document.getElementById('read-telefono-hue').innerHTML =
          huesped.telefono || '-';
        document.getElementById('read-created-at-hue').innerHTML = dateFormat(
          huesped.created_at,
        ).join(' ');
      }
      document.body.classList.add('noscroll');
      modalTarget.classList.add('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadInitialDataHabitaciones();
  loadFormEvents();
  loadModalEvents();
  loadModalEventsClickHuesped();
  loadPaginationEvent('tbody-reservas', loadInitialData);
});
