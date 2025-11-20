import spanishMessages from "@blackbox-vision/ra-language-spanish";

export default {
    ...spanishMessages,
    resources: {
        accounts: {
            name: 'Cuenta |||| Cuentas',
            fields: {
                address: 'Dirección',
                condo_type: 'Tipo de condominio',
                email: 'Correo electrónico',
                phone: 'Teléfono',
                name: 'Nombre',
                website: 'Sitio web',
            },
        },
        fees: {
            name: 'Cuota |||| Cuotas',
            fields: {
                amount: 'Cantidad',
                payment_date: 'Fecha de pago',
                period_month: 'Mes',
                period_year: 'Año',
                status: 'Estado',
                validation_date: 'Fecha de validación',
            },
        },
        properties: {
            name: 'Propiedad |||| Propiedades',
            fields: {
                alias: 'Alias',
                family_name: 'Familia',
                int_number: 'Número interior',
                name: 'Nombre',
                lot_number: 'Número de lote',
                parking_spot: 'Lugar de estacionamiento',
                property_type: 'Tipo de propiedad',
                owner: 'Propietario',
                street: 'Calle',
            },
        },
        residents: {
            name: 'Residente |||| Residentes',
            fields: {
                account: 'Cuenta',
                property: 'Propiedad',
                user: 'Usuario',
            },
        },
        recurrent_visitors: {
            name: 'Visitante recurrente |||| Visitantes recurrentes',
            fields: {
                name: 'Nombre',
                license_plate: 'Placa',
                property: 'Propiedad',
            },
        },

    },
    
};
