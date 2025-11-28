import {
  Create,
  DataTable,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  SelectField,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { usePermissions } from "../hooks/usePermissions";
import { PermissionsLoading } from "../components/PermissionsLoading";
import PaymentsIcon from '@mui/icons-material/Payments';
import FilteredPropertiesInput from "../components/FilteredPropertiesInput";

const fee_statuses = [
  { id: "pending", name: "resources.fee_statuses.pending" },
  { id: "paid", name: "resources.fee_statuses.paid" },
  { id: "overdue", name: "resources.fee_statuses.overdue" },
  { id: "validated", name: "resources.fee_statuses.validated" },
];

const PageTitle = () => {
  const record = useRecordContext();
  const title = record
    ? `${record.period_year}` + `-` + `${record.period_month}`
    : "";
  return <span>{title}</span>;
};

const filters = [
  <TextInput source="period_year" label="resources.fees.filters.period_year" />,
  <TextInput source="period_month" label="resources.fees.filters.period_month" />,
  <SelectInput source="status" choices={fee_statuses} label="resources.fees.filters.status" />,
  <ReferenceInput source="account_id" reference="accounts" label="resources.fees.filters.account" >
      <SelectInput optionText="name"/>
  </ReferenceInput>,
  <ReferenceInput source="property_id" reference="properties" label="resources.fees.filters.property" alwaysOn={true} >
      <SelectInput optionText="name"/>
  </ReferenceInput>,
];

export const FeeList = () => {
  const translate = useTranslate();
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("fees", "list");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to view fees.</div>;
  }

  return (
    <List filters={filters}>
      <DataTable>
        <DataTable.Col source="account_id">
          <ReferenceField source="account_id" reference="accounts" />
        </DataTable.Col>
        <DataTable.Col source="Property">
          <ReferenceField source="property_id" reference="properties" />
        </DataTable.Col>
        <DataTable.Col source="period_year" />
        <DataTable.Col source="period_month" />
        <DataTable.NumberCol source="amount" />
        <DataTable.Col source="status" 
                       render={record => translate(`resources.fee_statuses.${record.status}`)}
        />
        <DataTable.Col source="payment_date">
          <DateField source="payment_date" />
        </DataTable.Col>
        <DataTable.Col source="validation_date">
          <DateField source="validation_date" />
        </DataTable.Col>
        <DataTable.Col source="payment_receipt" />
      </DataTable>
    </List>
  );
};

export const FeeShow = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("fees", "show");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to view this fee.</div>;
  }

  return (
    <Show title={<PageTitle />}>
      <SimpleShowLayout>
        <ReferenceField source="account_id" reference="accounts" />
        <ReferenceField source="property_id" reference="properties" />
        <TextField source="period_year" />
        <TextField source="period_month" />
        <NumberField source="amount" />
        <DateField source="payment_date" />
        <TextField source="payment_receipt" />
        <SelectField source="status" choices={fee_statuses} translateChoice={true} />
        <DateField source="validation_date" />
      </SimpleShowLayout>
    </Show>
  );
};

export const FeeEdit = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("fees", "edit");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to edit fees.</div>;
  }

  return (
    <Edit title={<PageTitle />}>
      <SimpleForm sanitizeEmptyValues={true}>
        <ReferenceInput source="account_id" reference="accounts" >
            <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
        </ReferenceInput>
        <FilteredPropertiesInput />
        <TextInput source="period_year" />
        <TextInput source="period_month" />
        <NumberInput source="amount" />
        <DateInput source="payment_date" />
        <TextInput source="payment_receipt" />
        <SelectInput source="status"
                            choices={fee_statuses}
                            translateChoice={true}
                            validate={[required("ra.validation.status")]}
                        />
        <DateInput source="validation_date" />
      </SimpleForm>
    </Edit>
  );
};

export const FeeCreate = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("fees", "create");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to create fees.</div>;
  }

  return (
    <Create>
      <SimpleForm sanitizeEmptyValues={true}>
        <ReferenceInput source="account_id" reference="accounts" >
            <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
        </ReferenceInput>
        <FilteredPropertiesInput />
        <TextInput source="period_year" validate={[required("ra.validation.period_year")]} />
        <TextInput source="period_month" validate={[required("ra.validation.period_month")]} />
        <NumberInput source="amount" validate={[required("ra.validation.amount")]} />
        <DateInput source="payment_date" />
        <TextInput source="payment_receipt" />
        <SelectInput source="status"
                            choices={fee_statuses}
                            translateChoice={true}
                            validate={[required("ra.validation.status")]}
                        />
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
  icon: PaymentsIcon,
};
