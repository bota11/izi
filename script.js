'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--open-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#about');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav  = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     console.log("link");
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target); // the first need to be done
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    //console.log("link") // check whether the link is clicked
    const id = e.target.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});




// Tabbed component
//tabs.forEach(t=>t.addEventListener('click', ()=> console.log('tab'));
tabsContainer.addEventListener('click', function (e) {
  //const clicked = e.target;
  //const clicked = e.target.parentElement;
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked)
  // Guard clause , ignore, это ничего не кликнтуто то сразу выйди
  // null возвращает когда я кликаю на снаружи батона изза closest так как не может найти родителя
  if (!clicked) return;
  
  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate tab
  clicked.classList.add('operations__tab--active');


  // Activate content area
  //console.log(clicked.dataset.tab)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


//menu fade animation 
// nav.addEventListener('mouseover', function(e){
//   if (e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity =0.5;
//   }
// });

// nav.addEventListener('mouseout', function(e){
//   if (e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

//menu fade animation refactoring

const handleHover = function(e){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = this; // logo.style.opacity = opacity;
  }
    
  
};

// const handleHover = function(e, opacity){
//   if (e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//      if (el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
    
  
// };

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5)
// });

// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1)
// });
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


//sticky nav
const initialcoords = section1.getBoundingClientRect();
console.log(initialcoords);

window.addEventListener('scroll', function(e){
  //console.log(e);
  console.log(window.scrollY);
  if (window.scrollY > initialcoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');


})

//slider 

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-1200px)';
// slider.style.overflow = 'visible';
let currentSlide = 0;
const maxSlide = slides.length;

// to define the starting point of each slide

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots');

const createDots = function(){
  slides.forEach(function(s, i) {
    dotContainer.insertAdjacentHTML('beforeend',
     `<button class = "dots__dot" data-slide = "${i}"></button>`)
  });
}


const activateDot = function(slide){
  document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
// 
  document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');



};
// slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`)
const goToSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`);
}
// to define the starting point of each slide


//0%, 100%, 200%, 300%
//next slide
//
const nextSlide = function(){
  if (currentSlide === maxSlide - 1) {
        currentSlide = 0
      } else {
         currentSlide++;
      }
      goToSlide(currentSlide);
      activateDot(currentSlide);
}

const prevSlide = function(){
  if (currentSlide === 0) {
        currentSlide = maxSlide - 1;
      } else {
         currentSlide--;
      }
      goToSlide(currentSlide);
      activateDot(currentSlide);
}

goToSlide(0)
createDots();
activateDot(0);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// btnRight.addEventListener('click', function(){
//   if (currentSlide === maxSlide - 1) {
//     currentSlide = 0
//   } else {
//      currentSlide++;
//   }
//   goToSlide(currentSlide);
//   //slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-currentSlide)}%)`);
// });
////-100%, 0%, 100%, 200%

// implement slider for arrows on a keyboard
document.addEventListener('keydown', function(e){
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
})

//implementing dots in slider


//activate dots

dotContainer.addEventListener('click', function(e){
  if (e.target.classList.contains('dots__dot')){
    console.log('DOT');
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});













//bubbling
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// //selecting closest parent element
// //closest method looking for the closest parent element

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });