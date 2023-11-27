function toggleMenu() {
    var menuToggle= document.querySelector(".menuToggle");
    var navbar = document.querySelector(".navbar")
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
}