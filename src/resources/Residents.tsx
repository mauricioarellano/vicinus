import { Create, DataTable, Edit, EmailField, List, ReferenceField, ReferenceInput, required, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import FilteredPropertiesInput from "../components/FilteredPropertiesInput";
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';
import GroupsIcon from '@mui/icons-material/Groups';

const icon = GroupsIcon;

export const ResidentList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('residents', 'list');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view residents.</div>;
    }
    
    return (
        <List>
            <DataTable>
                <DataTable.Col source="account_id">
                    <ReferenceField source="account_id" reference="accounts" />
                </DataTable.Col>
                <DataTable.Col source="property_id">
                    <ReferenceField source="property_id" reference="properties" />
                </DataTable.Col>
                <DataTable.Col source="name" />
                <DataTable.Col source="phone" />
                <DataTable.Col source="email">
                    <EmailField source="email" />
                </DataTable.Col>
                <DataTable.Col source="photo" />
                
            </DataTable>
        </List>
    );
};

export const ResidentShow = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('residents', 'show');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view this resident.</div>;
    }
    
    return (
        <Show>
            <SimpleShowLayout>
                <ReferenceField source="account_id" reference="accounts" />
                <ReferenceField source="property_id" reference="properties" />
                <TextField source="name" />
                <TextField source="phone" />
                <EmailField source="email" />
                <TextField source="photo" />
            </SimpleShowLayout>
        </Show>
    );
};

export const ResidentEdit = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('residents', 'edit');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to edit residents.</div>;
    }
    
    return (
        <Edit>
            <SimpleForm sanitizeEmptyValues={true}>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <FilteredPropertiesInput />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="phone" />
                <TextInput source="email" />
                <TextInput source="photo" />
            </SimpleForm>
        </Edit>
    );
};

export const ResidentCreate = (props: any) => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('residents', 'create');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to create residents.</div>;
    }
    
    return (
        <Create {...props}>
            <SimpleForm sanitizeEmptyValues={true}>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <FilteredPropertiesInput />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <TextInput source="phone" />
                <TextInput source="email" />
                <TextInput source="photo" />
            </SimpleForm>
        </Create>
    );
};

export default {
  list: ResidentList,
  create: ResidentCreate,
  edit: ResidentEdit,
  show: ResidentShow,
  icon: icon,
};
