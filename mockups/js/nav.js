document.addEventListener('DOMContentLoaded', () => {
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
});
