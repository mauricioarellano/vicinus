import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout } from 'react-admin';
import CustomerIcon from "@mui/icons-material/People";
import { usePermissions } from '../hooks/usePermissions';

export const ResidentList = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('residents', 'list')) {
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
                <DataTable.Col source="user_id">
                    <ReferenceField source="user_id" reference="users" />
                </DataTable.Col>
                
            </DataTable>
        </List>
    );
};

export const ResidentShow = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('residents', 'show')) {
        return <div>You don't have permission to view this resident.</div>;
    }
    
    return (
        <Show>
            <SimpleShowLayout>
                <ReferenceField source="account_id" reference="accounts" />
                <ReferenceField source="property_id" reference="properties" />
                <ReferenceField source="user_id" reference="users" />
            </SimpleShowLayout>
        </Show>
    );
};

export const ResidentEdit = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('residents', 'edit')) {
        return <div>You don't have permission to edit residents.</div>;
    }
    
    return (
        <Edit>
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <ReferenceInput source="property_id" reference="properties" />
                <ReferenceInput source="user_id" reference="users" />
            </SimpleForm>
        </Edit>
    );
};

export const ResidentCreate = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('residents', 'create')) {
        return <div>You don't have permission to create residents.</div>;
    }
    
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <ReferenceInput source="property_id" reference="properties" />
                <ReferenceInput source="user_id" reference="users" />
            </SimpleForm>
        </Create>
    );
};

export default {
  list: ResidentList,
  create: ResidentCreate,
  edit: ResidentEdit,
  show: ResidentShow,
  icon: CustomerIcon,
};
