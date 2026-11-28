
// ============================================
// ATHARVA PORTFOLIO - INTERACTIVE FEATURES
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. Cinematic page preloader
const preloader = document.getElementById("cinematicPreloader");
const progress = document.getElementById("preloaderProgress");
const percentage = document.getElementById("preloaderPercentage");

const preloaderStartTime = Date.now();
let preloaderFinished = false;
let revealScheduled = false;

function hideCinematicPreloader() {

    if (preloaderFinished) return;
    preloaderFinished = true;

    if (progress) {
        progress.style.animation = "none";
        progress.style.width = "100%";
    }

    if (percentage) {
        percentage.textContent = "100%";
    }

    setTimeout(() => {

        preloader?.classList.add("hide-preloader");

        document.body.classList.remove("is-loading");

        setTimeout(() => {
            preloader?.remove();
        }, 850);

    }, 450);
}

function schedulePreloaderExit() {

    if (revealScheduled) return;
    revealScheduled = true;

    // Keep the intro visible for at least 1.5 seconds
    const elapsed = Date.now() - preloaderStartTime;
    const remaining = Math.max(0, 1500 - elapsed);

    setTimeout(hideCinematicPreloader, remaining);
}

window.addEventListener("load", schedulePreloaderExit, {
    once: true
});

// Fallback in case the load event takes too long
setTimeout(schedulePreloaderExit, 5000);

// Handle cases where the page has already loaded
if (document.readyState === "complete") {
    schedulePreloaderExit();
}

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



// 12. Magnetic buttons and hover effects

const magneticElements = document.querySelectorAll(
    ".btn, .theme-toggle, .social-media a, " +
    ".project-link, .terminal-hint button, " +
    ".back-to-top, #contactSubmit"
);

const supportsMagnetic = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (supportsMagnetic && !reduceMotion) {

    magneticElements.forEach(element => {

        element.classList.add("magnetic-item");

        element.addEventListener("pointermove", event => {

            const rect = element.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            // Smaller elements move less
            const strength = 0.18;

            const moveX = x * strength;
            const moveY = y * strength;

            element.style.setProperty(
                "--magnetic-x",
                `${moveX}px`
            );

            element.style.setProperty(
                "--magnetic-y",
                `${moveY}px`
            );
        });

        element.addEventListener("pointerleave", () => {

            element.style.setProperty("--magnetic-x", "0px");
            element.style.setProperty("--magnetic-y", "0px");

        });

    });
}




// ============================================
// AI PORTFOLIO ASSISTANT
// ============================================

const aiLauncher = document.getElementById("aiChatLauncher");
const aiPanel = document.getElementById("aiChatPanel");
const aiClose = document.getElementById("aiChatClose");
const aiForm = document.getElementById("aiChatForm");
const aiInput = document.getElementById("aiChatInput");
const aiMessages = document.getElementById("aiChatMessages");
const aiSuggestions = document.getElementById("aiSuggestions");

// Open assistant
function openAIAssistant() {
    aiPanel?.classList.add("ai-chat-open");
    aiPanel?.setAttribute("aria-hidden", "false");
    aiLauncher?.setAttribute("aria-expanded", "true");
    aiInput?.focus();
}

// Close assistant
function closeAIAssistant() {
    aiPanel?.classList.remove("ai-chat-open");
    aiPanel?.setAttribute("aria-hidden", "true");
    aiLauncher?.setAttribute("aria-expanded", "false");
}

aiLauncher?.addEventListener("click", () => {
    if (aiPanel?.classList.contains("ai-chat-open")) {
        closeAIAssistant();
    } else {
        openAIAssistant();
    }
});

aiClose?.addEventListener("click", closeAIAssistant);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        aiPanel?.classList.contains("ai-chat-open")) {
        closeAIAssistant();
        aiLauncher?.focus();
    }
});

