import { ReferenceInput, SelectInput } from 'react-admin';
import { useWatch } from 'react-hook-form';

const FilteredRecurrentVisitorsInput = (props: any) => {
    const accountId = useWatch({ name: 'account_id' }); // Watch the account_id field
    const propertyId = useWatch({ name: 'property_id' }); // Watch the property_id field

    return (
        <ReferenceInput
            source="recurrent_visitor_id"
            reference="recurrent_visitors"
            filter={accountId && propertyId ? { account_id: accountId, property_id: propertyId } : accountId ? { account_id: accountId } : {}} // Apply filter if accountId and propertyId exist
            {...props}
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
    );
};

export default FilteredRecurrentVisitorsInput;