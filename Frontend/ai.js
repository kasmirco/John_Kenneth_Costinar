// ========================================
// HELPERS
// ========================================

function normalizeMessage(message) {

    return message
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}

// ========================================

function randomReply(replies) {

    return replies[
        Math.floor(Math.random() * replies.length)
    ];

}

// ========================================

function calculateScore(message, keywords) {

    let score = 0;

    keywords.forEach(keyword => {

        const words = keyword.toLowerCase().split(" ");

        let matched = 0;

        words.forEach(word => {

            if (message.includes(word)) {

                matched++;

            }

        });

        score += matched;

    });

    return score;

}

// ========================================

function findIntent(message) {

    const input = normalizeMessage(message);

    let highestScore = 0;

    let bestIntent = null;

    for (const key in KNOWLEDGE) {

        const intent = KNOWLEDGE[key];

        const score = calculateScore(
            input,
            intent.keywords
        );

        if (score > highestScore) {

            highestScore = score;

            bestIntent = intent;

        }

    }

    return bestIntent;

}

// ========================================

function generateReply(message) {

    const intent = findIntent(message);

    if (intent) {

        return randomReply(intent.replies);

    }

    return `
😊 I'm Costi's portfolio assistant.

I only answer questions about Costi.

Try asking:

• Who is Costi?

• What skills do you have?

• What projects have you built?

• Are you available for freelance work?

• How can I contact you?
`;

}