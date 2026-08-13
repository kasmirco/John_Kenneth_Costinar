        // ========================================
        // ELEMENTS
        // ========================================

        const openChat = document.getElementById("openChat");
        const closeChat = document.getElementById("closeChat");
        const chatbot = document.getElementById("chatbot");

        const chatBody = document.getElementById("chatBody");
        const userInput = document.getElementById("userInput");
        const sendBtn = document.getElementById("sendBtn");

        const suggestionButtons = document.querySelectorAll(".suggestion-btn");

        // ========================================
        // CHAT STATE
        // ========================================

        let chatInitialized = false;

        // ========================================
        // OPEN CHAT
        // ========================================

        openChat.addEventListener("click", () => {

            chatbot.style.display = "flex";

            requestAnimationFrame(() => {
                chatbot.classList.add("show");
            });

            if (!chatInitialized) {

                addMessage(
                    `👋 <strong>Hi! I'm Costi AI.</strong><br><br>
                    I can answer questions about:
                    <br><br>
                    • About Costi
                    <br>
                    • Skills
                    <br>
                    • Projects
                    <br>
                    • Services
                    <br>
                    • Contact
                    <br><br>
                    How can I help you today?`,
                    "bot"
                );

                chatInitialized = true;

            }

        });

        // ========================================
        // CLOSE CHAT
        // ========================================

        closeChat.addEventListener("click", () => {

            chatbot.classList.remove("show");

            setTimeout(() => {

                chatbot.style.display = "none";

            }, 300);

        });

        // ========================================
        // ADD MESSAGE
        // ========================================

        function addMessage(message, sender) {

            const bubble = document.createElement("div");

            bubble.className =
                sender === "user"
                    ? "user-message"
                    : "bot-message";

            bubble.innerHTML = message;

            chatBody.appendChild(bubble);

            scrollToBottom();

        }

        // ========================================
        // TYPING INDICATOR
        // ========================================

        function showTyping() {

            const typing = document.createElement("div");

            typing.className = "bot-message";

            typing.id = "typing";

            typing.innerHTML = "Typing...";

            chatBody.appendChild(typing);

            scrollToBottom();

        }

        function hideTyping() {

            const typing = document.getElementById("typing");

            if (typing) {

                typing.remove();

            }

        }

        // ========================================
        // SCROLL
        // ========================================

        function scrollToBottom() {

            chatBody.scrollTop = chatBody.scrollHeight;

        }

        // ========================================
        // SEND MESSAGE
        // ========================================

        function sendMessage() {

            const message = userInput.value.trim();

            if (!message) return;

            addMessage(message, "user");

            userInput.value = "";

            showTyping();

            setTimeout(() => {

                hideTyping();

                const reply = generateReply(message);

                addMessage(reply, "bot");

            }, 700);

        }

        // ========================================
        // EVENTS
        // ========================================

        sendBtn.addEventListener("click", sendMessage);

        userInput.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                sendMessage();

            }

        });

        // ========================================
        // SUGGESTION BUTTONS
        // ========================================

        suggestionButtons.forEach(button => {

            button.addEventListener("click", () => {

                const text = button.textContent
                    .replace("👋", "")
                    .replace("💻", "")
                    .replace("🛠", "")
                    .replace("📩", "")
                    .trim();

                userInput.value = text;

                sendMessage();

            });

        });

        function createSuggestions(list){

            const wrapper=document.createElement("div");
            
            wrapper.className="chat-suggestions";

            list.forEach(text=>{

                const button=document.createElement("button");

                button.className="suggestion-btn";

                button.textContent=text;

                button.onclick=()=>{

                    userInput.value=text;

                    sendMessage();

                };

                wrapper.appendChild(button);

            });

            chatBody.appendChild(wrapper);

            scrollToBottom();

        }