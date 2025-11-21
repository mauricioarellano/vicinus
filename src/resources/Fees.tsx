import { Create, DataTable, DateField, DateInput, Edit, List, NumberField, NumberInput, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useRecordContext } from 'react-admin';
import OrderIcon from "@mui/icons-material/AttachMoney";
import { usePermissions } from '../hooks/usePermissions';

const PageTitle = () => {
    const record = useRecordContext();
    const title = record ? `${record.period_year}` + `-` + `${record.period_month}` : '';
    return <span>{title}</span>;
}

export const FeeList = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('fees', 'list')) {
        return <div>You don't have permission to view fees.</div>;
    }
    
    return (
        <List>
            <DataTable>
                <DataTable.Col source="account_id">
                    <ReferenceField source="account_id" reference="accounts" />
                </DataTable.Col>
                <DataTable.Col source="Property">
                    <ReferenceField source="property_id" reference="properties" />
                </DataTable.Col>
                <DataTable.Col source="user_id">
                    <ReferenceField source="user_id" reference="users" />
                </DataTable.Col>
                <DataTable.Col source="period_year" />
                <DataTable.Col source="period_month" />
                <DataTable.NumberCol source="amount" />
                <DataTable.Col source="payment_receipt" />
                <DataTable.Col source="payment_date">
                    <DateField source="payment_date" />
                </DataTable.Col>
                <DataTable.Col source="status" />
                <DataTable.Col source="validation_date">
                    <DateField source="validation_date" />
                </DataTable.Col>
                
            </DataTable>
        </List>
    );
};

export const FeeShow = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('fees', 'show')) {
        return <div>You don't have permission to view this fee.</div>;
    }
    
    return (
        <Show title={<PageTitle />} >
            <SimpleShowLayout>
                <ReferenceField source="account_id" reference="accounts" />
                <ReferenceField source="property_id" reference="properties" />
                <ReferenceField source="user_id" reference="users" />
                <TextField source="period_year" />
                <TextField source="period_month" />
                <NumberField source="amount" />
                <DateField source="payment_date" />
                <TextField source="payment_receipt" />
                <TextField source="status" />
                <DateField source="validation_date" />
            </SimpleShowLayout>
        </Show>
    );
};

export const FeeEdit = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('fees', 'edit')) {
        return <div>You don't have permission to edit fees.</div>;
    }
    
    return (
        <Edit title={<PageTitle />} >
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <ReferenceInput source="property_id" reference="properties" />
                <ReferenceInput source="user_id" reference="users" />
                <TextInput source="period_year" />
                <TextInput source="period_month" />
                <NumberInput source="amount" />
                <DateInput source="payment_date" />
                <TextInput source="payment_receipt" />
                <TextInput source="status" />
                <DateInput source="validation_date" />
            </SimpleForm>
        </Edit>
    );
};

export const FeeCreate = () => {
    const { canAccess } = usePermissions();
    
    if (!canAccess('fees', 'create')) {
        return <div>You don't have permission to create fees.</div>;
    }
    
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" />
                <ReferenceInput source="property_id" reference="properties" />
                <ReferenceInput source="user_id" reference="users" />
                <TextInput source="period_year" />
                <TextInput source="period_month" />
                <NumberInput source="amount" />
                <DateInput source="payment_date" />
                <TextInput source="payment_receipt" />
                <TextInput source="status" />
                <DateInput source="validation_date" />
            </SimpleForm>
        </Create>
    );
};

export default {
  list: FeeList,
  create: FeeCreate,
  edit: FeeEdit,
  show: FeeShow,
  icon: OrderIcon,
};
