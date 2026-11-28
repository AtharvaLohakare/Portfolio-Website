
// ============================================
// ATHARVA PORTFOLIO - INTERACTIVE FEATURES
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Existing preloader
    const preloader = document.getElementById("loader");

    function loadfunction() {
        if (preloader) {
            preloader.style.display = "none";
        }
    }

    window.loadfunction = loadfunction;

    window.addEventListener("load", loadfunction);
    setTimeout(loadfunction, 3000);


    // 2. Existing mobile menu
    const menuCheckbox = document.getElementById("click");

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (menuCheckbox) {
                menuCheckbox.checked = false;
            }
        });
    });


    // 3. Existing Typed.js animation
    if (typeof Typed !== "undefined" &&
        document.querySelector(".multiple-text")) {

        new Typed(".multiple-text", {
            strings: ["AI Developer", "Student", "Learner"],
            typeSpeed: 60,
            backSpeed: 60,
            loop: true
        });
    }


    // 4. Existing ScrollReveal animations
    if (typeof ScrollReveal !== "undefined") {

        const reveal = ScrollReveal({
            distance: "40px",
            duration: 1000,
            delay: 100,
            reset: false
        });

        reveal.reveal(".home-left-content", { origin: "left" });
        reveal.reveal(".home-right-content", { origin: "right" });
        reveal.reveal(".about-right-content", { origin: "right" });
        reveal.reveal(".about-left-content", { origin: "left" });
        reveal.reveal(".skill-card", { origin: "bottom", interval: 120 });
        reveal.reveal(".education-card", { origin: "bottom", interval: 120 });
        reveal.reveal(".project-card", { origin: "bottom", interval: 120 });
        reveal.reveal(".contact-content", { origin: "bottom" });
    }


    // 5. Dark / Light theme toggle
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch (error) {
        console.warn("Theme preference storage unavailable.");
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeIcon() {
        if (!themeIcon) return;

        themeIcon.className = document.body.classList.contains("dark-mode")
            ? "bx bx-sun"
            : "bx bx-moon";
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const currentTheme = document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        try {
            localStorage.setItem("portfolio-theme", currentTheme);
        } catch (error) {
            console.warn("Could not save theme preference.");
        }

        updateThemeIcon();
    });


    // 6. Reading progress bar
    const progressBar = document.getElementById("reading-progress");

    function updateReadingProgress() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateReadingProgress, {
        passive: true
    });

    updateReadingProgress();


    // 7. Custom glowing cursor
    const customCursor = document.getElementById("customCursor");

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    if (customCursor && desktopPointer.matches) {

        document.addEventListener("mousemove", event => {
            customCursor.style.left = event.clientX + "px";
            customCursor.style.top = event.clientY + "px";
        });

        document.querySelectorAll("a, button, input, textarea").forEach(element => {

            element.addEventListener("mouseenter", () => {
                customCursor.classList.add("cursor-active");
            });

            element.addEventListener("mouseleave", () => {
                customCursor.classList.remove("cursor-active");
            });
        });
    }


    // 8. 3D tilt effect for project cards
    // ================= 3D PROJECT CARD TILT =================

