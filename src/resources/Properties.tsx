import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const PropertyList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="family_name" />
            <DataTable.Col source="street" />
            <DataTable.Col source="int_number" />
            <DataTable.Col source="property_type" />
            <DataTable.Col source="account_id">
                <ReferenceField source="account_id" reference="accounts" />
            </DataTable.Col>
            <DataTable.Col source="owner_user_id">
                <ReferenceField source="owner_user_id" reference="users" />
            </DataTable.Col>
            
        </DataTable>
    </List>
);

export const PropertyShow = () => (
    <Show title={<PageTitle />} >
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="family_name" />
            <TextField source="street" />
            <TextField source="int_number" />
            <TextField source="property_type" />
            <ReferenceField source="account_id" reference="accounts" />
            <ReferenceField source="owner_user_id" reference="users" />
            
        </SimpleShowLayout>
    </Show>
);

export const PropertyEdit = () => (
    <Edit title={<PageTitle />} >
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="family_name" />
            <TextInput source="street" />
            <TextInput source="int_number" />
            <TextInput source="property_type" />
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="owner_user_id" reference="users" />
        </SimpleForm>
    </Edit>
);

export const PropertyCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="family_name" />
            <TextInput source="street" />
            <TextInput source="int_number" />
            <TextInput source="property_type" />
            <ReferenceInput source="account_id" reference="accounts" />
            <ReferenceInput source="owner_user_id" reference="users" />
        </SimpleForm>
    </Create>
);

export default {
  list: PropertyList,
  create: PropertyCreate,
  edit: PropertyEdit,
  show: PropertyShow,
  icon: MapsHomeWorkIcon,
};
