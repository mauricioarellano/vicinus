import { ArrayInput, Create, DataTable, DateField, DateInput, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleFormIterator, SimpleShowLayout, TextArrayField, TextField, TextInput } from 'react-admin';

export const RecurrentVisitorList = () => (
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
            
            <DataTable.Col source="access_schedule.days">
                <TextArrayField source="access_schedule.days" />
            </DataTable.Col>
            
        </DataTable>
    </List>
);

export const RecurrentVisitorShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="property_id" reference="properties" />
            <ReferenceField source="account_id" reference="accounts" />
            <TextField source="name" />
            <TextField source="visitor_type" />
            <TextField source="identity_doc_photo" />
            <TextField source="plate" />
            <TextField source="plate_photo" />
            <TextArrayField source="access_schedule.days" />
            <TextField source="access_schedule.hours.entrance" />
            <TextField source="access_schedule.hours.exit" />
        </SimpleShowLayout>
    </Show>
);

export const RecurrentVisitorEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <TextInput source="name" />
            <TextInput source="visitor_type" />
            <TextInput source="identity_doc_photo" />
            <TextInput source="plate" />
            <TextInput source="plate_photo" />
            <ArrayInput source="access_schedule.days" >
                <SimpleFormIterator inline>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="access_schedule.hours.entrance" />
            <TextInput source="access_schedule.hours.exit" />
            
        </SimpleForm>
    </Edit>
);

export const RecurrentVisitorCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <TextInput source="name" />
            <TextInput source="visitor_type" />
            <TextInput source="identity_doc_photo" />
            <TextInput source="plate" />
            <TextInput source="plate_photo" />
            <ArrayInput source="access_schedule.days" >
                <SimpleFormIterator inline>
                    <TextInput />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="access_schedule.hours.entrance" />
            <TextInput source="access_schedule.hours.exit" />
            
        </SimpleForm>
    </Create>
);
