import { DataTable, EmailField, List, SearchInput } from 'react-admin';

export const UserList = () => (
    <List sort={{field: "name", order: "ASC"}}
          title="User Management"
        //   filter={{website: 'ramiro.info'}}
          filters ={[
            <SearchInput source="q" alwaysOn />
          ]}
        //   aside={<div style={{ width: 200, margin: '1em' }}>Custom sidebar content</div>}
          >
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="username" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="address.street" />
            <DataTable.Col source="phone" />
            <DataTable.Col source="website" />
            <DataTable.Col source="company.name" />
        </DataTable>
    </List>
);
