
import './App.css';
import { Route, Routes, } from 'react-router-dom';
import MenuList from './component/MenuList';
import AddMenu from './component/AddMenu';
import Home from './component/Home';
import Login from './component/Login';
import Category from './component/Category';
import Order from './component/Order';
import ConfirmOrder from './component/ConfirmOrder';
import Success from './component/Success';
import Map from './component/Map';
import Schedule from './component/Schedule';
import SelectTable from './component/SelectTable';
import DetailOrder from './component/DetailOrder';
import Bill from './component/Bill';


import MenuSearch from './component/MenuSearch';

import Dashboard from './component/Dashboard';
import CustomerManage from './component/CustomerManage';
import DetailCustomer from './component/DetailCustomer';
import User from './component/User';
import AddUser from './component/AddUser';
import Role from './component/Role';
import AddRole from './component/AddRole';
import SideBarr from './component/SideBarr';
import Edit from './component/Edit';
import HistoryBill from './component/HistoryBill';

import PrintOrder from './component/PrintOrder';


function App() {
  return (
    <div className="App">
     <>
     <Routes>
<Route path='/menu' element={<MenuList/>}/>
<Route path='/add-menu' element={<AddMenu/>}></Route>
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/add-category' element={<Category/>}></Route>
<Route path="/order" element={<Order/>}></Route>
<Route path="/confirm-order" element={<ConfirmOrder/>}></Route>
<Route path="/success-order" element={<Success/>}></Route>
<Route path="/map" element={<Map/>}></Route>
<Route path="/schedule" element={<Schedule/>}></Route>
<Route path="/select-table/:id" element={<SelectTable/>}></Route>
<Route path="/detailOrder/:id" element={<DetailOrder/>}></Route>
<Route path='/bill'element={<Bill/>} ></Route>
<Route path='/dashboard' element={<Dashboard/>}></Route>
<Route path="/search/:value" element={<MenuSearch/>}></Route>
<Route path="/add-user" element={<AddUser/>}></Route>
<Route path="/add-role" element={<AddRole/>}></Route>
<Route path="/user" element={<User/>}></Route>
<Route path="/detailCustomer/:id" element={<DetailCustomer/>}></Route>
<Route path="/role" element={<Role/>}></Route>
<Route path='/customer-manage' element={<CustomerManage/>}></Route>
<Route path="/history" element={<HistoryBill/>}></Route>
<Route path="/edit/:id" element={<Edit/>}></Route>
<Route path="/printBill/:id" element={<PrintOrder/>}></Route>
</Routes>
</>
    </div>
  );
}

export default App;
