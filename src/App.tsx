import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { i18nProvider } from "./providers/i18nProvider";
import { dataProvider, authProvider } from "./providers/dataProvider.firebase";
import accounts from "./resources/Accounts";
import properties from "./resources/Properties";
import users from "./resources/Users";
import fees from "./resources/Fees";
import visitors from "./resources/Visitors";
import recurrent_visitors from "./resources/RecurrentVisitors";
import residents from "./resources/Residents";
import { usePermissions } from "./hooks/usePermissions";

// Conditional Resource wrapper component that checks permissions before rendering
const ConditionalResource = ({ name, ...props }: { name: string; [key: string]: any }) => {
  const { canAccess } = usePermissions();
  
  if (!canAccess(name, 'list')) {
    return null;
  }
  
  return <Resource name={name} {...props} />;
};

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <ConditionalResource name="accounts" {...accounts} />
    <ConditionalResource name="properties" {...properties} />
    <ConditionalResource name="residents" {...residents} />
    <ConditionalResource name="users" {...users} />
    <ConditionalResource name="fees" {...fees} />
    <ConditionalResource name="visitors" {...visitors} />
    <ConditionalResource name="recurrent_visitors" {...recurrent_visitors} />

  </Admin>
);
