import { Create, DataTable, Edit, EmailField, List, ReferenceInput, required, SelectField, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, UrlField, useRecordContext, useTranslate } from 'react-admin';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';

const property_types = [
    { id: 'condo', name: 'resources.property_types.condo' },
    { id: 'building', name: 'resources.property_types.building' },
];

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

const filters = [
    <TextInput source="name" label="resources.accounts.filters.name" alwaysOn={true}/>,
    <SelectInput
        source="condo_type"
        label="resources.accounts.filters.condo_type"
        choices={property_types}
    />,
    <TextInput source="email" label="resources.accounts.filters.email" />,
];

export const AccountList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('accounts', 'list');
    const translate = useTranslate();

    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view accounts.</div>;
    }
    
    return (
        <List filters={filters}>
            <DataTable>
                <DataTable.Col source="name" />
                <DataTable.Col source="condo_type" render={record => translate(`resources.property_types.${record.condo_type}`)}/>
                <DataTable.Col source="website" />
                <DataTable.Col source="email">
                    <EmailField source="email" />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const AccountShow = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('accounts', 'show');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view this account.</div>;
    }
    
    return (
        <Show title={<PageTitle />} >
            <SimpleShowLayout>
                <TextField source="name" />
                <SelectField source="condo_type" choices={property_types}/>
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
};

export const AccountEdit = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('accounts', 'edit');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to edit accounts.</div>;
    }
    
    return (
        <Edit title={<PageTitle />} >
            <SimpleForm sanitizeEmptyValues={true}>
                <TextInput source="name" />
                <SelectInput source="condo_type"
                             choices={property_types}
                             validate={[required("ra.validation.condo_type")]}
                />
                <TextInput source="address.street" defaultValue={''} />
                <TextInput source="address.number" defaultValue={''} />
                <TextInput source="address.neighborhood" defaultValue={''} />
                <TextInput source="address.city" defaultValue={''} />
                <TextInput source="address.state" defaultValue={''} />
                <TextInput source="address.country" defaultValue={''} />
                <TextInput source="address.zip_code" defaultValue={''} />
                <TextInput source="email" />
                <TextInput source="website" />
            </SimpleForm>
        </Edit>
    );
};

export const AccountCreate = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('accounts', 'create');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to create accounts.</div>;
    }
    
    return (
        <Create>
            <SimpleForm sanitizeEmptyValues={true}>
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <SelectInput source="condo_type"
                             choices={property_types}
                             validate={[required("ra.validation.condo_type")]}
                />
                <TextInput source="address.street" defaultValue={''} />
                <TextInput source="address.number" defaultValue={''} />
                <TextInput source="address.neighborhood" defaultValue={''} />
                <TextInput source="address.city" defaultValue={''} />
                <TextInput source="address.state" defaultValue={''} />
                <TextInput source="address.country" defaultValue={''} />
                <TextInput source="address.zip_code" defaultValue={''} />
                <TextInput source="email" />
                <TextInput source="website" />
            </SimpleForm>
        </Create>
    );
};

export default {
  list: AccountList,
  create: AccountCreate,
  edit: AccountEdit,
  show: AccountShow,
  icon: ApartmentIcon,
};
