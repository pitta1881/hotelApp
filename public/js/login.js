import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';

(() => {
  const token = sessionStorage.getItem('token');
  if (token) location.href = `/backend/general?token=${token}`;
  const body = document.getElementsByTagName('body')[0];
  body.className = '';
})();

const callbackSuccessSubmit = (e, data) => {
  sessionStorage.setItem('token', data.access_token);
  location.href = `/backend/general?token=${data.access_token}`;
};

const formsObj = [
  {
    form: document.getElementById('form-login'),
    method: 'post',
    apiUrl: `${location.origin}/api/auth/login`,
    params: [],
    validations: {
      nick: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    callback: [callbackSuccessSubmit],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });
});
