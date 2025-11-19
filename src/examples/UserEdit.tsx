import { Edit, SimpleForm, TabbedForm, TextInput, useRecordContext } from 'react-admin';
import { Stack } from "@mui/material";

const PageTitle = () => {
    const record = useRecordContext();
    return <span>Edit User {record ? `"${record.name}"` : ''}</span>;
}

export const UserEdit = () => (
    <Edit title={<PageTitle />}
        mutationMode='pessimistic'
    >
        <TabbedForm>
            <TabbedForm.Tab label="Main">
                <TextInput source="name" />
                <TextInput source="username" />
                <TextInput source="email" />
                <TextInput source="address.street" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Address">
                <Stack direction="row" spacing={2}>
                    <TextInput source="phone" />
                    <TextInput source="website" />
                    <TextInput source="company.name" />
                </Stack>
            </TabbedForm.Tab>
        </TabbedForm>

        {/* <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <TextInput source="address.street" />
            <Stack direction="row" spacing={2}>
                <TextInput source="phone" />
                <TextInput source="website" />
                <TextInput source="company.name" />
            </Stack>
        </SimpleForm> */}
    </Edit>
);
