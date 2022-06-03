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
  REGEX_URL,
  REGEX_NUMBER,
  REGEX_RAZON_SOCIAL,
  REGEX_LAT_LNG,
} from './helpers/regex-helpers.js';

const loadFormEvents = () => {
  const formsObj = [
    {
      form: document.getElementById('form-create'),
      method: 'post',
      apiUrl: `${location.origin}/api/paypertop`,
      params: [],
      validations: {
        'new-titular': {
          regexString: REGEX_STRING,
        },
        'new-razon-social': {
          required: true,
          regexRazonSocial: REGEX_RAZON_SOCIAL,
        },
        'new-url': {
          regexUrl: REGEX_URL,
        },
        'new-email': {
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
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-delete'),
      method: 'delete',
      apiUrl: `${location.origin}/api/paypertop/:id`,
      params: ['id'],
      validations: {},
      callback: [loadInitialData, callbackModal],
    },
    {
      form: document.getElementById('form-update'),
      method: 'patch',
      apiUrl: `${location.origin}/api/paypertop/:id`,
      params: ['id'],
      validations: {
        'update-titular': {
          regexString: REGEX_STRING,
        },
        'update-razon-social': {
          required: true,
          regexRazonSocial: REGEX_RAZON_SOCIAL,
        },
        'update-url': {
          regexUrl: REGEX_URL,
        },
        'update-email': {
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
      callback: [loadInitialData, callbackModal],
    },
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
    `${location.origin}/api/paypertop`,
  );
  if (status === 'SUCCESS') {
    document.getElementById('tbody-paypertop').innerHTML =
      data.length === 0
        ? `<tr><td class="no-data" colspan="10">Sin Datos</td></tr>`
        : data.reduce(
            (acum, paypertop) =>
              (acum += `
          <tr>
          <td><span class="thbefore">Titular</span>${
            paypertop.titular || '-'
          }</td>
          <td>
            <span class="thbefore">Razón Social</span>${paypertop.razon_social}
          </td>
          <td><span class="thbefore">Email</span>${paypertop.email || '-'}</td>
          <td><span class="thbefore">Tipo</span>${paypertop.tipoPPT.nombre}</td>
          <td><span class="thbefore">Estado</span>${
            paypertop.activo ? 'Activo' : 'Inactivo'
          }</td>
          <td><span class="thbefore">Descripción</span>${
            paypertop.descripcion
          }</td>
          <td>
            <span class="thbefore">URL</span>${paypertop.url || '-'}
          </td>
          <td><span class="thbefore">Abono Mensual</span>$${
            paypertop.abono_mensual
          }</td>
          <td class="action-column">
            <span class="thbefore">Acción</span>
            <div class="nowrap">
              <button
                type="button"
                title="Detalles"
                class="actions blue open-modal-read"
                data-target="modal-read"
                data-value="${paypertop.id}"
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
                data-value="${paypertop.id}"
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
                data-value="${paypertop.id}"
              >
                <img
                  class="icon24"
                  src="/icons/change-svgrepo-com.svg"
                  alt=""
                />
              </button>
              <button
                type="button"
                title="Eliminar"
                class="actions red open-modal-delete"
                data-target="modal-delete"
                data-value="${paypertop.id}"
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
        `),
            ``,
          );
  }
};

const loadInitialDataTiposPaypertop = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/paypertop/tiposPaypertop`,
  );
  if (status === 'SUCCESS') {
    let rowTiposPaypertop = ``;
    data.forEach((tipo) => {
      rowTiposPaypertop += `
        <option value="${tipo.id}">${tipo.nombre}</option>
  `;
    });
    document.getElementById('new-tipo').innerHTML = rowTiposPaypertop;
    document.getElementById('update-tipo').innerHTML = rowTiposPaypertop;
  }
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-paypertop')
    .addEventListener('click', async (e) => {
      const buttonClicked = e.target.closest('.actions');
      if (buttonClicked) {
        const modalTarget = document.getElementById(
          buttonClicked.dataset.target,
        );
        const { status, data } = await commonFetch(
          `${location.origin}/api/paypertop/${buttonClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const paypertop = data[0];
          if (buttonClicked.classList.contains('open-modal-read')) {
            document.getElementById('read-titular').innerHTML =
              paypertop.titular || '-';
            document.getElementById('read-razon-social').innerHTML =
              paypertop.razon_social;
            document.getElementById('read-email').innerHTML =
              paypertop.email || '-';
            document.getElementById('read-tipo').innerHTML =
              paypertop.tipoPPT.nombre;
            document.getElementById('read-descripcion').innerHTML =
              paypertop.descripcion;
            document.getElementById('read-url').innerHTML =
              paypertop.url || '-';
            document.getElementById('read-abono-mensual').innerHTML =
              '$' + paypertop.abono_mensual;
            document.getElementById('read-latitud').innerHTML =
              paypertop.lat_lng[0];
            document.getElementById('read-longitud').innerHTML =
              paypertop.lat_lng[1];
            document.getElementById('read-activo').innerHTML = paypertop.activo
              ? 'Activo'
              : 'Inactivo';
            document.getElementById('read-created-at').innerHTML = dateFormat(
              paypertop.created_at,
            ).join(' ');
          } else if (buttonClicked.classList.contains('open-modal-update')) {
            document.getElementById('update-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-titular').value = paypertop.titular;
            document.getElementById('update-razon-social').value =
              paypertop.razon_social;
            document.getElementById('update-email').value = paypertop.email;
            document.getElementById('update-tipo').value = paypertop.tipoPPT.id;
            document.getElementById('update-descripcion').value =
              paypertop.descripcion;
            document.getElementById('update-url').value = paypertop.url;
            document.getElementById('update-abono-mensual').value =
              paypertop.abono_mensual;
            document.getElementById('update-latitud').value =
              paypertop.lat_lng[0];
            document.getElementById('update-longitud').value =
              paypertop.lat_lng[1];
          } else if (
            buttonClicked.classList.contains('open-modal-update-status')
          ) {
            document.getElementById('update-status-id').value =
              buttonClicked.dataset.value;
            document.getElementById('update-status-span').innerHTML =
              paypertop.razon_social;
            document.getElementById('update-estado').value = paypertop.activo;
          } else if (buttonClicked.classList.contains('open-modal-delete')) {
            document.getElementById('delete-id').value =
              buttonClicked.dataset.value;
            document.getElementById('data-quien').innerHTML =
              paypertop.razon_social;
          }
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
          if (buttonClicked.classList.contains('open-modal-update')) {
            loadUbicacionEvents(
              'mapa-upd',
              'update',
              paypertop.lat_lng,
              paypertop.razon_social,
            );
          }
        }
      }
    });
};

