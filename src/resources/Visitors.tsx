import { Create, DataTable, DateField, DateTimeInput, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';

export const VisitorList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="account_id">
                <ReferenceField source="account_id" reference="accounts" />
            </DataTable.Col>
            <DataTable.Col source="property_id">
                <ReferenceField source="property_id" reference="properties" />
            </DataTable.Col>
            <DataTable.Col source="name" />
            <DataTable.Col source="visitor_type" />
            <DataTable.Col source="identity_doc_photo" />
            <DataTable.Col source="plate" />
            <DataTable.Col source="plate_photo" />
            <DataTable.Col source="entrance_date">
                <DateField source="entrance_date" />
            </DataTable.Col>
            <DataTable.Col source="exit_date">
                <DateField source="exit_date" />
            </DataTable.Col>
            <DataTable.Col source="recurrent_visitor_id">
                <ReferenceField source="recurrent_visitor_id" reference="recurrent_visitors" />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const VisitorShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="account_id" reference="accounts" />
            <ReferenceField source="property_id" reference="properties" />
            <TextField source="name" />
            <TextField source="visitor_type" />
            <TextField source="identity_doc_photo" />
            <TextField source="plate" />
            <TextField source="plate_photo" />
            <DateField source="entrance_date" />
            <DateField source="exit_date" />
            <ReferenceField source="recurrent_visitor_id" reference="recurrent_visitors" />
            
        </SimpleShowLayout>
    </Show>
);

export const VisitorEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <TextInput source="name" />
            <TextInput source="visitor_type" />
            <TextInput source="identity_doc_photo" />
            <TextInput source="plate" />
            <TextInput source="plate_photo" />
            <DateTimeInput source="entrance_date" />
            <DateTimeInput source="exit_date" />
            <ReferenceInput source="recurrent_visitor_id" reference="recurrent_visitors" />
            
        </SimpleForm>
    </Edit>
);

export const VisitorCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <TextInput source="name" />
            <TextInput source="visitor_type" />
            <TextInput source="identity_doc_photo" />
            <TextInput source="plate" />
            <TextInput source="plate_photo" />
            <DateTimeInput source="entrance_date" />
            <DateTimeInput source="exit_date" />
            <ReferenceInput source="recurrent_visitor_id" reference="recurrent_visitors" />
        </SimpleForm>
    </Create>
);
