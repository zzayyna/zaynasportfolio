/*REVEAL ON SCROLL */
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    var revealSide = document.querySelectorAll('.revealSide');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }

    for (var i = 0; i < revealSide.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = revealSide[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            revealSide[i].classList.add('active');
        }
        else {
            revealSide[i].classList.remove('active');
        }
    }
}