const loadCreateNewEvent = () => {
  document
    .getElementById('open-modal-create')
    .addEventListener('click', async (e) => {
      const { status, data } = await commonFetch(
        `${location.origin}/api/hoteles/this`,
      );
      if (status === 'SUCCESS') {
        const hotel = data[0];
        document.getElementById(`new-latitud`).value = hotel.lat_lng[0];
        document.getElementById(`new-longitud`).value = hotel.lat_lng[1];
        loadUbicacionEvents('mapa-new', 'new', hotel.lat_lng, hotel.nombre);
      }
    });
};

const loadUbicacionEvents = (mapaId, tipo, lat_lng, nombre) => {
  const marker = L.icon({
    iconUrl: '/icons/marker-icon-red.png',
    shadowUrl: '/icons/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const evCenterMap = (e) => {
    var px = mapa.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    mapa.panTo(mapa.unproject(px), { animate: true }); // pan to new center
  };

  const addMarker = (lat, lng) => {
    layerMarkers.clearLayers();
    L.marker([lat, lng], {
      icon: marker,
      draggable: true,
    })
      .bindPopup(`<b>${nombre}</b>`)
      .on('dragend', newPosition)
      .addTo(layerMarkers);
  };

  const newPosition = (e) => {
    var { lat, lng } = e.latlng || e.target.getLatLng();
    document.getElementById(`${tipo}-latitud`).value = lat;
    document.getElementById(`${tipo}-longitud`).value = lng;
    addMarker(lat, lng);
  };

  //CARGAR MAPA
  const mapaSection = document.getElementById(mapaId);
  if (mapaSection.hasChildNodes()) {
    mapaSection.outerHTML = `<section class="mapa" id="${mapaId}"></section>`;
  }
  const mapa = L.map(mapaId);
  mapa
    .setView([lat_lng[0], lat_lng[1]], 15)
    .on('popupopen', evCenterMap)
    .on('click', newPosition);
  L.tileLayer(
    'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=2mVjYjN9xq8jxt729yv7',
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    },
  ).addTo(mapa);
  let layerMarkers = L.layerGroup().addTo(mapa);
  addMarker(lat_lng[0], lat_lng[1]);
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadInitialDataTiposPaypertop();
  loadFormEvents();
  loadModalEvents();
  loadCreateNewEvent();
});
