import englishMessages from "ra-language-english";

export default {
    ...englishMessages,
    ra: {
        ...englishMessages.ra,
        auth: {
            ...englishMessages.ra?.auth,
            welcome: "Welcome to Vicinus",
            tagline: "Your neighborhood management platform",
            sign_in_error: "Invalid username or password",
        },
        action: {
            ...englishMessages.ra?.action,
            sign_in: "Sign In",
        },
    },
};

