import { Create, DataTable, Edit, EmailField, List, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, UrlField } from 'react-admin';

export const AccountList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="condo_type" />
            <DataTable.Col source="website" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const AccountShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="condo_type" />
            <TextField source="address.street" />
            <TextField source="address.number" />
            <TextField source="address.neighborhood" />
            <TextField source="address.city" />
            <TextField source="address.state" />
            <TextField source="address.country" />
            <TextField source="address.zip_code" />
            <EmailField source="email" />
            <UrlField source="website" />
        </SimpleShowLayout>
    </Show>
);

export const AccountEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="condo_type" />
            <TextInput source="address.street" />
            <TextInput source="address.number" />
            <TextInput source="address.neighborhood" />
            <TextInput source="address.city" />
            <TextInput source="address.state" />
            <TextInput source="address.country" />
            <TextInput source="address.zip_code" />
            <TextInput source="email" />
            <TextInput source="website" />
        </SimpleForm>
    </Edit>
);

export const AccountCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="condo_type" />
            <TextInput source="address.street" />
            <TextInput source="address.number" />
            <TextInput source="address.neighborhood" />
            <TextInput source="address.city" />
            <TextInput source="address.state" />
            <TextInput source="address.country" />
            <TextInput source="address.zip_code" />
            <TextInput source="email" />
            <TextInput source="website" />
        </SimpleForm>
    </Create>
);
