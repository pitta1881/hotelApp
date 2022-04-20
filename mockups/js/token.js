const loader = document.getElementById('loader');
loader.classList.add('active');
const header = document.getElementsByTagName('header')[0];
const nav = document.getElementsByTagName('nav')[0];
const main = document.getElementsByTagName('main')[0];
const token = sessionStorage.getItem('token');
if (!token) {
  location.replace(`${location.origin}/backend/login`);
} else {
  //TODO: sacar este timeout y hacer andar el fetch
  setTimeout(() => {
    header.className = '';
    nav.className = '';
    main.className = '';
    loader.className = '';
  }, 1000);
  fetch(`${location.origin}/api/auth/verify-token`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Bearer: token,
    },
  })
    .then((response) => response.json())
    .then((dataJson) => {
      if (dataJson.status !== 'SUCCESS') {
        location.replace(`${location.origin}/backend/login`);
      } else {
        header.className = '';
        nav.className = '';
        main.className = '';
        loader.className = '';
      }
    })
    .catch(() => {
      //TODO: cuando esté en dev/prod descomentar esta linea
      //location.replace(`${location.origin}/backend/login`);
    });
}
