import { ReferenceInput, SelectInput, required } from 'react-admin';
import { useWatch } from 'react-hook-form';

const FilteredPropertiesInput = (props: any) => {
    const accountId = useWatch({ name: 'account_id' }); // Watch the account_id field

    return (
        <ReferenceInput
            source="property_id"
            reference="properties"
            filter={accountId ? { account_id: accountId } : {}} // Apply filter if accountId exists
            {...props}
        >
            <SelectInput optionText="name" validate={[required("ra.validation.property")]} />
        </ReferenceInput>
    );
};

export default FilteredPropertiesInput;