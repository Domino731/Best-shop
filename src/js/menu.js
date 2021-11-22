// this script is responsible for showing or hiding the menu on mobile devices

// menu icon for event
const menuIcon = document.querySelector("#menu__icon");

// menu
const menu = document.querySelector(".header__nav");

// all menu links;
const menuLinks = document.querySelectorAll(".nav__li")

// show or hide menu
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("fa-times-circle");
    menu.classList.toggle("active");
})

// when user click the element from menu, then hide this menu
menuLinks.forEach(el => {
    el.addEventListener("click", () => {
        menu.classList.toggle("active");
    })
})