import {
  callbackModal,
  commonFetch,
  dateFormat,
} from './helpers/common-helpers.js';
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

const loadFormEvents = () => {
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
          regexTelefono: REGEX_TELEFONO,
        },
      },
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/huespedes/:id`,
      params: ['id'],
      validations: {},
      callback: [loadInitialData, callbackModal],
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
          regexTelefono: REGEX_TELEFONO,
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

const loadInitialData = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/huespedes`,
  );
  if (status === 'SUCCESS') {
    let rowHuesped = ``;
    data.forEach((huesped) => {
      rowHuesped += `
        <tr>
          <td><span class="thbefore">Nombre</span>${huesped.nombre}</td>
          <td><span class="thbefore">Apellido</span>${huesped.apellido}</td>
          <td><span class="thbefore">Email</span>${huesped.email || '-'}</td>
          <td><span class="thbefore">DNI</span>${huesped.dni}</td>
          <td><span class="thbefore">Fecha Nac.</span>${
            dateFormat(huesped.fecha_nacimiento)[0]
          }</td>
          <td><span class="thbefore">Teléfono</span>${
            huesped.telefono || '-'
          }</td>
          <td class="action-column">
            <span class="thbefore">Acción</span>
            <div class="nowrap">
              <button
                type="button"
                title="Detalles"
                class="actions blue open-modal-read"
                data-target="modal-read"
                data-value="${huesped.id}"
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
                data-value="${huesped.id}"
              >
                <img
                  class="icon24"
                  src="/icons/pencil-edit-button-svgrepo-com.svg"
                  alt=""
                />
              </button>
              <button
                type="button"
                title="Eliminar"
                class="actions red open-modal-delete"
                data-target="modal-delete"
                data-value="${huesped.id}"
              >
                <img
                  class="icon24"
                  src="/icons/trash-svgrepo-com.svg"
                  alt=""
                />
              </button>
            </div>
          </td>
        </tr>
  `;
    });
    document.getElementById('tbody-huespedes').innerHTML = rowHuesped;
  }
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-huespedes')
    .addEventListener('click', async (e) => {
      const buttonClicked = e.target.closest('.actions');
      if (buttonClicked) {
        const modalTarget = document.getElementById(
          buttonClicked.dataset.target,
        );
        const { status, data } = await commonFetch(
          `${location.origin}/api/huespedes/${buttonClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const huesped = data[0];
          if (buttonClicked.classList.contains('open-modal-read')) {
            document.getElementById('read-nombre').innerHTML = huesped.nombre;
            document.getElementById('read-apellido').innerHTML =
              huesped.apellido;
            document.getElementById('read-email').innerHTML =
              huesped.email || '-';
            document.getElementById('read-dni').innerHTML = huesped.dni;
            document.getElementById('read-fecha-nacimiento').innerHTML =
              dateFormat(huesped.fecha_nacimiento)[0];
            document.getElementById('read-telefono').innerHTML =
              huesped.telefono || '-';
            document.getElementById('read-created-at').innerHTML = dateFormat(
              huesped.created_at,
            ).join(' ');
          } else if (buttonClicked.classList.contains('open-modal-update')) {
            document.getElementById('update-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-nombre').value = huesped.nombre;
            document.getElementById('update-apellido').value = huesped.apellido;
            document.getElementById('update-email').value = huesped.email;
            document.getElementById('update-dni').value = huesped.dni;
            document.getElementById('update-fecha-nacimiento').value =
              huesped.fecha_nacimiento.split('T')[0];
            document.getElementById('update-telefono').value = huesped.telefono;
          } else if (buttonClicked.classList.contains('open-modal-delete')) {
            document.getElementById('delete-id').value =
              buttonClicked.dataset.value;
            document.getElementById(
              'data-quien',
            ).innerHTML = `${huesped.nombre} ${huesped.apellido}`;
          }
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
        }
      }
    });
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadFormEvents();
  loadModalEvents();
});
