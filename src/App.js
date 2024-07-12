import React from "react";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Reservation from "./Pages/Reservation";
import PrivateRoute from "./Components/PrivateRoute";
import AddInventory from "./Pages/AddInventory";
import Toolbar from "./Components/Toolbar";


class App extends React.Component {
  render() {
    return (
      <div>
        {localStorage.getItem("token") && <Toolbar/>}
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/reservation" exact element={<PrivateRoute><Reservation /></PrivateRoute>} />
          <Route path="/add-inventory" exact element={<PrivateRoute><AddInventory /></PrivateRoute>} />
        </Routes>
      </div>
    )
  }
}


export default App;