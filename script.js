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

// /* FIUN FACT*/
// const funFacts = [
//     "I lovee decorating my room (sticking random things on my walls)",
//     "My current favorite music artist is Conan Gray.",
//     "I've become obsessed with iced coffee recently; I love the lavender latte from Harvest Coffee!",
//     "Pinterest is my favorite app to get inspiration from",
//     "I lived in Saudi Arabia for most of my conscious life.",
//     "My favorite TV show is Brooklyn 99, I've lost track of how many times I've rewatched it!!",
//     "I'm obsessedddd with strawberries.",
//     "I'm currently reading 'The Design of Everyday Things' by Don Norman.",
//     "I practiced portrait drawing during quaratine watching youtube videos and I still love it!",
//     "AP Psychology was my favorite AP class in high school; I keep referencing things I learned in that class, like Freudian Slips or source amnesia!",
//     "If I were to learn an instrument, it would be the drums",
//     "I've visited 25 countries in my life!",
//     "I can speak basic Urdu/Hindi, read Arabic, and studied Spanish in school",
//     "I love psychological and suspense movies",
//     "I've been watching Spiderman for every birthday since I turned 14",
//     "I am passionate about accessibility and inclusive design, and pursuing a career in that field is my dream",
//     "Stars are my favorite shape ☆",
//     "I love curating playlists for different vibes and moods, or making them for my friends",
// ];

// document.getElementById('funFactButton').addEventListener('click', function () {
//     const randomIndex = Math.floor(Math.random() * funFacts.length);
//     document.getElementById('funFact').innerHTML = funFacts[randomIndex];
// });