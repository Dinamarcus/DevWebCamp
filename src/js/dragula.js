import './../../node_modules/dragula/dist/dragula.css';
import dragula from 'dragula';

if (window.location.pathname.includes('/dashboard')) {
    (function() {
        const options = {
            direction: 'horizontal',
            slideFactorX: 10,
            slideFactorY: 10,
        }

        dragula([document.querySelector('.dropzone')], options);
    })();
}