let slideIndex = 1; // Start from 1 for manual control

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");

    if (slides.length === 0) {
        console.error("No elements with class 'slides' were found.");
        return;
    }

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function autoSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(autoSlides, 10000); // Auto-play every 10s
}

// Start after the HTML has loaded
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    setTimeout(autoSlides, 10000);
});