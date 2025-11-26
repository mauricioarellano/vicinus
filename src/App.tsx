import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { i18nProvider } from "./providers/i18nProvider";
import { dataProvider, authProvider } from "./providers/dataProvider.firebase";
import accounts from "./resources/Accounts";
import properties from "./resources/Properties";
import users from "./resources/Users";
import fees from "./resources/Fees";
import fee_amounts from "./resources/FeeAmounts";
import visitors from "./resources/Visitors";
import recurrent_visitors from "./resources/RecurrentVisitors";
import residents from "./resources/Residents";
import roles from "./resources/Roles";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource name="accounts" {...accounts} />
    <Resource name="properties" {...properties} />
    <Resource name="residents" {...residents} />
    <Resource name="users" {...users} />
    <Resource name="fees" {...fees} />
    <Resource name="fee_amounts" {...fee_amounts} />
    <Resource name="visitors" {...visitors} />
    <Resource name="recurrent_visitors" {...recurrent_visitors} />
    <Resource name="roles" {...roles} />

  </Admin>
);
