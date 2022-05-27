import { commonFetch } from './helpers/common-helpers.js';
import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import {
  REGEX_EMAIL,
  REGEX_NICK,
  REGEX_STRING,
} from './helpers/regex-helpers.js';

const loadFormEvents = () => {
  const formsObj = [
    {
      form: document.getElementById('form-update-user'),
      method: 'patch',
      apiUrl: `${location.origin}/api/usuarios/this`,
      params: [],
      validations: {
        'update-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-nick': {
          required: true,
          regexNick: REGEX_NICK,
        },
        'update-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
      },
    },
    {
      form: document.getElementById('form-change-password'),
      method: 'patch',
      apiUrl: `${location.origin}/api/usuarios/change-password`,
      params: [],
      validations: {
        'old-password': {
          required: true,
        },
        'new-password': {
          required: true,
          minLenght: 8,
          maxLenght: 50,
          inverseRef: 'repeat-password',
        },
        'repeat-password': {
          required: true,
          same: 'new-password',
        },
      },
    },
    {
      form: document.getElementById('form-new-user'),
      method: 'post',
      apiUrl: `${location.origin}/api/usuarios`,
      params: [],
      validations: {
        'new-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-nick': {
          required: true,
          regexNick: REGEX_NICK,
        },
        'new-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        password: {
          required: true,
          minLenght: 8,
          maxLenght: 50,
        },
      },
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const eyePasswords = document.getElementsByClassName('eye-password');
  Array.from(eyePasswords).forEach((eye) => {
    eye.addEventListener('click', () => {
      const siblingInput = eye.previousElementSibling;
      if (siblingInput.type === 'password') {
        siblingInput.type = 'text';
        eye.src = './../icons/eye-password-hide-svgrepo-com.svg';
      } else {
        siblingInput.type = 'password';
        eye.src = './../icons/eye-svgrepo-com.svg';
      }
    });
  });
};

const loadInitialData = async () => {
  const { status, data } = await commonFetch(
    `${location.origin}/api/usuarios/this`,
  );
  if (status === 'SUCCESS') {
    const usuario = data[0];
    document.getElementById('update-nombre').value = usuario.nombre;
    document.getElementById('update-apellido').value = usuario.apellido;
    document.getElementById('update-nick').value = usuario.nick;
    document.getElementById('update-email').value = usuario.email;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadInitialData();
  loadFormEvents();
});
