import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider, authProvider } from "./dataProvider.firebase";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { UserShow } from "./UserShow";
import { UserCreate } from "./UserCreate";
import { AccountList, AccountShow, AccountEdit, AccountCreate } from "./resources/Accounts";
import { PropertyCreate, PropertyEdit, PropertyList, PropertyShow } from "./resources/Properties";


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
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="fees"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="visitors"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="recurrent_visitors"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    
    {/* <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      create={UserCreate}
    /> */}
    
    
  </Admin>
);
