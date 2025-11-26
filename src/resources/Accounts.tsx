import { Create, DataTable, Edit, EmailField, List, required, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, UrlField, useRecordContext } from 'react-admin';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const AccountList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('accounts', 'list');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view accounts.</div>;
    }
    
    return (
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
                <TextInput source="condo_type" validate={[required("ra.validation.condo_type")]} />
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
};

export default {
  list: AccountList,
  create: AccountCreate,
  edit: AccountEdit,
  show: AccountShow,
  icon: ApartmentIcon,
};
