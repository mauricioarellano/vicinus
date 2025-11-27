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
            account: "The account is required",
            property: "The property is required",
            email: "Must be a valid email address",
            name: "Name is required",
            condo_type: "Condo type is required",
            property_type: "Property type is required",
            period_year: "The period year is required",
            period_month: "The period month is required",
            amount: "The amount is required",
            status: "The status is required",
            visitor_type: "The visitor type is required",
        },
    },
    resources: {
        property_types: {
            apartment: 'Apartment',
            house: 'House',
            condo: 'Condo',
            building: 'Building',
            duplex: 'Duplex',
            studio: 'Studio',
            loft: 'Loft',
            villa: 'Villa',
            cottage: 'Cottage',
            bungalow: 'Bungalow',
        },
        fee_statuses: {
            pending: 'Pending',
            paid: 'Paid',
            overdue: 'Overdue',
            validated: 'Validated',
        },
        visitor_types: {
            guest: 'Guest',
            service: 'Service',
            delivery: 'Delivery',
            other: 'Other',
        },
    },
};

