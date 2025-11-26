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
        validation: {
            ...englishMessages.ra.validation,
            email: "Must be a valid email address",
            name: "Name is required",
            condo_type: "Condo type is required",
            property_type: "Property type is required",
        },
    },
};

