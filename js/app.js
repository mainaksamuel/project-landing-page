
// Retrieve navbar into a variable
const navbar = document.getElementById("navbar__list");
// Retrieve the document sections into a variable
const sections = document.querySelectorAll("section[data-nav]");
// Retrieve the back2top link into a variable
const back2top = document.querySelector(".back2top");


/*
 * Enable smooth scrolling to a Section when clicking navbar link
 */
navbar.addEventListener("click", (evt) => {
  evt.preventDefault();

  const section = document.querySelector(evt.target.getAttribute("href"));
  section.scrollIntoView({ behavior: "smooth" });
});


/*
 * Enable smooth scrolling to the top when clicking `back-to-top` link
 */
back2top.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});


/*
 * Functions to toggle the visibility of the navbar on the document.
 */
const hideNavbar = () => navbar.hidden = true;
const unhideNavbar = () => navbar.hidden = false;


/*
 * Create a timeout timer for hidding the navbar on page
 */
let timer = null;
const hideNavbarTimeoutTimer = () => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(hideNavbar, 2000);
};


/*
 * Reveal the navbar when user is scrolling, and also toggle the `back-to-top`
 * link visibility when the user scrolls beyond half the page-fold.
 */
window.onscroll = () => {
  unhideNavbar();

  // toggle `back-to-top` link visibility
  if (window.scrollY > (window.innerHeight / 2)) {
    back2top.hidden = false;
  } else {
    back2top.hidden = true;
  }

  // hide navbar after user has stopped scrolling
  hideNavbarTimeoutTimer();
};


/*
 * Reveal the navbar when mouse pointer moves to the top of the page.
 *  (Approximately, up to the navbar's position height)
 */
window.onmousemove = (evt) => {
  if (evt.clientY <= 60) {
    unhideNavbar();

    // hide navbar if mouse pointer is inactive, or  leaves the top of the page.
    hideNavbarTimeoutTimer();
  }
};


/*
 * Main Entry
 *
 * Once the DOM has finished loading, retrieve the text to be used for each
 *    of the navigation links from the sections, and call `appendToNavBar()`
 *    to build out the navbar.
 * Also, provide a way of checking if a section is in the viewport.
 */
document.addEventListener("DOMContentLoaded", () => {

  // Provide a way to asynchronously observe changes in the visibility of an element in the viewport.
  const observer = new IntersectionObserver(entries => updateClassLists(entries), { threshold: [0.7] });

  for (const section of sections) {
    const navText = section.getAttribute("data-nav");
    const sectionId = section.getAttribute("id");

    // create section's link and append it to the navbar list
    const sectionLink = createSectionLink(navText, sectionId);
    appendToNavBar(sectionLink);

    // Section becomes the target element for the observer to watch
    observer.observe(section);
  }
});


/*
 * Append the link to a section as a navbar item
 *
 * param: sectionLink => anchor tag whose reference is the section's DOM Id
 */
const appendToNavBar = sectionLink => {
  const navItem = document.createElement("li");

  navItem.appendChild(sectionLink);
  navbar.appendChild(navItem);
};


/*
 * Create a link to a section using the section's id attribute
 *
 * param: navText => String representing the text of the navigation link
 * param: sectionId => DOM Id of the section the nav-item will link to
 */
const createSectionLink = (navText, sectionId) => {
  const navLink = document.createElement("a");
  navLink.href = `#${sectionId}`;
  navLink.classList.add("menu__link");
  navLink.innerHTML = navText;

  return navLink;
};


/*
 * Toggle section's and nav-link's active class if section is in viewport
 *
 * param: entries => IntersectionObserverEntry item
 */
const updateClassLists = entries => {
  if (entries[0].isIntersecting === true) {
    entries[0].target.classList.add("active");
    navbar.querySelector(`a[href="#${entries[0].target.getAttribute("id")}"]`).classList.add("active");
  } else {
    entries[0].target.classList.remove("active");
    navbar.querySelector(`a[href="#${entries[0].target.getAttribute("id")}"]`).classList.remove("active");
  }
};
