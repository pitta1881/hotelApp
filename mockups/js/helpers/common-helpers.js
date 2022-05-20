const toast = document.getElementById('toast');
const loader = document.getElementById('loader');

export const toggleLoader = () => {
  document.body.classList.toggle('noscroll');
  loader.classList.toggle('active');
};

export const toggleToast = (type, htmlText) => {
  toast.innerHTML = htmlText;
  toast.classList.add('active', type);
  setTimeout(function () {
    toast.className = '';
  }, 5500);
};
