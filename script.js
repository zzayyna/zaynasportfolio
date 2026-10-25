const projectSections = Array.from(document.querySelectorAll('.ProjSection'));
const projectTimelineTargets = [];
const projectTimelineLinks = [];

if (projectSections.length) {
    projectSections.forEach(section => {
        const paragraphs = Array.from(section.querySelectorAll('p'));

        paragraphs.forEach(paragraph => {
            if (paragraph.closest('.persona')) {
                return;
            }

            let next = paragraph.nextElementSibling;
            while (next?.tagName === 'BR') {
                next = next.nextElementSibling;
            }

            const previous = paragraph.previousElementSibling;
            const followsImage = previous?.matches('img') || previous?.querySelector('img');
            const precedesImage = next?.matches('img, .images, .logos, .mind-image-row') &&
                paragraph.querySelector('b, strong') &&
                paragraph.textContent.trim().length <= 80;
            const centeredImageText = paragraph.style.textAlign === 'center' &&
                (followsImage || next?.matches('img, .images, .logos, .mind-image-row'));

            if (centeredImageText || precedesImage) {
                paragraph.classList.add('image-caption');
            }
        });
    });

    const projectHero = document.querySelector('.projTitle');
    const projectSkills = document.querySelector('.skills');

    if (projectHero) {
        const projectIntro = projectHero.querySelector('.inner');
        const projectImage = projectHero.querySelector(':scope > img');

        if (projectIntro) {
            projectIntro.classList.add('revealLeft');
        }
        if (projectImage) {
            projectImage.classList.add('revealRight');
        }
        projectTimelineTargets.push(projectHero);
    }

    if (projectSkills) {
        Array.from(projectSkills.children)
            .filter(child => child.tagName !== 'BR')
            .forEach(child => child.classList.add('revealUpward'));
        projectTimelineTargets.push(projectSkills);
    }

    projectSections.forEach((section, index) => {
        section.classList.add(index % 2 === 0 ? 'revealLeft' : 'revealRight');
        projectTimelineTargets.push(section);
    });

    const projectTimeline = document.createElement('nav');
    projectTimeline.className = 'project-timeline';
    projectTimeline.setAttribute('aria-label', 'Project sections');

    const projectTimelineList = document.createElement('ol');

    projectTimelineTargets.forEach((target, index) => {
        const heading = target.querySelector('h1, h2');
        const label = target.classList.contains('projTitle')
            ? 'Project overview'
            : target.classList.contains('skills')
                ? 'Skills'
                : heading?.textContent.trim() || `Project section ${index + 1}`;
        const baseId = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `section-${index + 1}`;
        let id = target.id || baseId;
        let suffix = 2;

        while (document.getElementById(id) && document.getElementById(id) !== target) {
            id = `${baseId}-${suffix}`;
            suffix += 1;
        }
        target.id = id;

        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.setAttribute('aria-label', label);
        link.title = label;

        const timelineLabel = document.createElement('span');
        timelineLabel.className = 'project-timeline__label';
        timelineLabel.textContent = label;
        link.append(timelineLabel);

        if (index === 0) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'location');
        }

        item.append(link);
        projectTimelineList.append(item);
        projectTimelineLinks.push(link);
    });

    projectTimeline.append(projectTimelineList);

    if (projectSkills) {
        projectSkills.after(projectTimeline);
    } else if (projectHero) {
        projectHero.after(projectTimeline);
    } else {
        projectSections[0].before(projectTimeline);
    }
}

const contactSection = document.querySelector('.contact');
if (contactSection) {
    Array.from(contactSection.children)
        .filter(child => child.tagName !== 'BR')
        .forEach(child => child.classList.add('revealUpward'));
}