const projectCards = document.querySelectorAll(".project-card");

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    projectCards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((mouseX - centerX) / centerX) * 10;
            const rotateX = ((centerY - mouseY) / centerY) * 10;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
        });

    });
}

    // 9. Animated skills on scroll
    const skillCards = document.querySelectorAll(".skill-card");

    if ("IntersectionObserver" in window) {

        const skillObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("skill-visible");
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15
        });

        skillCards.forEach(card => skillObserver.observe(card));

    } else {
        skillCards.forEach(card => card.classList.add("skill-visible"));
    }


    // 10. Back-to-top button
    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle("show", window.scrollY > 400);
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 11. Interactive developer terminal
    const terminalForm = document.getElementById("terminalForm");
    const terminalInput = document.getElementById("terminalInput");
    const terminalOutput = document.getElementById("terminalOutput");

    function terminalPrint(message, className = "") {

        if (!terminalOutput) return;

        const line = document.createElement("p");
        line.textContent = message;

        if (className) {
            line.className = className;
        }

        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function runTerminalCommand(command) {

        const cmd = command.trim().toLowerCase();

        if (!cmd) return;

        terminalPrint("visitor@portfolio:~$ " + command, "terminal-command");

        const commands = {

            help: [
                "Available commands:",
                "about    - Learn about Atharva",
                "skills   - View technical skills",
                "projects - Explore projects",
                "education- View education",
                "contact  - Go to contact section",
                "github   - Open GitHub profile",
                "clear    - Clear terminal",
                "date     - Show current date"
            ],

            about: [
                "I'm Atharva Lohakare.",
                "Computer Science and Engineering student.",
                "Specialization: Artificial Intelligence & Machine Learning.",
                "Currently exploring Python, AI, ML and Generative AI."
            ],

            skills: [
                "Programming: Python, C, JavaScript",
                "Web: HTML, CSS",
                "Database: SQL",
                "Interests: AI, Machine Learning and Generative AI."
            ],

            projects: [
                "Featured projects:",
                "1. Cognidocs",
                "2. AI-Powered Lost & Found Matcher",
                "3. LogiSense AI",
                "4. CIS Attendance",
                "5. Student Management System"
            ],

            education: [
                "2023: Class 10 - Somalwar Nikal School",
                "2025: Class 12 - Dr. M. K. Umathe College",
                "2025-2029: B.Tech - G H Raisoni College of Engineering"
            ],

            contact: [
                "Let's connect!",
                "Scroll to the contact section to send a message."
            ],

            date: [
                "Today: " + new Date().toLocaleDateString()
            ]
        };

        if (cmd === "clear") {
            terminalOutput.innerHTML = "";
            return;
        }

        if (cmd === "github") {
            terminalPrint("Opening GitHub profile...", "terminal-result");
            window.open(
                "https://github.com/AtharvaLohakare",
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }

        if (commands[cmd]) {

            commands[cmd].forEach(line => {
                terminalPrint(line, "terminal-result");
            });

            if (cmd === "contact") {
                setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth"
                    });
                }, 300);
            }

            if (cmd === "projects") {
                setTimeout(() => {
                    document.getElementById("project")?.scrollIntoView({
                        behavior: "smooth"
                    });
                }, 300);
            }

            return;
        }

        terminalPrint(
            "Command not found. Type 'help' to see available commands.",
            "terminal-error"
        );
    }

    terminalForm?.addEventListener("submit", event => {

        event.preventDefault();

        const command = terminalInput.value;

        runTerminalCommand(command);

        terminalInput.value = "";
    });

    document.querySelectorAll("[data-command]").forEach(button => {

        button.addEventListener("click", () => {

            const command = button.dataset.command;

            if (terminalInput) {
                terminalInput.value = command;
                runTerminalCommand(command);
                terminalInput.value = "";
                terminalInput.focus();
            }
        });
    });


    // 12. Existing Google Apps Script contact form
    const scriptURL =
        "https://script.google.com/macros/s/AKfycbw6DRbo0s7YM7ZIahuEbYCLGwXp8DW4gAjmTe2Gw8VOGHDNUFULNQOyCVNMg_A4TJfj7w/exec";

    const form = document.getElementById("myForm");
    const submitButton = document.getElementById("contactSubmit");
    const formStatus = document.getElementById("formStatus");
    const successMessage = document.getElementById("successMessage");

    form?.addEventListener("submit", async event => {

        event.preventDefault();

        if (!submitButton) return;

        submitButton.disabled = true;

        const buttonText = submitButton.querySelector("span");

        if (buttonText) {
            buttonText.textContent = "Sending...";
        }

        if (formStatus) {
            formStatus.textContent = "";
        }

        try {

            await fetch(scriptURL, {
                method: "POST",
                body: new FormData(form)
            });

            form.reset();

            if (successMessage) {
                successMessage.classList.add("show");
            } else if (formStatus) {
                formStatus.textContent = "Your message has been submitted.";
            }

        } catch (error) {

            if (formStatus) {
                formStatus.textContent =
                    "Something went wrong. Please try again.";
            }

            console.error("Contact form error:", error);

        } finally {

            submitButton.disabled = false;

            if (buttonText) {
                buttonText.textContent = "Send Message";
            }
        }
    });


    // Existing success popup close function
    window.closePopup = function () {
        successMessage?.classList.remove("show");
    };


    // Current year in footer, if a year element exists
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
