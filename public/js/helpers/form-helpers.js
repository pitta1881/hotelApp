import {
  dateFormat,
  removeFormValidations,
  toggleLoader,
  toggleToast,
} from './common-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  //colapse form when click on legend except when in modal
  const btnsCollapser = document.getElementsByTagName('legend');
  Array.from(btnsCollapser).forEach((collapser) => {
    if (!collapser.closest('.modal')) {
      collapser.addEventListener('click', (e) => {
        const siblingContainer = e.target.nextElementSibling;
        const fixedContainer = siblingContainer.firstElementChild;
        siblingContainer.style.height = `${fixedContainer.clientHeight}px`;
        if (siblingContainer.clientHeight > 0) {
          siblingContainer.style.height = 0;
        } else {
          setTimeout(() => {
            siblingContainer.style.height = `auto`;
          }, 501);
        }
      });
    }
  });
});

const liHTML = (test, frase) => {
  return `<li class="${test ? 'valid' : 'error'}">${frase}</li>`;
};
const validateInput = (input, objValidations) => {
  let errores = 0;
  let validationsHTML = ``;
  if (!input.hidden) {
    if (objValidations[input.id].required) {
      const testValidation = input.value.length > 0;
      validationsHTML += liHTML(testValidation, 'Campo requerido');
      errores = !testValidation ? errores + 1 : errores;
    }
    if (input.value) {
      if (objValidations[input.id].minLenght) {
        const testValidation =
          input.value.length >= objValidations[input.id].minLenght;
        validationsHTML += liHTML(
          testValidation,
          `Min.: ${objValidations[input.id].minLenght} caracteres`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].maxLenght) {
        const testValidation =
          input.value.length <= objValidations[input.id].maxLenght;
        validationsHTML += liHTML(
          testValidation,
          `Max.: ${objValidations[input.id].maxLenght} caracteres`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].same) {
        const sameInput = document.getElementById(
          objValidations[input.id].same,
        );
        const testValidation = input.value === sameInput.value;
        validationsHTML += liHTML(testValidation, 'Contraseñas coinciden');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexString) {
        const testValidation = objValidations[input.id].regexString.test(
          input.value,
        );
        validationsHTML += liHTML(testValidation, 'Debe tener solo letras');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexEmail) {
        const testValidation = objValidations[input.id].regexEmail.test(
          input.value.toLowerCase(),
        );
        validationsHTML += liHTML(
          testValidation,
          'Debe tener formato de Email',
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexRazonSocial) {
        const testValidation = objValidations[input.id].regexRazonSocial.test(
          input.value,
        );
        validationsHTML += liHTML(
          testValidation,
          'Solo Letras, Número, Guiones, Puntos',
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].inverseRef) {
        const inverseRefInput = document.getElementById(
          objValidations[input.id].inverseRef,
        );
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
      if (objValidations[input.id].regexUrl) {
        const testValidation = objValidations[input.id].regexUrl.test(
          input.value.toLowerCase(),
        );
        validationsHTML += liHTML(testValidation, 'Debe tener formato de URL');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].min) {
        const testValidation =
          Number(input.value.replace(',', '.')) >= objValidations[input.id].min;
        validationsHTML += liHTML(
          testValidation,
          `Min.: ${objValidations[input.id].min}`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].max) {
        const testValidation =
          Number(input.value.replace(',', '.')) <= objValidations[input.id].max;
        validationsHTML += liHTML(
          testValidation,
          `Max.: ${objValidations[input.id].max}`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexNumber) {
        const testValidation = objValidations[input.id].regexNumber.test(
          input.value,
        );
        validationsHTML += liHTML(testValidation, 'Debe ser solo numeros');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexLatLng) {
        const testValidation = objValidations[input.id].regexLatLng.test(
          input.value,
        );
        validationsHTML += liHTML(testValidation, 'Solo numeros y Punto');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexTelefono) {
        const testValidation = objValidations[input.id].regexTelefono.test(
          input.value,
        );
        validationsHTML += liHTML(testValidation, 'Solo numeros, + y -');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexRedes) {
        const testValidation = objValidations[input.id].regexRedes.test(
          input.value,
        );
        validationsHTML += liHTML(testValidation, 'Solo letras, numeros y _');
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].regexNick) {
        const testValidation = objValidations[input.id].regexNick.test(
          input.value,
        );
        validationsHTML += liHTML(
          testValidation,
          'Solo letras, numeros, _ y -',
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].minDate) {
        const minDate = new Date(
          objValidations[input.id].minDate,
        ).toISOString();
        const minDateMs = new Date(minDate).getTime();
        const fechaSeleccionada = new Date(input.value).toISOString();
        const fechaSeleccionadaMs = new Date(fechaSeleccionada).getTime();
        const testValidation = fechaSeleccionadaMs >= minDateMs;
        validationsHTML += liHTML(
          testValidation,
          `Fecha Min.: ${dateFormat(minDate)[0]}`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
      if (objValidations[input.id].dateGreaterThan) {
        const checkinInput = document.getElementById(
          objValidations[input.id].dateGreaterThan,
        );
        let minDate = new Date(checkinInput.value);
        minDate.setDate(minDate.getDate() + 1);
        minDate = minDate.toISOString();
        const minDateMs = new Date(minDate).getTime();
        document.getElementById(input.id).min = minDate.split('T')[0];
        const fechaSeleccionada = new Date(input.value).toISOString();
        const fechaSeleccionadaMs = new Date(fechaSeleccionada).getTime();
        const testValidation = fechaSeleccionadaMs >= minDateMs;
        validationsHTML += liHTML(
          testValidation,
          `Fecha Min.: ${dateFormat(minDate)[0]}`,
        );
        errores = !testValidation ? errores + 1 : errores;
      }
    }
  }
  return {
    hasError: errores > 0,
    validationsHTML,
  };
};
const joinInputs = (form) => {
  let joins = [];
  joins = Array.prototype.concat.apply(
    joins,
    form.getElementsByTagName('select'),
  );
  joins = Array.prototype.concat.apply(
    joins,
    form.getElementsByTagName('textarea'),
  );
  joins = Array.prototype.concat.apply(
    joins,
    form.getElementsByTagName('input'),
  );
  return joins;
};
const validateForm = (form, objValidations) => {
  const joinInp = joinInputs(form);
  const allFilled = joinInp.every((input) => input.value || !input.required);
  if (allFilled) {
    return joinInp.every((input) => {
      const validation = validateInput(input, objValidations);
      if (!input.hidden && Object.keys(objValidations).length > 0) {
        htmlAndClasses(input, validation);
      }
      return !validation.hasError;
    });
  }
  return false;
};
const htmlAndClasses = (input, validacion) => {
  const ulValidations = input.closest(
    '.input-validator-container',
  ).lastElementChild;
  ulValidations.innerHTML = validacion.validationsHTML;
  if (validacion.hasError) {
    input.classList.remove('valid');
    input.classList.add('error');
  } else {
    input.classList.remove('error');
    input.classList.add('valid');
  }
};

export const loadFormInputListeners = ({ form, validations }) => {
  joinInputs(form).forEach((input) => {
    let listeners = ['focus', 'change', 'keyup'];
    //listeners.push(input.tagName === 'SELECT' ? 'change' : );
    listeners.forEach((listener) => {
      input.addEventListener(listener, () => {
        //valido input y muestro errores o validaciones
        htmlAndClasses(input, validateInput(input, validations));
        //valido todo el form para disablear el submit
        const validForm = validateForm(form, validations);
        form.getElementsByClassName('btn-submit')[0].disabled = !validForm;
      });
    });
  });
};

export const loadFormSubmitListeners = ({
  form,
  method,
  params,
  apiUrl,
  validations,
  callback,
  withFile,
}) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    toggleLoader(true);
    let finalApi = apiUrl;
    const validForm = validateForm(e.target, validations);
    if (!validForm) {
      toggleToast('error', `<p>El formulario contiene errores</p>`);
      form.getElementsByClassName('btn-submit')[0].disabled = !validForm;
    } else {
      let options = {
        method: method.toUpperCase(),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };
      const dataForm = new FormData(e.target);
      let jsonToSend = Object.fromEntries(dataForm.entries());
      if (params.length > 0) {
        params.forEach((param) => {
          finalApi = finalApi.replace(`:${param}`, jsonToSend[param]);
          delete jsonToSend[param];
          dataForm.delete(param);
        });
      }
      if (!withFile) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(jsonToSend);
      } else {
        options.body = dataForm;
      }
      await fetch(finalApi, options)
        .then((response) => response.json())
        .then((dataJson) => {
          if (dataJson.status === 'SUCCESS') {
            toggleToast('success', `<p>Éxito</p>`);
            if (callback?.length > 0) {
              callback.forEach(async (cb) => await cb(e, dataJson.data));
            }
            removeFormValidations(form);
          } else {
            let errores = ``;
            if (dataJson.message) {
              dataJson.message.forEach((mensaje, index) => {
                errores += `<li>${++index}. ${mensaje}</li>`;
              });
            } else if (dataJson.error) {
              errores = dataJson.error;
            }
            toggleToast('error', `<ul>${errores}</ul>`);
          }
        })
        .catch((err) => {
          toggleToast('error', `<p>${err}</p>`);
        });
    }
    toggleLoader(false);
  });
};
