import { BooleanField, BooleanInput, Create, DataTable, Edit, EmailField, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const icon = SupervisedUserCircleIcon;

export const RoleList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="account_id">
                <ReferenceField source="account_id" reference="accounts" />
            </DataTable.Col>
            <DataTable.Col source="role" />
            <DataTable.Col source="is_active">
                <BooleanField source="is_active" />
            </DataTable.Col>
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const RoleShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="account_id" reference="accounts" />
            <TextField source="role" />
            <BooleanField source="is_active" />
            <EmailField source="email" />
        </SimpleShowLayout>
    </Show>
);

export const RoleEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="account_id" reference="accounts" />
            <TextInput source="name" />
            <TextInput source="role" />
            <TextInput source="email" />
            <BooleanInput source="is_active" />
        </SimpleForm>
    </Edit>
);

export const RoleCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="account_id" reference="accounts" />
            <TextInput source="name" />
            <TextInput source="role" />
            <TextInput source="email" />
            <BooleanInput source="is_active" />
        </SimpleForm>
    </Create>
);

export default {
  list: RoleList,
  edit: RoleEdit,
  create: RoleCreate,
  show: RoleShow,
  icon: icon,
};