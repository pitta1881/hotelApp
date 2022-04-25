import { toggleLoader } from './helpers/common-helpers.js';

const data = [
  {
    id: 1,
    nombre: 'test nom 1',
    apellido: 'test ape 1',
    email: 'test1@mail.com',
    checkin: '2022-05-20',
    checkout: '2022-06-01',
    pais: 'AR',
    adultos: 2,
    menores: 0,
    mensaje: 'Este es un mensaje de prueba seed 1',
    created_at: '2022-05-16',
  },
  {
    id: 2,
    nombre: 'test nom 2',
    apellido: 'test ape 2',
    email: 'test2@mail.com',
    checkin: '2022-05-25',
    checkout: '2022-06-05',
    pais: 'AR',
    adultos: 2,
    menores: 2,
    mensaje:
      'Este es un mensaje de prueba seed 2 Este es un mensaje de prueba seed 2 Este es un mensaje de prueba seed 2 Este es un mensaje de prueba seed 2',
    created_at: '2022-05-15',
  },
];

const fetchReadOne = (id) => {
  //TODO: en prod habilitar el fetch
  return new Promise((res) => setTimeout(() => res(data[id - 1]), 1000));
  /*return fetch(`${location.origin}/api/mensajes/${id}`, {
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

const rowOpenModalRead = document.getElementsByClassName('open-modal-read');
Array.from(rowOpenModalRead).forEach((row) => {
  row.addEventListener('click', async () => {
    toggleLoader();

    const dataOne = await fetchReadOne(row.dataset.value);
    document.getElementById('read-created_at').innerHTML = dataOne.created_at;
    document.getElementById('read-nombre').innerHTML = dataOne.nombre;
    document.getElementById('read-apellido').innerHTML = dataOne.apellido;
    document.getElementById('read-email').innerHTML = dataOne.email;
    document.getElementById('read-checkin').innerHTML = dataOne.checkin;
    document.getElementById('read-checkout').innerHTML = dataOne.checkout;
    document.getElementById('read-pais').innerHTML = dataOne.pais;
    document.getElementById('read-adultos').innerHTML = dataOne.adultos;
    document.getElementById('read-menores').innerHTML = dataOne.menores;
    document.getElementById('read-mensaje').innerHTML = dataOne.mensaje;
    document.body.classList.toggle('noscroll');
    const targetEl = document.getElementById('modal-read');
    targetEl.classList.add('active');

    //TODO: estas lineas en prod no van
    row.getElementsByClassName('status')[0].classList.remove('unread');
    row.getElementsByClassName('status')[0].classList.add('read');

    await fetch(`${location.origin}/api/mensajes/visto/${row.dataset.value}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        Bearer: sessionStorage.getItem('token'),
      },
      body: { leido: true },
    })
      .then((response) => response.json())
      .then((dataJson) => {
        if (dataJson.status === 'SUCCESS') {
          row.getElementsByClassName('status')[0].classList.remove('unread');
          row.getElementsByClassName('status')[0].classList.add('read');
        }
      })
      .catch(toggleLoader());
    row.getElementsByClassName('unread')[0].classList.remove('unread');
    row.getElementsByClassName('unread')[0].classList.add('read');
    toggleLoader();
  });
});