if (projectSections.length) {
    const projectImages = Array.from(document.querySelectorAll('.projTitle img, .ProjSection img'));
    const projectLightbox = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const lightboxCaption = document.createElement('p');
    const lightboxClose = document.createElement('button');
    const lightboxPrevious = document.createElement('button');
    const lightboxNext = document.createElement('button');
    let currentImageIndex = 0;
    let previouslyFocusedElement = null;

    projectLightbox.className = 'project-lightbox';
    projectLightbox.setAttribute('role', 'dialog');
    projectLightbox.setAttribute('aria-modal', 'true');
    projectLightbox.setAttribute('aria-label', 'Image gallery');
    projectLightbox.hidden = true;

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'project-lightbox__content';

    lightboxImage.className = 'project-lightbox__image';
    lightboxImage.alt = '';

    lightboxCaption.className = 'project-lightbox__caption';
    lightboxCaption.setAttribute('aria-live', 'polite');

    lightboxClose.className = 'project-lightbox__close';
    lightboxClose.type = 'button';
    lightboxClose.setAttribute('aria-label', 'Close image gallery');
    lightboxClose.textContent = '×';

    lightboxPrevious.className = 'project-lightbox__previous';
    lightboxPrevious.type = 'button';
    lightboxPrevious.setAttribute('aria-label', 'Previous image');
    lightboxPrevious.textContent = '‹';

    lightboxNext.className = 'project-lightbox__next';
    lightboxNext.type = 'button';
    lightboxNext.setAttribute('aria-label', 'Next image');
    lightboxNext.textContent = '›';

    lightboxContent.append(lightboxImage, lightboxCaption);
    projectLightbox.append(lightboxClose, lightboxPrevious, lightboxNext, lightboxContent);
    document.body.append(projectLightbox);

    function showProjectImage(index) {
        currentImageIndex = (index + projectImages.length) % projectImages.length;
        const image = projectImages[currentImageIndex];
        const description = image.alt.trim() || `Project image ${currentImageIndex + 1}`;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = description;
        lightboxCaption.textContent = `${description} (${currentImageIndex + 1} of ${projectImages.length})`;
    }

    function openProjectLightbox(image) {
        previouslyFocusedElement = document.activeElement;
        showProjectImage(projectImages.indexOf(image));
        projectLightbox.hidden = false;
        document.body.classList.add('project-lightbox-open');
        lightboxClose.focus();
    }

    function closeProjectLightbox() {
        if (projectLightbox.hidden) {
            return;
        }

        projectLightbox.hidden = true;
        document.body.classList.remove('project-lightbox-open');
        lightboxImage.removeAttribute('src');
        previouslyFocusedElement?.focus();
    }

    projectImages.forEach(image => {
        image.classList.add('project-image-zoomable');
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `Enlarge image: ${image.alt || 'project image'}`);
        image.addEventListener('click', () => openProjectLightbox(image));
        image.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProjectLightbox(image);
            }
        });
    });

    lightboxClose.addEventListener('click', closeProjectLightbox);
    lightboxPrevious.addEventListener('click', () => showProjectImage(currentImageIndex - 1));
    lightboxNext.addEventListener('click', () => showProjectImage(currentImageIndex + 1));
    projectLightbox.addEventListener('click', event => {
        if (event.target === projectLightbox) {
            closeProjectLightbox();
        }
    });

    document.addEventListener('keydown', event => {
        if (projectLightbox.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            closeProjectLightbox();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showProjectImage(currentImageIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showProjectImage(currentImageIndex + 1);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            (document.activeElement === lightboxClose ? lightboxNext : lightboxClose).focus();
        }
    });
}

/* Toggle reveal classes only when elements cross the reveal threshold. */
const revealElements = document.querySelectorAll('.revealUpward, .revealLeft, .revealRight');

let revealFrame = 0;

function updateReveals() {
    const revealThreshold = window.innerHeight - 150;
    const updates = Array.from(revealElements, element => ({
        element,
        shouldReveal: element.getBoundingClientRect().top < revealThreshold
    }));

    updates.forEach(({ element, shouldReveal }) => {
        if (element.classList.contains('active') !== shouldReveal) {
            element.classList.toggle('active', shouldReveal);
        }
    });

    if (projectTimelineTargets.length) {
        const activationLine = window.innerHeight * 0.42;
        let activeIndex = 0;

        projectTimelineTargets.forEach((target, index) => {
            if (target.getBoundingClientRect().top <= activationLine) {
                activeIndex = index;
            }
        });

        projectTimelineLinks.forEach((link, index) => {
            const isActive = index === activeIndex;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    revealFrame = 0;
}

function scheduleRevealUpdate() {
    if (!revealFrame) {
        revealFrame = window.requestAnimationFrame(updateReveals);
    }
}

window.addEventListener('scroll', scheduleRevealUpdate, { passive: true });
window.addEventListener('resize', scheduleRevealUpdate);
scheduleRevealUpdate();

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