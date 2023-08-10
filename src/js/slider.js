import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

if (!window.location.pathname.includes('/admin')){
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.slider')) {
            //objeto de configuracion de swiper
            const opciones = {
                slidesPerView: 1,
                spaceBetween: 15,
                freemode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2
                    }, 
                    1024: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 4
                    }
                }
            }

            Swiper.use([Navigation]); //El modulo de navegacion importados
            new Swiper('.slider', opciones);
        }
    });
}