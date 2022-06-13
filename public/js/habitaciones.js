import {
  callbackModal,
  commonFetch,
  dateFormat,
  loadFileUploadEvent,
  loadPaginationEvent,
  loadPaginationRepaint,
} from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  checkPlusSlide,
  eventMiniaturas,
  fotoNextPrev,
} from './helpers/fotos-helper.js';
import { REGEX_STRING } from './helpers/regex-helpers.js';

const loadFormEvents = () => {
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/habitaciones/:id`,
      params: ['id'],
      validations: {},
      callback: [loadInitialData, callbackModal],
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-update-status'),
      method: 'patch',
      apiUrl: `${location.origin}/api/habitaciones/activo/:id`,
      params: ['id'],
      validations: {
        'update-estado': {
          required: true,
        },
      },
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-create-foto'),
      method: 'post',
      apiUrl: `${location.origin}/api/habitaciones/:habitacionId/fotos`,
      params: ['habitacionId'],
      validations: {
        'new-path': {
          required: true,
        },
        'new-descripcion-foto': {
          required: true,
        },
      },
      callback: [loadInitialData, loadFotos],
      withFile: true,
    },
    {
      form: document.getElementById('form-manage-delete-services'),
      method: 'post',
      apiUrl: `${location.origin}/api/habitaciones/manage-servicios`,
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-manage-add-services'),
      method: 'post',
      apiUrl: `${location.origin}/api/habitaciones/manage-servicios`,
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
  const { status, data, total } = await commonFetch(
    `${location.origin}/api/habitaciones?skip=${skip}&limit=${limit}`,
  );
  if (status === 'SUCCESS') {
    loadPaginationRepaint('tbody-habitaciones', total, skip, limit);
    document.getElementById('tbody-habitaciones').innerHTML =
      data.length === 0
        ? `<tr><td class="no-data" colspan="10">Sin Datos</td></tr>`
        : data.reduce(
            (acum, habitacion) =>
              (acum += `
          <tr>
          <td><span class="thbefore">Nombre</span>${habitacion.nombre}</td>
          <td>
            <span class="thbefore">Descripción</span>${
              habitacion.descripcion_hab
            }
          </td>
          <td><span class="thbefore">Camas</span>${
            habitacion.descripcion_camas
          }</td>
          <td><span class="thbefore">Pax</span>${habitacion.max_pax}</td>
          <td><span class="thbefore">M²</span>${habitacion.tamanio_m2}</td>
          <td><span class="thbefore">Tipo</span>${
            habitacion.tipoHabitacion.nombre
          }</td>
          <td><span class="thbefore">Estado</span>${
            habitacion.activo ? 'Activo' : 'Inactivo'
          }</td>
          <td class="text-center">
            <span class="thbefore">Servicios</span>
            <div>
            ${habitacion.servicios.reduce(
              (acum, servicio) =>
                (acum += `
              <img
                src="${servicio.icon_path}"
                class="icon24"
                title="${servicio.nombre}"
              />
            `),
              ``,
            )}
            </div>
          </td>
          <td class="action-column">
            <span class="thbefore">Acción</span>
            <div class="action-flex">
              <div class="nowrap">
                <button
                  type="button"
                  title="Detalles"
                  class="actions blue open-modal-read"
                  data-target="modal-read"
                  data-value="${habitacion.id}"
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
                  data-value="${habitacion.id}"
                >
                  <img
                    class="icon24"
                    src="/icons/pencil-edit-button-svgrepo-com.svg"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  title="Actualizar Estado"
                  class="actions yellow open-modal-update-status"
                  data-target="modal-update-status"
                  data-value="${habitacion.id}"
                >
                  <img
                    class="icon24"
                    src="/icons/change-svgrepo-com.svg"
                    alt=""
                  />
                </button>
              </div>
              <div class="nowrap">
                <button
                  type="button"
                  title="Administrar Servicios"
                  class="actions yellow open-modal-manage-services"
                  data-target="modal-manage-services"
                  data-value="${habitacion.id}"
                >
                  <img
                    class="icon24"
                    src="/icons/room-service-svgrepo-com.svg"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  title="Administrar Fotos"
                  class="actions yellow open-modal-carousel"
                  data-target="modal-carousel"
                  data-value="${habitacion.id}"
                >
                  <img
                    class="icon24"
                    src="/icons/camera-svgrepo-com.svg"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  title="Eliminar"
                  class="actions red open-modal-delete"
                  data-target="modal-delete"
                  data-value="${habitacion.id}"
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

const loadInitialDataTiposHabitacion = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/habitaciones/tiposHabitaciones`,
  );
  if (status === 'SUCCESS') {
    let rowTiposHabitaciones = ``;
    data.forEach((tipo) => {
      rowTiposHabitaciones += `
        <option value="${tipo.id}">${tipo.nombre}</option>
  `;
    });
    document.getElementById('new-tipo').innerHTML = rowTiposHabitaciones;
    document.getElementById('update-tipo').innerHTML = rowTiposHabitaciones;
  }
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-habitaciones')
    .addEventListener('click', async (e) => {
      const buttonClicked = e.target.closest('.actions');
      if (buttonClicked) {
        const modalTarget = document.getElementById(
          buttonClicked.dataset.target,
        );
        const { status, data } = await commonFetch(
          `${location.origin}/api/habitaciones/${buttonClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const habitacion = data[0];
          if (buttonClicked.classList.contains('open-modal-read')) {
            document.getElementById('read-nombre').innerHTML =
              habitacion.nombre;
            document.getElementById('read-descripcion-hab').innerHTML =
              habitacion.descripcion_hab;
            document.getElementById('read-descripcion-camas').innerHTML =
              habitacion.descripcion_camas;
            document.getElementById('read-max-pax').innerHTML =
              habitacion.max_pax;
            document.getElementById('read-tamanio').innerHTML =
              habitacion.tamanio_m2;
            document.getElementById('read-tipo').innerHTML =
              habitacion.tipoHabitacion.nombre;
            document.getElementById('read-estado').innerHTML = habitacion.activo
              ? 'Activo'
              : 'Inactivo';
            document.getElementById('read-servicios').innerHTML =
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
            document.getElementById('read-created-at').innerHTML = dateFormat(
              habitacion.created_at,
            ).join(' ');
          } else if (buttonClicked.classList.contains('open-modal-update')) {
            document.getElementById('update-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-nombre').value = habitacion.nombre;
            document.getElementById('update-descripcion-hab').value =
              habitacion.descripcion_hab;
            document.getElementById('update-descripcion-camas').value =
              habitacion.descripcion_camas;
            document.getElementById('update-max-pax').value =
              habitacion.max_pax;
            document.getElementById('update-tamanio').value =
              habitacion.tamanio_m2;
            document.getElementById('update-tipo').value =
              habitacion.tipoHabitacion.id;
          } else if (
            buttonClicked.classList.contains('open-modal-update-status')
          ) {
            document.getElementById('update-status-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-status-span').innerHTML =
              habitacion.nombre;
            document.getElementById('update-estado').value = habitacion.activo;
          } else if (buttonClicked.classList.contains('open-modal-delete')) {
            document.getElementById('delete-id').value =
              buttonClicked.dataset.value;
            document.getElementById(
              'data-quien',
            ).innerHTML = `${habitacion.nombre}`;
          } else if (
            buttonClicked.classList.contains('open-modal-manage-services')
          ) {
            const serviciosInHabitacion = await commonFetch(
              `${location.origin}/api/habitaciones/servicios/${habitacion.id}`,
            );
            const serviciosNotInHabitacion = await commonFetch(
              `${location.origin}/api/habitaciones/notIn/servicios/${habitacion.id}`,
            );
            document.getElementById('add-service-habitacionId').value =
              buttonClicked.dataset.value;
            document.getElementById('delete-service-habitacionId').value =
              buttonClicked.dataset.value;
            document.getElementById('delete-servicio').innerHTML =
              serviciosInHabitacion.data.reduce(
                (acum, servicio) =>
                  (acum += `
              <option value="${servicio.id}">${servicio.nombre}</option>
            `),
                ``,
              );
            document.getElementById('add-servicio').innerHTML =
              serviciosNotInHabitacion.data.reduce(
                (acum, servicio) =>
                  (acum += `
                <option value="${servicio.id}">${servicio.nombre}</option>
                `),
                ``,
              );
          } else if (buttonClicked.classList.contains('open-modal-carousel')) {
            loadFotos(buttonClicked, habitacion.id);
          }
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
        }
      }
    });
};

