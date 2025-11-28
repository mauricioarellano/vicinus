import { Create, DataTable, Edit, List, ReferenceField, ReferenceInput, required, SelectArrayInput, SelectInput, Show, SimpleForm, SimpleShowLayout, TextArrayField, TextField, TextInput, useRecordContext } from 'react-admin';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionsLoading } from '../components/PermissionsLoading';
import FilteredPropertiesInput from '../components/FilteredPropertiesInput';

const visitor_types = [
  { id: "guest", name: "resources.visitor_types.guest" },
  { id: "service", name: "resources.visitor_types.service" },
  { id: "delivery", name: "resources.visitor_types.delivery" },
  { id: "other", name: "resources.visitor_types.other" },
];

const daysOfWeek = [
  { id: "Monday", name: "resources.days.Monday" },
  { id: "Tuesday", name: "resources.days.Tuesday" },
  { id: "Wednesday", name: "resources.days.Wednesday" },
  { id: "Thursday", name: "resources.days.Thursday" },
  { id: "Friday", name: "resources.days.Friday" },
  { id: "Saturday", name: "resources.days.Saturday" },
  { id: "Sunday", name: "resources.days.Sunday" },
];

const PageTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.name}` : ''}</span>;
}

const filters = [
  <ReferenceInput source="account_id" reference="accounts" label="resources.visitors.filters.account" >
      <SelectInput optionText="name"/>
  </ReferenceInput>,
  <ReferenceInput source="property_id" reference="properties" label="resources.visitors.filters.property" >
      <SelectInput optionText="name"/>
  </ReferenceInput>,
  <TextInput source="name" label="resources.visitors.filters.name" />,
  <SelectInput source="visitor_type" choices={visitor_types} label="resources.visitors.filters.visitor_type" />,
  <TextInput source="plate" label="resources.visitors.filters.plate" />,
];

export const RecurrentVisitorList = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('recurrent_visitors', 'list');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view recurrent visitors.</div>;
    }
    
    return (
        <List filters={filters}>
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
                
                <DataTable.Col source="access_schedule.days">
                    <TextArrayField source="access_schedule.days" />
                </DataTable.Col>
                
            </DataTable>
        </List>
    );
};

export const RecurrentVisitorShow = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('recurrent_visitors', 'show');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to view this recurrent visitor.</div>;
    }
    
    return (
        <Show title={<PageTitle />} >
            <SimpleShowLayout>
                <ReferenceField source="property_id" reference="properties" />
                <ReferenceField source="account_id" reference="accounts" />
                <TextField source="name" />
                <TextField source="visitor_type" />
                <TextField source="identity_doc_photo" />
                <TextField source="plate" />
                <TextField source="plate_photo" />
                <TextArrayField source="access_schedule.days" />
                <TextField source="access_schedule.hours.entrance" />
                <TextField source="access_schedule.hours.exit" />
            </SimpleShowLayout>
        </Show>
    );
};

export const RecurrentVisitorEdit = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('recurrent_visitors', 'edit');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to edit recurrent visitors.</div>;
    }
    
    return (
        <Edit title={<PageTitle />} >
            <SimpleForm>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <FilteredPropertiesInput />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <SelectInput source="visitor_type"
                             choices={visitor_types}
                             validate={[required("ra.validation.visitor_type")]}
                />
                <TextInput source="identity_doc_photo" />
                <TextInput source="plate" />
                <TextInput source="plate_photo" />
                <SelectArrayInput source="access_schedule.days" choices={daysOfWeek} />
                <TextInput source="access_schedule.hours.entrance" />
                <TextInput source="access_schedule.hours.exit" />
                
            </SimpleForm>
        </Edit>
    );
};

export const RecurrentVisitorCreate = () => {
    const { canAccess } = usePermissions();
    const hasAccess = canAccess('recurrent_visitors', 'create');
    
    if (hasAccess === undefined) {
        return <PermissionsLoading />;
    }
    if (!hasAccess) {
        return <div>You don't have permission to create recurrent visitors.</div>;
    }
    
    return (
        <Create>
            <SimpleForm sanitizeEmptyValues={true}>
                <ReferenceInput source="account_id" reference="accounts" >
                    <SelectInput optionText="name" validate={[required("ra.validation.account")]} />
                </ReferenceInput>
                <FilteredPropertiesInput />
                <TextInput source="name" validate={[required("ra.validation.name")]} />
                <SelectInput source="visitor_type"
                             choices={visitor_types}
                             validate={[required("ra.validation.visitor_type")]}
                />
                <TextInput source="identity_doc_photo" />
                <TextInput source="plate" />
                <TextInput source="plate_photo" />
                <SelectArrayInput source="access_schedule.days" choices={daysOfWeek} />
                <TextInput source="access_schedule.hours.entrance" />
                <TextInput source="access_schedule.hours.exit" />
                
            </SimpleForm>
        </Create>
    );
};

export default {
    list: RecurrentVisitorList,
    edit: RecurrentVisitorEdit,
    show: RecurrentVisitorShow,
    create: RecurrentVisitorCreate,
    icon: PermContactCalendarIcon,
};
