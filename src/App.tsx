import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
// import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Auth from "./components/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        {/* Protected routes begin */}
        <Route element={<Auth />}>
          <Route path="/c/:id" element={<Chat />} />
        </Route>
        {/* Protected routes end */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
