import { Create, DataTable, Edit, EmailField, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

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
        <List>
            <DataTable>
                <DataTable.Col source="name" />
                <DataTable.Col source="account_id">
                    <ReferenceField source="account_id" reference="accounts" />
                </DataTable.Col>
                <DataTable.Col source="username" />
                
                <DataTable.Col source="address.street" />
                
                <DataTable.Col source="phone" />
                <DataTable.Col source="email">
                    <EmailField source="email" />
                </DataTable.Col>
                <DataTable.Col source="website" />
                
                <DataTable.Col source="company.name" />
                <DataTable.Col source="photo">
                    <DateField source="photo" />
                </DataTable.Col>
                
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
                <TextField source="username" />
                <ReferenceField source="account_id" reference="accounts" />
                
                <TextField source="phone" />
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="website" />
            
            <DataTable.Col source="company.name" />
            <DataTable.Col source="photo" />
            
        </DataTable>
    </List>
);

export const UserShow = () => (
    <Show title={<PageTitle />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="username" />
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
                <TextInput source="name" />
                <TextInput source="username" />
                <ReferenceInput source="account_id" reference="accounts" />
                
                <TextInput source="phone" />
                <TextInput source="email" />
                <TextInput source="website" />
               
                <TextInput source="company.name" />

                <TextInput source="address.street" />
                <TextInput source="address.number" />
                <TextInput source="address.neighborhood" />
                <TextInput source="address.city" />
                <TextInput source="address.state" />
                <TextInput source="address.country" />
                <TextInput source="address.zip_code" />
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
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="username" />
                <ReferenceInput source="account_id" reference="accounts" />
                
                <TextInput source="phone" />
                <TextInput source="email" />
                <TextInput source="website" />
               
                <TextInput source="company.name" />

                <TextInput source="address.street" />
                <TextInput source="address.number" />
                <TextInput source="address.neighborhood" />
                <TextInput source="address.city" />
                <TextInput source="address.state" />
                <TextInput source="address.country" />
                <TextInput source="address.zip_code" />
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
