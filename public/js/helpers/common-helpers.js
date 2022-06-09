const toast = document.getElementById('toast');
const loader = document.getElementById('loader');

export const toggleLoader = (open) => {
  if (open) {
    document.body.classList.add('noscroll');
    loader.classList.add('active');
  } else {
    document.body.classList.remove('noscroll');
    loader.classList.remove('active');
  }
};

export const toggleToast = (type, htmlText) => {
  toast.innerHTML = htmlText;
  toast.classList.add('active', type);
  setTimeout(function () {
    toast.className = '';
  }, 5500);
};

export const callbackModal = (e) => {
  e.target.reset();
  e.target.closest('.modal').classList.remove('active');
  document.body.classList.toggle('noscroll');
};

export const removeFormValidations = (form) => {
  const elValidError = form.querySelectorAll('.valid, .error');
  elValidError.forEach((elem) => {
    elem.classList.remove('valid', 'error');
  });
  const elemsLi = form.querySelectorAll('ul li');
  elemsLi.forEach((elem) => {
    elem.remove();
  });
  const preview = form.querySelector('.preview');
  if (preview) {
    const img = form.querySelector('.preview img');
    img.outerHTML = `<img class="contain">`;
    const small = form.querySelector('.preview small');
    small.innerHTML = '';
  }
};

export const dateFormat = (date) => {
  const thisDate = new Date(date);
  const hour = `${thisDate.getUTCHours()}`.padStart(2, '0');
  const minutes = `${thisDate.getUTCMinutes()}`.padStart(2, '0');
  const day = `${thisDate.getUTCDate()}`.padStart(2, '0');
  const month = `${thisDate.getUTCMonth() + 1}`.padStart(2, '0');
  const year = thisDate.getUTCFullYear();
  return [`${day}/${month}/${year}`, `${hour}:${minutes}`];
};

export const commonFetch = async (url, method = 'get', body) => {
  toggleLoader(true);
  const fetchOptions = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  if (body) {
    fetchOptions['body'] = JSON.stringify(body);
  }
  const response = await fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJson) => dataJson)
    .catch((error) => {
      toggleToast('error', `<p>${error}</p>`);
    });
  if (response.status === 'ERROR') {
    toggleToast('error', `<p>${response.error}</p>`);
  }
  toggleLoader(false);
  return response;
};

export const loadFileUploadEvent = (elemId) => {
  const updateLogo = document.getElementById(elemId);
  updateLogo.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const imageToUpload = e.target.files[0];
      const previewContainer = updateLogo.parentNode;
      const uploadPreview = previewContainer.querySelector('.preview img');
      const uploadName = previewContainer.querySelector('.preview small');
      uploadPreview.src = URL.createObjectURL(imageToUpload);
      uploadPreview.addEventListener('load', () => {
        URL.revokeObjectURL(uploadPreview.src); // free memory
      });
      uploadName.innerText = imageToUpload.name;
    }
  });
};

export const loadPaginationRepaint = (tbodyId, total, skip, limit) => {
  const tbody = document.getElementById(tbodyId);
  const tablePagination = tbody.parentNode.nextElementSibling;
  const totalPages = Math.ceil(total / limit);
  const paginationLimit =
    tablePagination.querySelector('.pagination-limit').value;
  const actualPage = Math.floor((skip + 1) / paginationLimit) + 1;
  const subTotal = skip + limit < total ? skip + limit : total;
  if (total === 0) {
    tablePagination.classList.add('hide');
  } else {
    tablePagination.classList.remove('hide');
    tablePagination.querySelector('.table-text-pagination').innerHTML = `
    <p>Mostrando ${skip + 1} a ${subTotal} de ${total} registros.</p>`;
    tablePagination.querySelector('.last').value = totalPages;
    tablePagination.querySelector('.pagination-numbers').innerHTML = `
    ${(() => {
      let retorno = ``;
      for (let index = 0; index < totalPages; index++) {
        retorno += `<button value="${index + 1}" class="${
          actualPage === index + 1 ? 'active' : ''
        }">${index + 1}</button>`;
      }
      return retorno;
    })()}
  `;
  }
};

export const loadPaginationEvent = (tbodyId, callback) => {
  const tbody = document.getElementById(tbodyId);
  const tablePagination = tbody.parentNode.nextElementSibling;
  const paginationControlsContainer = tablePagination.querySelector(
    '.pagination-controls',
  );
  const paginationLimit = tablePagination.querySelector('.pagination-limit');
  paginationLimit.addEventListener('change', (e) => {
    e.preventDefault();
    callback(0, Number(paginationLimit.value));
  });
  paginationControlsContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const buttonClicked = e.target.closest('button');
    if (buttonClicked) {
      callback(
        (buttonClicked.value - 1) * paginationLimit.value,
        Number(paginationLimit.value),
      );
    }
  });
};
