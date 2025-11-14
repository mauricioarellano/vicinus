import { Create, TabbedForm, TextInput } from 'react-admin';
import { Stack } from "@mui/material";

export const UserCreate = () => (
    <Create title={"Create User"}
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
    </Create>
);
