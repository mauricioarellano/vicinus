import {
  Create,
  DataTable,
  DateField,
  DateTimeInput,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import { usePermissions } from "../hooks/usePermissions";
import { PermissionsLoading } from "../components/PermissionsLoading";

const PageTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `${record.name}` : ""}</span>;
};

export const VisitorList = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("visitors", "list");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to view visitors.</div>;
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
        <DataTable.Col source="visitor_type" />
        <DataTable.Col source="identity_doc_photo" />
        <DataTable.Col source="plate" />
        <DataTable.Col source="plate_photo" />
        <DataTable.Col source="entrance_date">
          <DateField source="entrance_date" />
        </DataTable.Col>
        <DataTable.Col source="exit_date">
          <DateField source="exit_date" />
        </DataTable.Col>
        <DataTable.Col source="recurrent_visitor_id">
          <ReferenceField
            source="recurrent_visitor_id"
            reference="recurrent_visitors"
          />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

export const VisitorShow = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("visitors", "show");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to view this visitor.</div>;
  }

  return (
    <Show title={<PageTitle />}>
      <SimpleShowLayout>
        <ReferenceField source="account_id" reference="accounts" />
        <ReferenceField source="property_id" reference="properties" />
        <TextField source="name" />
        <TextField source="visitor_type" />
        <TextField source="identity_doc_photo" />
        <TextField source="plate" />
        <TextField source="plate_photo" />
        <DateField source="entrance_date" />
        <DateField source="exit_date" />
        <ReferenceField
          source="recurrent_visitor_id"
          reference="recurrent_visitors"
        />
      </SimpleShowLayout>
    </Show>
  );
};

export const VisitorEdit = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("visitors", "edit");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to edit visitors.</div>;
  }

  return (
    <Edit title={<PageTitle />}>
      <SimpleForm>
        <ReferenceInput source="account_id" reference="accounts" />
        <ReferenceInput source="property_id" reference="properties" />
        <TextInput source="name" />
        <TextInput source="visitor_type" />
        <TextInput source="identity_doc_photo" />
        <TextInput source="plate" />
        <TextInput source="plate_photo" />
        <DateTimeInput source="entrance_date" />
        <DateTimeInput source="exit_date" />
        <ReferenceInput
          source="recurrent_visitor_id"
          reference="recurrent_visitors"
        />
      </SimpleForm>
    </Edit>
  );
};

export const VisitorCreate = () => {
  const { canAccess } = usePermissions();
  const hasAccess = canAccess("visitors", "create");

  if (hasAccess === undefined) {
    return <PermissionsLoading />;
  }
  if (!hasAccess) {
    return <div>You don't have permission to create visitors.</div>;
  }

  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="account_id" reference="accounts" />
        <ReferenceInput source="property_id" reference="properties" />
        <TextInput source="name" />
        <TextInput source="visitor_type" />
        <TextInput source="identity_doc_photo" />
        <TextInput source="plate" />
        <TextInput source="plate_photo" />
        <DateTimeInput source="entrance_date" />
        <DateTimeInput source="exit_date" />
        <ReferenceInput
          source="recurrent_visitor_id"
          reference="recurrent_visitors"
        />
      </SimpleForm>
    </Create>
  );
};

export default {
  list: VisitorList,
  edit: VisitorEdit,
  create: VisitorCreate,
  show: VisitorShow,
  icon: CarCrashIcon,
};
