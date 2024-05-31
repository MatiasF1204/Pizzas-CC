//manipulacion del navbar en tamaño mobile
let navbar = document.querySelector('.header .flex .navbar');

document.querySelector('#menu-btn').onclick = () => {
   navbar.classList.toggle('active');
}

//activar/abrir-desactivar/cerrar shopping cart
let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
   cart.classList.add('active')
}

document.querySelector('#close-cart').onclick = () => {
   cart.classList.remove('active');
}
//desactivar/cerrar cart al scrollear
window.onscroll = () => {
   navbar.classList.remove('active');
   //myOrders.classList.remove('active');
   cart.classList.remove('active');
};

// selectores de pizzas de la pantalla principal del index
let slides = document.querySelectorAll('.home-bg .home .slide-container .slide');
let index = 0;

function next() {
   slides[index].classList.remove('active');
   index = (index + 1) % slides.length;
   slides[index].classList.add('active');
}

function prev() {
   slides[index].classList.remove('active');
   index = (index - 1 + slides.length) % slides.length;
   slides[index].classList.add('active');
}

//apertura de las preguntas de la sección faq
let accordion = document.querySelectorAll('.faq .accordion-container .accordion');

accordion.forEach(acco => {
   acco.onclick = () => {
      accordion.forEach(remove => remove.classList.remove('active'));
      acco.classList.add('active');
   }
});

