import "./App.css";

import { AuthContext } from "./context/AuthContext";
import { useLocalStorage } from "./hook/localStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateBook from "./components/CreateBook/CreateBook";
import CreateAuthor from "./components/CreateAuthor/CreateAuthor";
import Catalog from "./components/Catalog/Catalog";
import Details from "./components/Details/Details"

import { GuestGuard } from "./guards/GuestGuard";
import { UserGuard } from "./guards/UserGuard";

function App() {
  const [user, setUser] = useLocalStorage("userData", {});

  const setUserSession = (data) => {
    setUser({ ...data });
  };

  return (
    <AuthContext.Provider value={{ setUserSession, user }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalog/details/:id" element={<Details />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route element={<GuestGuard />}>
             <Route path="/add-book" element={<CreateBook />}></Route>
             <Route path="/add-author" element={<CreateAuthor />}></Route>
          </Route>
          <Route element={<UserGuard />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
