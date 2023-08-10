if (window.location.pathname.includes('/registro')) {
    (function() {
        hideInputs();
        validateText();
        
        function validateText() {
            const nameInput = document.querySelector('#nombre');
            const lastNameInput = document.querySelector('#apellido');

            nameInput.addEventListener('keypress', (e) => {
                soloTexto(e);
            });
            lastNameInput.addEventListener('keypress', (e) => {
                soloTexto(e);
            });
        }
        
        function hideInputs() {
            //inputs
            const nameInput = document.querySelector('#nombre');
            const lastNameInput = document.querySelector('#apellido');
            const emailInput = document.querySelector('#email');
            const passInput = document.querySelector('#password');
            const confirmPassInput = document.querySelector('#password2');

            //labels
            const lastNameInputLabel = document.querySelector('#apellidoLabel');
            const emailInputLabel = document.querySelector('#emailLabel');
            const passInputLabel = document.querySelector('#passLabel');
            const confirmPassInputLabel = document.querySelector('#confrmPassLabel');

            nameInput.addEventListener('input', (e) => {
                console.log(e.target.value.length)
                console.log(lastNameInput);
                if (e.target.value !== '') {
                    lastNameInput.disabled = false;
                    lastNameInputLabel.classList.add('notDisabled');
                    setTimeout(() => {
                        lastNameInput.classList.add('notDisabled');
                    }, 500);
                } else {
                    setTimeout(() => {
                        setTimeout(() => {
                            lastNameInputLabel.classList.remove('notDisabled');
                            emailInputLabel.classList.remove('notDisabled');
                            passInputLabel.classList.remove('notDisabled');
                            confirmPassInputLabel.classList.remove('notDisabled');
                        }, 500);
                        lastNameInput.classList.remove('notDisabled');
                        emailInput.classList.remove('notDisabled');
                        passInput.classList.remove('notDisabled');
                        confirmPassInput.classList.remove('notDisabled');
                    }, 1000);
                    lastNameInput.disabled = true;
                    lastNameInput.value = '';
                    emailInput.disabled = true;
                    emailInput.value = '';
                    passInput.disabled = true;
                    passInput.value = '';
                    confirmPassInput.disabled = true;
                    confirmPassInput.value = '';
                }
            });
            lastNameInput.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    emailInput.disabled = false;
                    emailInputLabel.classList.add('notDisabled');
                    setTimeout(() => {
                        emailInput.classList.add('notDisabled');
                    }, 500);
                } else {
                    setTimeout(() => {
                        setTimeout(() => {
                            emailInputLabel.classList.remove('notDisabled');
                            passInputLabel.classList.remove('notDisabled');
                            confirmPassInputLabel.classList.remove('notDisabled');
                        }, 500);
                        emailInput.classList.remove('notDisabled');
                        passInput.classList.remove('notDisabled');
                        confirmPassInput.classList.remove('notDisabled');
                    }, 1000);
                    emailInput.disabled = true;
                    emailInput.value = '';
                    passInput.disabled = true;
                    passInput.value = '';
                    confirmPassInput.disabled = true;
                    confirmPassInput.value = '';
                }
            });
            emailInput.addEventListener('input', (e) => {
                if (e.target.value !== '') {
                    passInputLabel.classList.add('notDisabled');
                    confirmPassInputLabel.classList.add('notDisabled');
                    setTimeout(() => {
                        passInput.classList.add('notDisabled');
                        confirmPassInput.classList.add('notDisabled');
                    }, 500);
                    passInput.disabled = false;
                    confirmPassInput.disabled = false;
                } else {
                    setTimeout(() => {
                        setTimeout(() => {
                            passInputLabel.classList.remove('notDisabled');
                            confirmPassInputLabel.classList.remove('notDisabled');
                        }, 500);
                        passInput.classList.remove('notDisabled');
                        confirmPassInput.classList.remove('notDisabled');
                    }, 1000);
                    passInput.disabled = true;
                    passInput.value = '';
                    confirmPassInput.disabled = true;
                    confirmPassInput.value = '';
                }
            });
        }

        //funcion que solo permita ingresar letras en un input de tipo texto 
        function soloTexto(e) {
            const key = e.keyCode || e.which;
            const tecla = String.fromCharCode(key).toLowerCase();
            const letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
            const especiales = "8-37-39-46";

            let tecla_especial = false;
            for (let i in especiales) {
                if (key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
            }

            if (letras.indexOf(tecla) == -1 && !tecla_especial) {
                e.preventDefault();
            }
        }

    })();
}