import Swal from 'sweetalert2';

if (window.location.pathname.includes('/conferencias')){
    (function() {
        let eventos = [];

        const resumen = document.getElementById('registro-resumen');

        if (resumen) {
            const eventosBoton = document.querySelectorAll('.evento__agregar');
            
            const formularioRegistro = document.querySelector('#registro');
            formularioRegistro.addEventListener('submit', submitFormulario);

            mostrarEventos();

            eventosBoton.forEach(boton => {
                boton.addEventListener('click', seleccionarEvento);
            });

            function seleccionarEvento({target}) {
                if (eventos.length < 5) {
                    //deshabilitar el evento
                    target.disabled = true;
                    eventos = [...eventos, {
                        id: target.dataset.id,
                        titulo: target.parentElement.querySelector('.evento__nombre').textContent.trim()
                    }];

                    mostrarEventos();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Solo puedes seleccionar 5 eventos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }

            function mostrarEventos() {
                //Limpiar el HTML
                limpiarEventos();

                if (eventos.length > 0) {
                    eventos.forEach(evento => {
                        const eventoDOM = document.createElement('DIV');
                        eventoDOM.classList.add('registro__evento');

                        const titulo = document.createElement('H3');
                        titulo.classList.add('registro__nombre');
                        titulo.textContent = evento.titulo;

                        const btnEliminar = document.createElement('BUTTON');
                        btnEliminar.classList.add('registro__eliminar');
                        const icon = '<i class="fa-solid fa-trash"></i>';
                        btnEliminar.setHTML(icon);

                        btnEliminar.onclick = () => {
                            eliminarEvento(evento.id);
                        };

                        //renderizar en el html
                        eventoDOM.appendChild(titulo);
                        eventoDOM.appendChild(btnEliminar);
                        resumen.appendChild(eventoDOM);
                    });
                } else {
                    const noRegistros = document.createElement('P');
                    noRegistros.textContent = "No hay eventos seleccionados,  añade hasta 5 maximo";
                    noRegistros.classList.add('registro__texto');
                    resumen.appendChild(noRegistros);
                }
            }

            function eliminarEvento(id) {
                eventos = eventos.filter(evento => {
                    return evento.id !== id;
                });
                const btnAgregar = document.querySelector(`[data-id="${id}"]`);
                btnAgregar.disabled = false;
                
                mostrarEventos();
            }

            function limpiarEventos() {
                while(resumen.firstChild) {
                    resumen.removeChild(resumen.firstChild);
                }
            }

            async function submitFormulario(e) {
                e.preventDefault();

                //obtener el regalo
                const regaloId = document.querySelector('#regalo').value;
                const eventosIds = eventos.map(evento => evento.id);

                if (eventosIds.length === 0 || regaloId === '') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Elige al menos un evento y un regalo',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    return;
                }

                //formdata
                const datos = new FormData();
                datos.append('eventos', eventosIds);
                datos.append('regalo_id', regaloId);

                const url = "/finalizar-registro/conferencias";
                const resp = await fetch(url, {
                    method: 'POST',
                    body: datos
                });
                const Requestresult = await resp.json();

                if (Requestresult.resultado) {
                    Swal.fire(
                        'Registro exitoso',
                        'Tus conferencias se han almacenado y tu registro ha sido exitoso, te esperamos',
                        'success'
                    ).then(() => {
                        location.href =`/boleto?id=${Requestresult.token}`;
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al registrar tus conferencias, intenta nuevamente',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        location.reload();  
                    });
                }
            }
        }
    })();
}