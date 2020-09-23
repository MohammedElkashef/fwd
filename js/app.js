/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navMenu = document.querySelector('.navbar__menu');
const navItems = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function createList(el, mirror) {
  let element = document.createElement(el);
  element.innerText = mirror.dataset.nav;
  element.className = 'menu__link';
  element.dataset.nav = mirror.id;
  return element;
}

function setActive(item) {
  item.classList.add('active');
}
function removeActive(activeItems) {
  if (activeItems.length > 0)
    for (let item of activeItems) {
      item.classList.remove('active');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function renderNavigation() {
  for (const section of sections) {
    navItems.appendChild(createList('li', section));
  }
}
// Add class 'active' to section when near top of viewport
function activeSection() {
  window.addEventListener('scroll', function () {
    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    removeActive(document.querySelectorAll('section.active'));
    setActive(sections[index]);
  });
}
// Scroll to anchor ID using scrollTO event
function scrollToElement() {
  navItems.addEventListener('click', function (e) {
    document.querySelector(`#${e.target.dataset.nav}`).scrollIntoView({
      behavior: 'smooth',
    });
    removeActive(document.querySelectorAll('#navbar__list .active'));
    e.target.classList.add('active');
  });
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
renderNavigation();
// Scroll to section on link click
scrollToElement();
// Set sections as active
activeSection();
