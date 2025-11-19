import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider, authProvider } from "./dataProvider.firebase";
import { AccountList, AccountShow, AccountEdit, AccountCreate } from "./resources/Accounts";
import { PropertyCreate, PropertyEdit, PropertyList, PropertyShow } from "./resources/Properties";
import { UserCreate, UserEdit, UserList, UserShow } from "./resources/Users";
import { FeeCreate, FeeEdit, FeeList, FeeShow } from "./resources/Fees";
import { VisitorCreate, VisitorEdit, VisitorList, VisitorShow } from "./resources/Visitors";
import { RecurrentVisitorCreate, RecurrentVisitorEdit, RecurrentVisitorList, RecurrentVisitorShow } from "./resources/RecurrentVisitors";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="accounts"
      list={AccountList}
      create={AccountCreate}
      edit={AccountEdit}
      show={AccountShow}
    />
    <Resource
      name="properties"
      list={PropertyList}
      edit={PropertyEdit}
      show={PropertyShow}
      create={PropertyCreate}
    />
    <Resource
      name="residents"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      create={UserCreate}
    />
    <Resource
      name="fees"
      list={FeeList}
      edit={FeeEdit}
      show={FeeShow}
      create={FeeCreate}
    />
    <Resource
      name="visitors"
      list={VisitorList}
      edit={VisitorEdit}
      show={VisitorShow}
      create={VisitorCreate}
    />
    <Resource
      name="recurrent_visitors"
      list={RecurrentVisitorList}
      edit={RecurrentVisitorEdit}
      show={RecurrentVisitorShow}
      create={RecurrentVisitorCreate}
    />

  </Admin>
);
