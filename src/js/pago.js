// if (window.location.pathname.includes('/finalizar-registro')) {
//     (async function() {
//         const mp = new MercadoPago('TEST-9c6dec18-cef2-4f35-8367-90987611558d', {
//             locale:'es-AR'
//         });

//         const url = '/finalizar-registro/presencial';

//         const id = await searchId(url);

//         console.log(id);

//         mp.bricks().create("wallet", "checkout-btn", {
//             initialization: {
//                 preferenceId: id,
//             },
//         }); 

//         async function searchId(url) {
//             try {
//                 const req = await fetch(url);
//                 const res = await req.json();
    
//                 return res.id;
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     })();
// }