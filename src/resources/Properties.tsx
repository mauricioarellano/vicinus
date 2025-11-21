import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { usePermissions } from '../hooks/usePermissions';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const PropertyList = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('properties', 'list')) {
        return <div>You don't have permission to view properties.</div>;
    }
    
    return (
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
};

export const PropertyShow = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('properties', 'show')) {
        return <div>You don't have permission to view this property.</div>;
    }
    
    return (
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
};

export const PropertyEdit = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('properties', 'edit')) {
        return <div>You don't have permission to edit properties.</div>;
    }
    
    return (
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
};

export const PropertyCreate = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('properties', 'create')) {
        return <div>You don't have permission to create properties.</div>;
    }
    
    return (
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
};

export default {
  list: PropertyList,
  create: PropertyCreate,
  edit: PropertyEdit,
  show: PropertyShow,
  icon: MapsHomeWorkIcon,
};
