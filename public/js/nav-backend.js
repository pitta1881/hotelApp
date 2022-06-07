import { commonFetch } from './helpers/common-helpers.js';

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
  const { status, data } = await commonFetch(
    `${location.origin}/api/hoteles/this`,
  );
  if (status === 'SUCCESS') {
    const hotel = data[0];
    document.getElementById('img-logo-nav').src = hotel.logo_path;
    document.getElementById('img-logo-header').src = hotel.logo_path;
  }
};

const loadLogoutEvent = () => {
  document.getElementById('logout-ref').addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    location.replace(`${location.origin}/backend/login`);
  });
};

const loadNavEvents = () => {
  const sideNav = document.getElementById('side-nav');
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('sandwich').addEventListener('click', () => {
    sideNav.classList.add('active');
    body.classList.add('noscroll');
  });
  const closeBtn = document.getElementById('close-nav');
  closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('active');
    body.classList.remove('noscroll');
  });
  sideNav.addEventListener('click', (e) => {
    if (e.target.id === 'side-nav') {
      sideNav.classList.remove('active');
      body.classList.remove('noscroll');
    }
  });
  document.getElementById('side-nav').addEventListener('click', async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const aClicked = e.target.closest('a');
    if (aClicked && aClicked.id !== 'logout-ref') {
      if (!token) {
        location.href = `/backend/login`;
      } else {
        redirectPage(aClicked.getAttribute('href'));
      }
    }
  });
  document
    .getElementsByTagName('header')[0]
    .addEventListener('click', async (e) => {
      e.preventDefault();
      const aClicked = e.target.closest('a');
      redirectPage(aClicked.getAttribute('href'));
    });
};

export const redirectPage = (page = location.href) => {
  if (typeof page !== 'string') page = location.href;
  const token = sessionStorage.getItem('token');
  window.history.replaceState(
    null,
    null,
    `${window.location.pathname}?token=${token}`,
  );
  location.href = `${page}?token=${token}`;
};

document.addEventListener('DOMContentLoaded', () => {
  loadHotelData();
  loadUserData();
  loadLogoutEvent();
  loadNavEvents();
});
