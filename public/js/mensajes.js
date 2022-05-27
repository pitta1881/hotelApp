import { commonFetch, dateFormat } from './helpers/common-helpers.js';

const loadInitialData = async () => {
  const { status, data } = await commonFetch(`${location.origin}/api/mensajes`);
  if (status === 'SUCCESS') {
    let rowMensajes = ``;
    data.forEach((mensaje) => {
      rowMensajes += `
    <tr class="open-modal-read" data-value="${mensaje.id}">
    <td>
      <span class="thbefore">Estado</span
      ><span class="status ${mensaje.leido ? 'read' : 'unread'}"></span>
    </td>
    <td><span class="thbefore">Fecha</span>${dateFormat(
      mensaje.created_at,
    ).join(' ')}</td>
    <td><span class="thbefore">De</span>${mensaje.nombre} ${
        mensaje.apellido
      }</td>
    <td>
      <span class="thbefore">Mensaje</span>${mensaje.mensaje}
    </td>
  </tr>
  `;
    });
    document.getElementById('tbody-mensajes').innerHTML = rowMensajes;
  }
};

const loadModalEvents = () => {
  document
    .getElementById('tbody-mensajes')
    .addEventListener('click', async (e) => {
      const rowClicked = e.target.closest('.open-modal-read');
      if (rowClicked) {
        const modalTarget = document.getElementById('modal-read');
        const { status, data } = await commonFetch(
          `${location.origin}/api/mensajes/${rowClicked.dataset.value}`,
        );
        if (status === 'SUCCESS') {
          const mensaje = data[0];
          if (!mensaje.leido) {
            const responseMarked = await commonFetch(
              `${location.origin}/api/mensajes/visto/${rowClicked.dataset.value}`,
              'patch',
              { leido: true },
            );
            if (responseMarked.status === 'SUCCESS') {
              const trMensaje = document
                .getElementById('tbody-mensajes')
                .querySelector(`[data-value="${rowClicked.dataset.value}"]`);
              trMensaje
                .getElementsByClassName('status')[0]
                .classList.remove('unread');
              trMensaje
                .getElementsByClassName('status')[0]
                .classList.add('read');
            }
          }
          document.getElementById('read-created_at').innerHTML = dateFormat(
            mensaje.created_at,
          ).join(' ');
          document.getElementById('read-nombre').innerHTML = mensaje.nombre;
          document.getElementById('read-apellido').innerHTML = mensaje.apellido;
          document.getElementById('read-email').innerHTML = mensaje.email;
          document.getElementById('read-checkin').innerHTML = dateFormat(
            mensaje.checkin,
          )[0];
          document.getElementById('read-checkout').innerHTML = dateFormat(
            mensaje.checkout,
          )[0];
          document.getElementById('read-pais').innerHTML = mensaje.pais;
          document.getElementById('read-adultos').innerHTML = mensaje.adultos;
          document.getElementById('read-menores').innerHTML = mensaje.menores;
          document.getElementById('read-mensaje').innerHTML = mensaje.mensaje;
          document.body.classList.add('noscroll');
          modalTarget.classList.add('active');
        }
      }
    });
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadModalEvents();
});
