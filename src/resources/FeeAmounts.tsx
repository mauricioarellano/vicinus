import { Create, DataTable, Edit, List, NumberField, NumberInput, ReferenceField, ReferenceInput, Show, SimpleForm, SimpleShowLayout } from 'react-admin';
import PaidIcon from '@mui/icons-material/Paid';

export const FeeAmountList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="account_id">
                <ReferenceField source="account_id" reference="accounts" />
            </DataTable.Col>
            <DataTable.NumberCol source="amount" />
        </DataTable>
    </List>
);

export const FeeAmountShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="account_id" reference="accounts" />
            <NumberField source="amount" />
        </SimpleShowLayout>
    </Show>
);

export const FeeAmountEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <NumberInput source="amount" />
        </SimpleForm>
    </Edit>
);

export const FeeAmountCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="account_id" reference="accounts" />
            <NumberInput source="amount" />
        </SimpleForm>
    </Create>
);

export default {
  list: FeeAmountList,
  create: FeeAmountCreate,
  edit: FeeAmountEdit,
  show: FeeAmountShow,
  icon: PaidIcon,
};
