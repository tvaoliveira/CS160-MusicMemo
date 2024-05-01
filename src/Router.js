import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Library from './pages/Library.js';
import Sheet from './pages/Sheet.js';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/library" element={<Library />} />
        <Route path="/library/:sheet_id" element={<Sheet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;