// Add a chat message safely
function addAIMessage(message, sender = "assistant") {

    if (!aiMessages) return;

    const messageWrapper = document.createElement("div");
    messageWrapper.className =
        sender === "user"
            ? "ai-message user-message"
            : "ai-message assistant-message";

    if (sender === "assistant") {
        const avatar = document.createElement("div");
        avatar.className = "ai-message-avatar";
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        messageWrapper.appendChild(avatar);
    }

    const content = document.createElement("div");
    content.className = "ai-message-content";
    content.textContent = message;

    messageWrapper.appendChild(content);
    aiMessages.appendChild(messageWrapper);

    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Typing animation
function showAITyping() {

    const typing = document.createElement("div");
    typing.className = "ai-message assistant-message";
    typing.id = "aiTypingIndicator";

    typing.innerHTML = `
        <div class="ai-message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="ai-message-content ai-typing">
            <span></span><span></span><span></span>
        </div>
    `;

    aiMessages.appendChild(typing);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Portfolio knowledge base
function getPortfolioAnswer(question) {

    const q = question.toLowerCase().replace(/[^\w\s-]/g, " ");

    const includesAny = words =>
        words.some(word => q.includes(word));

    if (includesAny(["hello", "hi", "hey", "good morning"])) {
        return "Hello! 👋 Welcome to Atharva's portfolio. I can tell you about his skills, projects, education, and interests. What would you like to explore?";
    }

    if (includesAny(["who are you", "your name", "assistant"])) {
        return "I'm Atharva's portfolio assistant! 🤖 I'm here to help you explore his background, skills, projects, and learning journey.";
    }

    if (includesAny(["who is atharva", "about atharva", "about him", "introduce", "about you", "tell me about"])) {
        return "Atharva Lohakare is a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at G H Raisoni College of Engineering, Nagpur. He is an aspiring AI Developer interested in Python, AI, ML, and Generative AI. He enjoys learning through building practical projects.";
    }

    if (includesAny(["cognidocs", "cogni docs"])) {
        return "Cognidocs is an AI-powered document assistant. It extracts content from PDF and text files and prepares it for question-answering using Gemini AI. Its technologies include Python, Flask, Gemini AI, and PDF processing.";
    }

    if (includesAny(["lost", "found", "matcher"])) {
        return "The AI-Powered Lost & Found Matcher is a web application for reporting lost and found items using descriptions, categories, locations, dates, and image uploads. AI matching is a planned enhancement. It uses HTML, CSS, and JavaScript.";
    }

    if (includesAny(["logisense", "logi sense", "sih"])) {
        return "LogiSense AI is an NER intelligence prototype developed as a Smart India Hackathon prototype. It features a dashboard, live map, and AI predictions interface. Its technologies include JavaScript, Chart.js, and Leaflet.";
    }

    if (includesAny(["cis attendance", "attendance"])) {
        return "CIS Attendance is an attendance management project with separate student and admin views, a dashboard, and a scanner interface. It uses Python, JavaScript, HTML, and CSS.";
    }

    if (includesAny(["student management", "student system"])) {
        return "The Student Management System is a Python command-line application for adding, searching, updating, deleting, and sorting student records. It uses OOP, JSON storage, and CSV import/export.";
    }

    if (includesAny(["projects", "project", "built", "github", "repository"])) {
        return "Atharva's featured projects include:\n\n1. Cognidocs – AI-powered document assistant.\n2. AI-Powered Lost & Found Matcher – item reporting and matching concept.\n3. LogiSense AI – NER intelligence prototype.\n4. CIS Attendance – attendance management system.\n5. Student Management System – Python CLI application.\n\nYou can explore the projects and source code in the Projects section or on his GitHub profile: github.com/AtharvaLohakare";
    }

    if (includesAny(["skill", "technology", "technologies", "programming", "language", "stack"])) {
        return "Atharva's current skills and learning areas include:\n\n• Python\n• C\n• JavaScript (Beginner)\n• HTML and CSS\n• SQL\n• Artificial Intelligence\n• Machine Learning\n• Generative AI and Large Language Models\n\nHe is continuously developing his technical skills.";
    }

    if (includesAny(["education", "college", "university", "study", "degree", "btech", "b.tech"])) {
        return "Atharva's education:\n\n• Class 10 – Somalwar Nikal School (2023), 88%.\n• Class 12 – Dr. M. K. Umathe College (2025), 75%.\n• B.Tech in Computer Science and Engineering, specializing in AI & ML (2025–2029), G H Raisoni College of Engineering, Nagpur.";
    }

    if (includesAny(["artificial intelligence", "machine learning", "generative ai", "llm", "interest", "passion"])) {
        return "Atharva is especially interested in Artificial Intelligence, Machine Learning, Generative AI, and Large Language Models. He is exploring these fields while strengthening his programming foundation and building practical applications.";
    }

    if (includesAny(["contact", "hire", "opportunity", "collaboration", "connect", "message"])) {
        return "You can connect with Atharva through the Contact section of this portfolio. You can also find him on GitHub at github.com/AtharvaLohakare and on LinkedIn at linkedin.com/in/atharva-lohakare-324211379/. He is open to interesting ideas, collaborations, and opportunities.";
    }

    if (includesAny(["resume", "cv"])) {
        return "You can explore Atharva's education, skills, and projects on this portfolio. A downloadable resume link has not been configured in the information available to me yet.";
    }

    if (includesAny(["thank", "thanks"])) {
        return "You're welcome! 😊 Feel free to ask me anything else about Atharva's portfolio.";
    }

    return "That's an interesting question! I don't have that specific information in Atharva's portfolio yet. Try asking about his skills, projects, education, AI interests, or contact details.";
}

// Send a question
function askPortfolioAI(question) {

    const cleanQuestion = question.trim();

    if (!cleanQuestion) return;

    addAIMessage(cleanQuestion, "user");

    if (aiSuggestions) {
        aiSuggestions.style.display = "none";
    }

    showAITyping();

    setTimeout(() => {

        document.getElementById("aiTypingIndicator")?.remove();

        const answer = getPortfolioAnswer(cleanQuestion);
        addAIMessage(answer, "assistant");

    }, 750);
}

// Form submission
aiForm?.addEventListener("submit", event => {

    event.preventDefault();

    const question = aiInput.value.trim();

    if (!question) return;

    askPortfolioAI(question);
    aiInput.value = "";
});

// Suggested questions
aiSuggestions?.querySelectorAll(".ai-suggestion").forEach(button => {

    button.addEventListener("click", () => {
        askPortfolioAI(button.textContent);
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



// =========================================
// 13. SCROLL STORYTELLING - MY JOURNEY
// =========================================

const storySection = document.getElementById("journey");
const storyCards = document.querySelectorAll(".story-card");
const storyProgress = document.getElementById("storyProgress");

// Reveal story cards as visitors scroll
if ("IntersectionObserver" in window) {

    const storyObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("story-visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    storyCards.forEach(card => storyObserver.observe(card));

} else {
    storyCards.forEach(card => card.classList.add("story-visible"));
}

// Animate the timeline progress line
function updateStoryProgress() {

    if (!storySection || !storyProgress) return;

    const rect = storySection.getBoundingClientRect();
    const sectionHeight = storySection.offsetHeight;

    const distance = window.innerHeight * 0.65 - rect.top;

    const progress = Math.max(
        0,
        Math.min(100, (distance / sectionHeight) * 100)
    );

    storyProgress.style.height = progress + "%";
}

window.addEventListener("scroll", updateStoryProgress, {
    passive: true
});

updateStoryProgress();


});
