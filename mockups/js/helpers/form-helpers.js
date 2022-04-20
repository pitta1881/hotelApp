import { toggleLoader, toggleToast } from './common-helpers.js';

const liHTML = (test, frase) => {
  return `<li class="${test ? 'valid' : 'error'}">${frase}</li>`;
};
const validateInput = (input, objValidations) => {
  let errores = 0;
  let validationsHTML = ``;
  if (objValidations[input.name].required) {
    const testValidation = input.value.length > 0;
    validationsHTML += liHTML(testValidation, 'Campo requerido');
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].min) {
    const testValidation = input.value.length >= objValidations[input.name].min;
    validationsHTML += liHTML(
      testValidation,
      `Min.: ${objValidations[input.name].min} caracteres`,
    );
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].max) {
    const testValidation = input.value.length <= objValidations[input.name].max;
    validationsHTML += liHTML(
      testValidation,
      `Max.: ${objValidations[input.name].max} caracteres`,
    );
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].same) {
    const sameInput = document.getElementsByName(
      objValidations[input.name].same,
    )[0];
    const testValidation = input.value === sameInput.value;
    validationsHTML += liHTML(testValidation, 'Contraseñas coinciden');
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].regexString) {
    const testValidation = objValidations[input.name].regexString.test(
      input.value,
    );
    validationsHTML += liHTML(testValidation, 'Debe tener solo letras');
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].regexEmail) {
    const testValidation = objValidations[input.name].regexEmail.test(
      input.value.toLowerCase(),
    );
    validationsHTML += liHTML(testValidation, 'Debe tener formato de Email');
    errores = !testValidation ? errores + 1 : errores;
  }
  if (objValidations[input.name].inverseRef) {
    const inverseRefInput = document.getElementsByName(
      objValidations[input.name].inverseRef,
    )[0];
    const ulValidations = inverseRefInput.closest(
      '.input-validator-container',
    ).lastElementChild;
    inverseRefInput.classList.remove('error');
    inverseRefInput.classList.add('valid');
    const validacion = validateInput(inverseRefInput, objValidations);
    ulValidations.innerHTML = validacion.validationsHTML;
    if (validacion.hasError) {
      inverseRefInput.classList.remove('valid');
      inverseRefInput.classList.add('error');
    }
  }
  return {
    hasError: errores > 0,
    validationsHTML,
  };
};

const validateForm = (form, objValidations) => {
  const inputs = form.getElementsByTagName('input');
  const allFilled = Array.from(inputs).every((input) => input.value);
  if (allFilled) {
    return Array.from(inputs).every((input) => {
      return !validateInput(input, objValidations).hasError;
    });
  }
  return false;
};

export const loadFormInputListeners = ({ form, validations }) => {
  const inputs = form.getElementsByTagName('input');
  Array.from(inputs).forEach((input) => {
    input.addEventListener('keyup', () => {
      //valido input y muestro errores o validaciones
      const ulValidations = input.closest(
        '.input-validator-container',
      ).lastElementChild;
      input.classList.remove('error');
      input.classList.add('valid');
      const validacion = validateInput(input, validations);
      ulValidations.innerHTML = validacion.validationsHTML;
      if (validacion.hasError) {
        input.classList.remove('valid');
        input.classList.add('error');
      }
      //valido todo el form para disablear el submit
      const validForm = validateForm(form, validations);
      form.getElementsByClassName('btn-submit')[0].disabled = !validForm;
    });
  });
};

export const loadFormSubmitListeners = ({
  form,
  method,
  apiUrl,
  validations,
}) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleLoader();
    if (!validateForm(e.target, validations)) {
      toggleToast('error', `<p>El formulario contiene errores</p>`);
    } else {
      const dataForm = new FormData(e.target);
      const jsonToSend = Object.fromEntries(dataForm.entries());
      fetch(urlToFetch, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Bearer: sessionStorage.getItem('token'),
        },
        body: JSON.stringify(jsonToSend),
      })
        .then((response) => response.json())
        .then((dataJson) => {
          if (dataJson.status === 'SUCCESS') {
            e.target.reset();
            toggleToast('success', `<p>Éxito</p>`);
          } else {
            let erroresLi = ``;
            dataJson.message.forEach((mensaje, index) => {
              erroresLi += `<li>${++index}. ${mensaje}</li>`;
            });
            toggleToast('error', `<ul>${erroresLi}</ul>`);
          }
        })
        .catch((err) => {
          toggleToast('error', `<p>${err}</p>`);
        });
    }
    toggleLoader();
  });
};
