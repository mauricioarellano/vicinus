import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, required, SelectField, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext, useTranslate } from 'react-admin';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';


const property_types = [
    { id: 'apartment', name: 'resources.property_types.apartment' },
    { id: 'house', name: 'resources.property_types.house' },
];

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const PropertyList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('properties', 'list');
    const translate = useTranslate();

    
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
                <DataTable.Col source="property_type" 
                               render={record => translate(`resources.property_types.${record.property_type}`)}
                />
                <DataTable.Col source="account_id">
                    <ReferenceField source="account_id" reference="accounts" />
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
                <ReferenceField source="account_id" reference="accounts" />
                <TextField source="name" />
                <TextField source="family_name" />
                <TextField source="street" />
                <TextField source="int_number" />
                <SelectField source="property_type" 
                             choices={property_types}
                />
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
        <Edit title={<PageTitle />} sanitizeEmptyValues={true} >
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <SelectInput source="property_type"
                    choices={property_types}
                    validate={[required("ra.validation.property_type")]}
                />
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
            <SimpleForm sanitizeEmptyValues={true} >
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <SelectInput source="property_type"
                    choices={property_types}
                    validate={[required("ra.validation.property_type")]}
                />
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
