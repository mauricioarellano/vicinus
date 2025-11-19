import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout } from 'react-admin';

export const ResidentList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="account_id">
                <ReferenceField source="account_id" reference="accounts" />
            </DataTable.Col>
            <DataTable.Col source="property_id">
                <ReferenceField source="property_id" reference="properties" />
            </DataTable.Col>
            <DataTable.Col source="user_id">
                <ReferenceField source="user_id" reference="users" />
            </DataTable.Col>
            
        </DataTable>
    </List>
);

export const ResidentShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="account_id" reference="accounts" />
            <ReferenceField source="property_id" reference="properties" />
            <ReferenceField source="user_id" reference="users" />
        </SimpleShowLayout>
    </Show>
);

export const ResidentEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <ReferenceInput source="user_id" reference="users" />
        </SimpleForm>
    </Edit>
);

export const ResidentCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="property_id" reference="properties" />
            <ReferenceInput source="user_id" reference="users" />
        </SimpleForm>
    </Create>
);
