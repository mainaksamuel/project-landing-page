
// Retrieve navbar into a variable
const navbar = document.getElementById("navbar__list");
// Retrieve the document sections into a variable
const sections = document.querySelectorAll("[data-nav]");


/*
 * Once the DOM has finished loading, retrieve the heading of each of the
 *  different sections and call `appendNavItems()` to build out the navbar.
 */
document.addEventListener("DOMContentLoaded", () => {

  // Provide a way to asynchronously observe changes in the visibility of an element in the viewport.
  const observer = new IntersectionObserver((elem) => updateSectionClassList(elem), { threshold: [0.8] });

  for (const section of sections) {
    const heading = section.querySelector("h2").textContent;
    const sectionId = section.getAttribute("id");

    // create section's link and append it to the navbar list
    const sectionLink = createSectionLink(heading, sectionId);
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
const appendToNavBar = (sectionLink) => {
  const navItem = document.createElement("li");

  navItem.appendChild(sectionLink);
  navbar.appendChild(navItem);
};


/*
 * Create a link to section using the section id attribute
 *
 * param: navText => String representing the section's header
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
 * Toggle navlink's active class if section is in viewport
 *
 * param: elem => IntersectionObserverEntry item
 */
const updateSectionClassList = (elem) => {
  if (elem[0].isIntersecting === true) {
    elem[0].target.classList.add("your-active-class");
  } else {
    elem[0].target.classList.remove("your-active-class");
  }
};
