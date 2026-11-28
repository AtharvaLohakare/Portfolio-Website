
document.addEventListener("DOMContentLoaded", () => {
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
});