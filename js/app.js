
// Retrieve navbar into a variable
const navbar = document.getElementById("navbar__list");
// Retrieve the document sections into a variable
const sections = document.querySelectorAll("[data-nav]");


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
  const observer = new IntersectionObserver(entries => updateClassLists(entries), { threshold: [0.8] });

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
 * Create a link to section using the section id attribute
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
    document.querySelector(`a[href="#${entries[0].target.getAttribute("id")}"]`).classList.add("active");
  } else {
    entries[0].target.classList.remove("active");
    document.querySelector(`a[href="#${entries[0].target.getAttribute("id")}"]`).classList.remove("active");
  }
};
