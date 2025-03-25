import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Home from "./pages/user/home/Home";
import AdminGarbage from "./pages/admin/garbage/AdminGarbage";
import AdminUsers from "./pages/admin/users/AdminUsers";
import AdminTrucks from "./pages/admin/trucks/AdminTrucks";
import AdminInquiries from "./pages/admin/inquiries/AdminInquiries";
import AdminGarbageUpdate from "./pages/admin/garbage/AdminGarbageUpdate";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Profile from "./pages/user/profile/Profile";
import UserGarbageRequest from "./pages/user/profile/UserGarbageRequest";
import AdminInquiryUpdate from "./pages/admin/inquiries/AdminInquiryUpdate";
import UserInquiryRequest from "./pages/user/profile/UserInquiryRequest";
import UserNeighborhoodMap from "./pages/user/neighborhoodMap/NeighborhoodMap";
import UserDashbord from "./pages/user/profile/UserDashbord";
import AdminSchedules from "./pages/admin/schedules/AdminSchedules";
import TruckAuth from "./pages/user/truck/TruckAuth";
import DriverDashboard from "./pages/driver/pages/driverDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User Route */}
          <Route exact path="/" Component={Home} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/user/dashboard" Component={UserDashbord} />
          <Route
            exact
            path="/user/garbage-map"
            Component={UserNeighborhoodMap}
          />
          <Route exact path="/user/my-garbage" Component={UserGarbageRequest} />
          <Route exact path="/user/my-inquiry" Component={UserInquiryRequest} />
          <Route exact path="/user/profile" Component={Profile} />

          {/* Driver Route */}
          <Route exact path="/driver-login" Component={TruckAuth} />
          <Route exact path="/driver" Component={DriverDashboard} />

          {/* Admin Route */}
          <Route exact path="/admin" Component={Dashboard} />
          <Route exact path="/admin/garbage" Component={AdminGarbage} />
          <Route
            exact
            path="/admin/garbage/update"
            Component={AdminGarbageUpdate}
          />
          <Route exact path="/admin/users" Component={AdminUsers} />
          <Route exact path="/admin/trucks" Component={AdminTrucks} />
          <Route exact path="/admin/schedule" Component={AdminSchedules} />
          <Route exact path="/admin/inquiries" Component={AdminInquiries} />
          <Route
            exact
            path="/admin/inquiries/update"
            Component={AdminInquiryUpdate}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
