import { Create, DataTable, Edit, email, EmailField, List, number, ReferenceField, ReferenceInput, required, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

const filters = [
    <ReferenceInput source="account_id" reference="accounts" label="resources.users.filters.account" >
        <SelectInput optionText="name"/>
    </ReferenceInput>,
    <TextInput source="name" label="resources.users.filters.name" />,
    <TextInput source="email" label="resources.users.filters.email" />,
    <TextInput source="phone" label="resources.users.filters.phone" />,
];

export const UserList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('users', 'list');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view users.</div>;
    }
    
    return (
        <List filters={filters}>
            <DataTable>
                <DataTable.Col source="name" />
                <DataTable.Col source="account_id">
                    <ReferenceField source="account_id" reference="accounts" />
                </DataTable.Col>
                
                <DataTable.Col source="address.street" />
                
                <DataTable.Col source="phone" />
                <DataTable.Col source="email">
                    <EmailField source="email" />
                </DataTable.Col>
                <DataTable.Col source="website" />
                
                <DataTable.Col source="company.name" />
                <DataTable.Col source="photo" />
                
            </DataTable>
        </List>
    );
};

export const UserShow = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('users', 'show');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view this user.</div>;
    }
    
    return (
        <Show title={<PageTitle />}>
            <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="account_id" reference="accounts" />
            
            <TextField source="phone" />
            <EmailField source="email" />
            <TextField source="website" />
           
            <TextField source="company.name" />

            <TextField source="address.street" />
            <TextField source="address.number" />
            <TextField source="address.neighborhood" />
            <TextField source="address.city" />
            <TextField source="address.state" />
            <TextField source="address.country" />
            <TextField source="address.zip_code" />
            <TextField source="photo" />
            
        </SimpleShowLayout>
            </Show>
);
};

export const UserEdit = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('users', 'edit');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to edit users.</div>;
    }
    
    return (
        <Edit title={<PageTitle />} >
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="email" validate={[required("ra.validation.email"), email()]} />
                <TextInput source="phone" validate={[required("ra.validation.phone"), number()]} />
                <TextInput source="website" />
                <TextInput source="company.name" defaultValue={''} />
                <TextInput source="address.street" defaultValue={''} />
                <TextInput source="address.number" defaultValue={''} />
                <TextInput source="address.neighborhood" defaultValue={''} />
                <TextInput source="address.city" defaultValue={''} />
                <TextInput source="address.state" defaultValue={''} />
                <TextInput source="address.country" defaultValue={''} />
                <TextInput source="address.zip_code" defaultValue={''} />
                <TextInput source="photo" />
            </SimpleForm>
        </Edit>
    );
};

export const UserCreate = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('users', 'create');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to create users.</div>;
    }
    
    return (
        <Create>
            <SimpleForm sanitizeEmptyValues={true}>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="email" validate={[required("ra.validation.email"), email()]} />
                <TextInput source="phone" validate={[required("ra.validation.phone"), number()]} />
                <TextInput source="website" />
                <TextInput source="company.name" defaultValue={''} />
                <TextInput source="address.street" defaultValue={''} />
                <TextInput source="address.number" defaultValue={''} />
                <TextInput source="address.neighborhood" defaultValue={''} />
                <TextInput source="address.city" defaultValue={''} />
                <TextInput source="address.state" defaultValue={''} />
                <TextInput source="address.country" defaultValue={''} />
                <TextInput source="address.zip_code" defaultValue={''} />
                <TextInput source="photo" />
            </SimpleForm>
        </Create>
    );
};



export default {
  list: UserList,
  edit: UserEdit,
  create: UserCreate,
  show: UserShow,
  icon: ManageAccountsIcon,
};
