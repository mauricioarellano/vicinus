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
            entrance_date: "The entrance date is required",
            exit_date: "The exit date is required",
            phone: "Phone is required",
            username: "Username is required",
        },
    },
    resources: {
        accounts: {
            filters: {
                name: 'Name',
                condo_type: 'Condo Type',
                email: 'Email',
            },
        },
        properties: {
            filters: {
                name: 'Name',
                family_name: 'Family Name',
                street: 'Street',
                property_type: 'Property Type',
                account: 'Account',
            },
        },
        residents: {
            filters: {
                name: 'Name',
                phone: 'Phone',
                email: 'Email',
                account: 'Account',
                property: 'Property',
            },
        },
        fees: {
            filters: {
                period_year: 'Period Year',
                period_month: 'Period Month',
                status: 'Status',
                account: 'Account',
                property: 'Property',
            },
        },
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
        days: {
            Monday: 'Monday',
            Tuesday: 'Tuesday',
            Wednesday: 'Wednesday',
            Thursday: 'Thursday',
            Friday: 'Friday',
            Saturday: 'Saturday',
            Sunday: 'Sunday',
        },
    },
};

