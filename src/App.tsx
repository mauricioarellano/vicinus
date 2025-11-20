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
import { AccountList, AccountShow, AccountEdit, AccountCreate } from "./resources/Accounts";
import { PropertyCreate, PropertyEdit, PropertyList, PropertyShow } from "./resources/Properties";
import { UserCreate, UserEdit, UserList, UserShow } from "./resources/Users";
import { FeeCreate, FeeEdit, FeeList, FeeShow } from "./resources/Fees";
import { VisitorCreate, VisitorEdit, VisitorList, VisitorShow } from "./resources/Visitors";
import { RecurrentVisitorCreate, RecurrentVisitorEdit, RecurrentVisitorList, RecurrentVisitorShow } from "./resources/RecurrentVisitors";
import { ResidentCreate, ResidentEdit, ResidentList, ResidentShow } from "./resources/Residents";

import CustomerIcon from "@mui/icons-material/People";
import OrderIcon from "@mui/icons-material/AttachMoney";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ApartmentIcon from "@mui/icons-material/Apartment";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="accounts"
      list={AccountList}
      create={AccountCreate}
      edit={AccountEdit}
      show={AccountShow}
      icon={ApartmentIcon}
    />
    <Resource
      name="properties"
      list={PropertyList}
      edit={PropertyEdit}
      show={PropertyShow}
      create={PropertyCreate}
      icon={MapsHomeWorkIcon}
    />
    <Resource
      name="residents"
      list={ResidentList}
      edit={ResidentEdit}
      show={ResidentShow}
      create={ResidentCreate}
      icon={CustomerIcon}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      create={UserCreate}
      icon={ManageAccountsIcon}
    />
    <Resource
      name="fees"
      list={FeeList}
      edit={FeeEdit}
      show={FeeShow}
      create={FeeCreate}
      icon={OrderIcon}
    />
    <Resource
      name="visitors"
      list={VisitorList}
      edit={VisitorEdit}
      show={VisitorShow}
      create={VisitorCreate}
      icon={CarCrashIcon}
    />
    <Resource
      name="recurrent_visitors"
      list={RecurrentVisitorList}
      edit={RecurrentVisitorEdit}
      show={RecurrentVisitorShow}
      create={RecurrentVisitorCreate}
      icon={PermContactCalendarIcon}
    />

  </Admin>
);
