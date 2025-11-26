import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, required, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const PropertyList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('properties', 'list');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
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
    const hasAccess = canAccess('properties', 'show');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
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
    const hasAccess = canAccess('properties', 'edit');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to edit properties.</div>;
    }
    
    return (
        <Edit title={<PageTitle />} >
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="property_type"  validate={[required("ra.validation.property_type")]}/>
                <TextInput source="family_name" />
                <TextInput source="street" />
                <TextInput source="int_number" />

            </SimpleForm>
        </Edit>
    );
};

export const PropertyCreate = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('properties', 'create');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to create properties.</div>;
    }
    
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="property_type"  validate={[required("ra.validation.property_type")]}/>
                <TextInput source="family_name" />
                <TextInput source="street" />
                <TextInput source="int_number" />
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
