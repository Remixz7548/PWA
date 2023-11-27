function toggleMenu() {
    var menuToggle= document.querySelector(".menuToggle");
    var navbar = document.querySelector(".navbar")
    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
}

    var prevScrollPos = window.pageYOffset;
    var threshold = 100; // Establece el umbral según tus necesidades
    var isAtTop = true;

    window.addEventListener('scroll', function () {
        var currentScrollPos = window.pageYOffset;
        var header = document.querySelector('header');

        if (currentScrollPos > prevScrollPos && currentScrollPos > threshold) {
            // Desplazamiento hacia abajo y supera el umbral
            header.classList.add('scrolled-down');
            isAtTop = false;
        } else {
            // Desplazamiento hacia arriba o en la parte superior
            if (currentScrollPos <= threshold && !isAtTop) {
                header.classList.remove('scrolled-down');
                isAtTop = true;
            }
        }

        prevScrollPos = currentScrollPos;
    });