const loadFotos = async (btn, habitacionId) => {
  document.getElementById('form-create-foto').reset();
  const modalTarget = document.getElementById('modal-carousel');
  if (modalTarget.classList.contains('active')) {
    const uploadControl = modalTarget.querySelector('.upload-control');
    if (uploadControl) {
      uploadControl.querySelector('.drop-zone').classList.remove('no-border');
      uploadControl.querySelector('.preview').classList.add('hide');
      uploadControl.querySelector('.drop-zone div').classList.remove('hide');
      habitacionId = document.getElementById('habitacion-id-create-foto').value;
    }
  } else {
    document
      .getElementById('habitacion-id-create-foto')
      .setAttribute('value', btn.dataset.value);
  }
  const fotosHabitacion = await commonFetch(
    `${location.origin}/api/habitaciones/${habitacionId}/fotos`,
  );
  const firstLiForm = document.getElementById('galeria-add-foto');
  firstLiForm.classList.add('active');
  const btnDeleteFoto = document.getElementById('btn-delete-foto');
  btnDeleteFoto.classList.add('hide');
  if (
    fotosHabitacion.data.length > 0 &&
    !modalTarget.classList.contains('active')
  ) {
    firstLiForm.classList.remove('active');
    btnDeleteFoto.classList.remove('hide');
  }
  document.getElementById('oneSlide').firstElementChild.innerHTML =
    fotosHabitacion.data.reduce(
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
    fotosHabitacion.data.reduce(
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
};

const loadFotosEvents = () => {
  const carouselUl = document.getElementById('oneSlide').firstElementChild;
  const galeriaUl = document.getElementById('galeria').firstElementChild;
  const btnDeleteFoto = document.getElementById('btn-delete-foto');
  btnDeleteFoto.addEventListener('click', async () => {
    const activeSlide = carouselUl.getElementsByClassName('slide active')[0];
    const idToDelete = activeSlide.dataset.imgId;
    const habitacionId = document.getElementById(
      'habitacion-id-create-foto',
    ).value;
    const { status } = await commonFetch(
      `${location.origin}/api/habitaciones/${habitacionId}/fotos/${idToDelete}`,
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

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadInitialDataTiposHabitacion();
  loadFormEvents();
  loadModalEvents();
  loadFotosEvents();
  loadFileUploadEvent('upload-foto');
  loadPaginationEvent('tbody-habitaciones', loadInitialData);
});
