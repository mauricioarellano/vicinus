import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { UserList } from "./UserList";
import { UserEdit } from "./UserEdit";
import { UserShow } from "./UserShow";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="comments"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
    />
    <Resource
      name="todos"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />

    <Resource
      name="products"
      list={() => <div>Product List</div>}
      edit={() => <div>Edit Product</div>}
      create={() => <div>Create Product</div>}
      show={() => <div>Show Product</div>}
    />
    
  </Admin>
);
