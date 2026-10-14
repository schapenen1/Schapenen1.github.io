
// Get the folder containing this JavaScript file
    const scriptURL = document.querySelector(
        'script[src*="load_Header-Footer.js"]'
    ).src;
    
const portfolioRoot = new URL("../", scriptURL);
const imagefolder = new URL ("images/", scriptURL).href;


function loadHeader() {
    document.getElementById("header").innerHTML = `
        <div class="text-blocks">
            <button class="portfolio-button"
                onclick="window.location.href='index.html'">
                <h1>Portfolio Lars Gerritsen</h1>
            </button>
        </div>

        <div class="custom-select">
            <div class="selected">Projects</div>
            <div class="options">
                <div class="group-label">Hardware</div>
                <div class="option"
                    data-value="Pages/Nightstand/FloatingNightstand.html">
                    Floating Nightstand
                </div>
                <div class="option"
                    data-value="Pages/BookStand/BookStand.html">
                    Bookstand
                </div>

                <div class="group-label">Software</div>
                <div class="option"
                    data-value="Pages/ChristmasCard/Assets/ChristmasCard.html">
                    Christmas Card
                </div>
            </div>
        </div>

        <div class="custom-select">
            <div class="selected">About Me</div>
            <div class="options">
                <div class="option"
                    data-value="Pages/AboutMe/AboutMe.html">
                    About Me
                </div>
            </div>
        </div>
   `;
}

function loadFooter () {
    document.getElementById("footer").innerHTML = `
        <div class="text-blocks">
            <div class="contact">
                <img src="${imagefolder}LinkedIn Logo.png" class="img-logo">
                <a href="https://www.linkedin.com/in/lars-gerritsen-30b841276/" style="color: black; text-decoration: none;" >
                <h2> LinkedIn </h2>
                </a>
            </div>
            <div class="contact">
                <img src="${imagefolder}Mail Logo.png" class="img-logo">
                <a href= "mailto: lars.gerritsen.lg@gmail.com" style="color: black; text-decoration: none;">
                <h2> Mail </h2> 
                </a>
            </div>
        </div>
        `;
}

function initializeDropdowns() {
    document.querySelectorAll(".custom-select").forEach(dropdown => {
        const selected = dropdown.querySelector(".selected");
        const options = dropdown.querySelector(".options");

        selected.addEventListener("click", event => {
            event.stopPropagation();

            const shouldOpen = options.style.display !== "block";

            document.querySelectorAll(".options").forEach(option => {
                option.style.display = "none";
            });

            options.style.display = shouldOpen ? "block" : "none";
        });

        dropdown.querySelectorAll(".option").forEach(option => {
            option.addEventListener("click", () => {
                window.location.href = option.dataset.value;
            });
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".options").forEach(options => {
            options.style.display = "none";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    loadFooter();
    initializeDropdowns();
});

function loadCSS(filename) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL(
        `style/${filename}`,
        portfolioRoot
    ).href;

    document.head.appendChild(link);
}

loadCSS("header-footer.css");
