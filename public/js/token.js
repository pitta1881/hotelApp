import {
  commonFetch,
  toggleLoader,
  toggleToast,
} from './helpers/common-helpers.js';

const verifyToken = async (token) => {
  toggleLoader(true);
  const { status, message } = await fetch(
    `${location.origin}/api/auth/verify-token`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    },
  )
    .then((response) => response.json())
    .then((dataJson) => dataJson)
    .catch(() => {
      location.href = `${location.origin}/backend/login`;
    });
  if (status !== 'SUCCESS') {
    let errores = ``;
    message.forEach((mensaje, index) => {
      errores += `<li>${++index}. ${mensaje}</li>`;
    });
    toggleToast('error', `<ul>${errores}</ul>`);
    setTimeout(() => {
      sessionStorage.clear();
      location.href = `${location.origin}/backend/login`;
    }, 2000);
  } else {
    document.getElementsByTagName('header')[0].className = '';
    document.getElementsByTagName('nav')[0].className = '';
    document.getElementsByTagName('main')[0].className = '';
  }
  toggleLoader(false);
  return status;
};

const loadUserData = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/usuarios/this`,
  );
  if (status === 'SUCCESS') {
    const usuario = data[0];
    document.getElementById(
      'user-nombre-apellido',
    ).innerHTML = `${usuario.nombre} ${usuario.apellido}`;
  }
};

const loadHotelData = async () => {
  const { status, data } = await commonFetch(`${location.origin}/api/hoteles`);
  if (status === 'SUCCESS') {
    const hotel = data[0];
    document.getElementById('img-logo-nav').src = hotel.logo_path;
  }
};

const loadLogoutEvent = () => {
  document.getElementById('logout-ref').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.replace(`${location.origin}/backend/login`);
  });
};

(async () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    location.replace(`${location.origin}/backend/login`);
  } else {
    const status = await verifyToken(token);
    if (status === 'SUCCESS') {
      loadHotelData();
      loadUserData();
      loadLogoutEvent();
    }
  }
})();
