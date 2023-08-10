if (window.location.pathname.includes('/admin')) {
    (function() {
        selectedLink();
        if (document.querySelector('#tags_input')) {
            tagsInput();
        }
        if (document.querySelector('#ponentes')) {
            ponenteSearch();
        }
        if (document.querySelector('#horas')) {
            horas();
        }

        function selectedLink() {
            const links = document.querySelectorAll('.dashboard__enlace');
            
            if (window.location.pathname.includes('/admin/dashboard')) {
                links[0].classList.add('selected');
            } else if (window.location.pathname.includes('/admin/ponentes')) {
                links[1].classList.add('selected');
            } else if (window.location.pathname.includes('/admin/eventos')) {
                links[2].classList.add('selected');
            } else if (window.location.pathname.includes('/admin/registrados')) {
                links[3].classList.add('selected');
            } else if (window.location.pathname.includes('/admin/regalos')) {
                links[4].classList.add('selected');
            }

            return;
        }

        function tagsInput() {
            const tagsInput = document.querySelector('#tags_input');

            if (tagsInput) {
                const tagsDiv = document.querySelector('#tags');
                tagsInputHidden = document.querySelector('[name="tags"]');
                let tags = [];

                //recuperar del input hidden
                if (tagsInputHidden.value !== '') {
                    tags = tagsInputHidden.value.split(',');

                    mostrarTags();
                }

                tagsInput.addEventListener('keypress', guardarTag);
                
                function guardarTag(e) {
                    if (e.keyCode === 44) {
                        if (e.target.value.trim() === '' || e.target.value < 1) {
                            return;
                        }

                        e.preventDefault();

                        tags = [...tags, e.target.value.trim()];
                        tagsInput.value = '';

                        mostrarTags();
                    }

                    console.log(tags);
                }

                function mostrarTags() {
                    tagsDiv.textContent = '';
                    tags.forEach(tag => {
                        const etiqueta = document.createElement('LI');
                        etiqueta.classList.add('formulario__tag');
                        etiqueta.textContent = tag;
                        etiqueta.ondblclick = eliminarTag;
                        tagsDiv.appendChild(etiqueta);
                    });

                    actualizarInputHidden();
                }
                
                function eliminarTag(e) {
                    e.target.remove();
                    tags = tags.filter(tag => {
                        return tag !== e.target.textContent;
                    });
                    actualizarInputHidden();
                }

                function actualizarInputHidden() {
                    tagsInputHidden.value = tags.toString();
                }
            }
        }

        function horas() {
            const horas = document.querySelector('#horas');

            if (horas) {
                const categoria = document.querySelector('[name="categoria_id"]');
                const dias = document.querySelectorAll('[name="dia"]');
                const inputHiddenDia = document.querySelector('[name="dia_id"]');
                const inputHiddenHora = document.querySelector('[name="hora_id"]');

                categoria.addEventListener('change', terminoBusqueda);
                dias.forEach(dia => {
                    dia.addEventListener('change', terminoBusqueda);
                });

                //objeto en memoria
                let busqueda = {
                    categoria_id: categoria.value ? +categoria.value : '',
                    dia: inputHiddenDia.value ? +inputHiddenDia.value : '',
                }

                if (!Object.values(busqueda).includes('')) {

                    async function iniciarApp() {
                        await buscarEventos();

                        //Resaltar la hora seleccionada del evento
                        const id = inputHiddenHora.value;
                        const horaSeleccionada = document.querySelector(`[data-hora-id="${id}"]`);

                        horaSeleccionada.classList.remove("horas__hora--deshabilitada");
                        horaSeleccionada.classList.add("horas__hora--seleccionada");

                        horaSeleccionada.onclick = seleccionarHora;

                        console.log('una funcion anonima');
                    }

                    iniciarApp();
                }

                console.log(busqueda);

                function terminoBusqueda(e) {
                    busqueda[e.target.name] = e.target.value;

                    //reiniciar campos ocultos y selector de horas
                    inputHiddenDia.value = '';
                    inputHiddenHora.value = '';

                    if (document.querySelector('.horas__hora--seleccionada')) {
                        document.querySelector('.horas__hora--seleccionada').classList.remove('horas__hora--seleccionada');
                    }

                    if (Object.values(busqueda).includes('')) {
                        return;
                    }

                    buscarEventos();
                }

                async function buscarEventos() {
                    const { dia, categoria_id } = busqueda;

                    const url = `/api/eventos-horario?dia_id=${dia}&categoria_id=${categoria_id}`;

                    const resultado = await fetch(url);
                    const eventos = await resultado.json();

                    console.log(eventos);
                    
                    obtenerHorasDisponibles(eventos);
                }

                function obtenerHorasDisponibles(eventos) {
                    //Reiniciar las horas
                    const listadoHoras = document.querySelectorAll('#horas li');
                    listadoHoras.forEach(li => li.classList.add('horas__hora--deshabilitada'));
                
                    //comrpobar eventos ya tomados, y quitar variable de deshabilitado
                    const horasTomadas = eventos.map(evento => evento.hora_id);
                    const listaHorasArray = Array.from(listadoHoras);
                    const resultado = listaHorasArray.filter(li => {
                        return !horasTomadas.includes(li.dataset.horaId);
                    });

                    resultado.forEach(li => li.classList.remove('horas__hora--deshabilitada'));

                    const horasDisponibles = document.querySelectorAll('#horas li:not(.horas__hora--deshabilitada)');
                    const horasNoDisponibles = document.querySelectorAll('.horas__hora--deshabilitada');
                    
                    horasNoDisponibles.forEach(hora => hora.removeEventListener('click', seleccionarHora));
                    horasDisponibles.forEach(hora => hora.addEventListener('click', seleccionarHora));
                }

                function seleccionarHora(e) {
                    const horaPrevia = document.querySelector('.horas__hora--seleccionada');

                    if (horaPrevia) {
                        horaPrevia.classList.remove('horas__hora--seleccionada');
                    }

                    e.target.classList.add('horas__hora--seleccionada');

                    inputHiddenHora.value = e.target.dataset.horaId;

                   //llenar el input hidden de dia
                    inputHiddenDia.value = document.querySelector('[name="dia"]:checked').value;
                }
            }
        }

        function ponenteSearch() {
            const inputSearch = document.getElementById('ponentes');
            const hiddenPonente = document.querySelector('[name="ponente_id"]');

            inputSearch.addEventListener('input', (e) => {
                let nombre = e.target.value;
                
                showResults(searchData(nombre));
            });

            if (hiddenPonente.value) { 
                async function iniciarApp() {
                    searchDataSingle(hiddenPonente.value)
                    .then(result => {
                        //insertar ponente en el html
                        const ponenteDOM = document.createElement('LI');
                        ponenteDOM.classList.add("formulario__lista--item", 'formulario__lista--item--seleccionado');
                        ponenteDOM.textContent = `${result.nombre} ${result.apellido}`;
                        ponenteDOM.dataset.id = result.id;

                        const fieldset = document.querySelector('.formulario__fieldset').nextElementSibling.childNodes[3];
                        const lista = document.createElement('UL');
                        lista.classList.add('formulario__lista');

                        lista.appendChild(ponenteDOM);

                        fieldset.appendChild(lista);
                    })
                    .catch(error => console.log(error));
                }

                iniciarApp();
            }

            const searchData = async (searchParam) => {
                let response = []; 
                let searchData = new FormData();
                searchData.append('nombre', searchParam);

                if (searchParam === '') {
                    return response;
                }

                try {
                    response = await fetch('/api/ponentes', {
                        method: 'POST',
                        body: searchData
                    });

                    return await response.json();
                } catch (error) {
                    console.log(error.message);
                }
            }

            async function searchDataSingle(id) {
                const url = `/api/ponente?id=${id}`;
                try {
                    const respuesta = await fetch(url, {
                        method: 'GET'
                    });
                    const resultado = await respuesta.json();

                    return resultado;

                } catch (error) {
                    console.log(error);
                }
            }

            const showResults = function (callback) {
                callback
                .then(resultados => {
                    const ponenteHidden = document.querySelector('[name="ponente_id"]');

                    if (resultados.length == 0 && resultados && !document.querySelector('.formulario__lista')) {
                        const text = document.querySelector('.formulario__lista--text');
                        text.remove();

                        ponenteHidden.value = '';

                        return;
                    }

                    if (resultados.length == 0 && resultados && document.querySelector('.formulario__lista')) {
                        const lista = document.querySelector('.formulario__lista');
                        lista.remove();

                        ponenteHidden.value = '';

                        return;
                    }

                    //si en la respuesta la key data existe (no es undefined) y es false (no hay resultados), significa que no se encontraron resultados
                    if (typeof resultados.data !== 'undefined' && !resultados.data) {
                        const fieldset = document.querySelector('.formulario__fieldset').nextElementSibling.childNodes[3];
                        const lista = document.querySelector('.formulario__lista');
                        const text = document.createElement('P');
                        text.textContent = 'No se encontraron resultados';
                        text.classList.add('formulario__lista--text');

                        ponenteHidden.value = '';

                        if (lista) {
                            fieldset.removeChild(lista);
                        }

                        if (document.querySelector('.formulario__lista--text') == null) {
                            fieldset.appendChild(text);
                        }
                    } else {
                        const fieldset = document.querySelector('.formulario__fieldset').nextElementSibling.childNodes[3];
                        const lista = document.createElement('UL');
                        const text = document.querySelector('.formulario__lista--text');

                        ponenteHidden.value = '';

                        if (text !== null) {
                            text.remove();
                        }
                        lista.classList.add('formulario__lista');
                        
                        if (document.querySelector('.formulario__lista') == null) {
                            fieldset.appendChild(lista);
                            resultados.forEach(result => {
                                const li = document.createElement('LI');
                                li.textContent = `${result.nombre} ${result.apellido}`;
                                li.classList.add('formulario__lista--item');
                                li.dataset.ponenteId = result.id;
                                li.addEventListener('click', ponenteSeleccionado);
                                lista.appendChild(li);
                            });
                        } else {
                            fieldset.removeChild(document.querySelector('.formulario__lista'));
                            fieldset.appendChild(lista);
                            resultados.forEach(result => {
                                const li = document.createElement('LI');
                                li.textContent = `${result.nombre} ${result.apellido}`;
                                li.classList.add('formulario__lista--item');
                                li.dataset.ponenteId = result.id;
                                li.addEventListener('click', ponenteSeleccionado);
                                lista.appendChild(li);
                            });
                        }

                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }

            const ponenteSeleccionado = function (e) {
                const inputSearch = document.getElementById('ponentes');
                const ponenteId = e.target.dataset.ponenteId;
                const ponente = document.querySelector(`[data-ponente-id="${ponenteId}"]`);
                const ponenteHidden = document.querySelector('[name="ponente_id"]');

                ponente.classList.add('formulario__lista--item--seleccionado');
                ponente.classList.remove('formulario__lista--item');
                ponente.removeEventListener('click', ponenteSeleccionado);

                const ponentesNoSeleccionados = document.querySelectorAll('.formulario__lista--item:not(.formulario__lista--item--seleccionado)');
                ponentesNoSeleccionados.forEach(ponente => {
                    ponente.remove();
                });
                
                ponenteHidden.value = ponenteId;
                inputSearch.value = "";
                console.log(ponenteId, 'id del ponente seleccionado');
                console.log(ponenteHidden.value, 'hidden ponente id');
            }
        }
    })();
}