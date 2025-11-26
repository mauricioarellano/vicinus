import { Create, DataTable, Edit, EmailField, List, required, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, UrlField, useRecordContext } from 'react-admin';
import ApartmentIcon from "@mui/icons-material/Apartment";

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

export const AccountList = () => (
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

export const AccountShow = () => (
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
            <TextField source="phone" />
            <EmailField source="email" />
            <UrlField source="website" />
        </SimpleShowLayout>
    </Show>
);

export const AccountEdit = () => (
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
            <TextInput source="phone" type="tel" />
            <TextInput source="email" type="email" />
            <TextInput source="website" />
        </SimpleForm>
    </Edit>
);

export const AccountCreate = () => (
    <Create>
        <SimpleForm sanitizeEmptyValues={true}>
            <TextInput source="name" validate={[required("ra.validation.name")]} />
            <TextInput source="condo_type" validate={[required("ra.validation.condo_type")]} />
            <TextInput source="address.street" defaultValue={''}/>
            <TextInput source="address.number" defaultValue={''}/>
            <TextInput source="address.neighborhood" defaultValue={''}/>
            <TextInput source="address.city" defaultValue={''}/>
            <TextInput source="address.state" defaultValue={''}/>
            <TextInput source="address.country" defaultValue={''}/>
            <TextInput source="address.zip_code" defaultValue={''}/>
            <TextInput source="phone" type="tel" />
            <TextInput source="email" type="email" />
            <TextInput source="website" />
        </SimpleForm>
    </Create>
);

export default {
  list: AccountList,
  create: AccountCreate,
  edit: AccountEdit,
  show: AccountShow,
  icon: ApartmentIcon,
};
