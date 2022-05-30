import { callbackModal, commonFetch } from './helpers/common-helpers.js';
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

const loadFormEvents = () => {
  const formsObj = [
    {
      form: document.getElementById('form-update-hotel'),
      method: 'patch',
      apiUrl: `${location.origin}/api/hoteles`,
      params: [],
      validations: {
        'update-estado': {
          required: true,
        },
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
      callback: [loadInitialDataServicios, callbackModal],
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
      callback: [loadInitialDataServicios, callbackModal],
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/servicios/:id`,
      params: ['id'],
      validations: {},
      callback: [loadInitialDataServicios, callbackModal],
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-servicios')
    .addEventListener('click', async (e) => {
      const buttonClicked = e.target.closest('.actions');
      if (buttonClicked) {
        const modalTarget = document.getElementById(
          buttonClicked.dataset.target,
        );
        const { status, data } = await commonFetch(
          `${location.origin}/api/servicios/${buttonClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const servicio = data[0];
          if (buttonClicked.classList.contains('open-modal-update')) {
            document.getElementById('update-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-servicio-nombre').value =
              servicio.nombre;
            document.getElementById('update-servicio-icon-path').value =
              servicio.icon_path;
            document.getElementById('update-servicio-tipo').value =
              servicio.servInstal;
          } else if (buttonClicked.classList.contains('open-modal-delete')) {
            document.getElementById('delete-id').value =
              buttonClicked.dataset.value;
            document.getElementById('data-quien').innerHTML = servicio.nombre;
          }
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
        }
      }
    });
};

const loadInitialDataHotel = async () => {
  const { status, data } = await commonFetch(`${location.origin}/api/hoteles`);
  if (status === 'SUCCESS') {
    const hotel = data[0];
    document.getElementById('update-estado').value = hotel.activo;
    document.getElementById('update-descripcion-home').value =
      hotel.descripcion_home;
    document.getElementById('update-descripcion-ubicacion').value =
      hotel.descripcion_ubi;
    document.getElementById('update-nombre').value = hotel.nombre;
    document.getElementById('update-email').value = hotel.email;
    document.getElementById('update-telefono-1').value = hotel.telefono_1;
    document.getElementById('update-telefono-2').value = hotel.telefono_2;
    document.getElementById('update-direccion').value = hotel.direccion;
    document.getElementById('update-logo-path').value = hotel.logo_path;
    document.getElementById('update-latitud').value = hotel.lat_lng[0];
    document.getElementById('update-longitud').value = hotel.lat_lng[1];
    document.getElementById('update-facebook').value = hotel.facebook;
    document.getElementById('update-twitter').value = hotel.twitter;
    document.getElementById('update-instagram').value = hotel.instagram;
    document.getElementById('update-horario-contacto').value =
      hotel.horario_contacto;
  }
};

const loadInitialDataServicios = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/servicios/hotel`,
  );
  if (status === 'SUCCESS') {
    let rowServicios = ``;
    data.forEach((servicio) => {
      rowServicios += `
    <tr>
      <td><span class="thbefore">Nombre</span>${servicio.nombre}</td>
      <td class="text-center">
        <span class="thbefore">Icono</span
        ><img
          src="${servicio.icon_path}"
          class="icon24"
        />
      </td>
      <td>
        <span class="thbefore">Icono Path</span
        >${servicio.icon_path}
      </td>
      <td><span class="thbefore">Tipo</span>${
        servicio.servInstal ? 'Instalación' : 'Servicio'
      }</td>
      <td class="action-column">
        <span class="thbefore">Acción</span>
        <div class="nowrap">
          <button
            type="button"
            title="Actualizar"
            class="actions yellow open-modal-update"
            data-value="${servicio.id}"
            data-target="modal-update"
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
            data-value="${servicio.id}"
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
    document.getElementById('tbody-servicios').innerHTML = rowServicios;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialDataHotel();
  loadInitialDataServicios();
  loadFormEvents();
  loadModalEvents();
});