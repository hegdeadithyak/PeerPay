import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Bottombutton } from "./components/bottombutton";
// import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />  */}
          {/* <Route path="/send" element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>
      
      <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
        <h1 className="text-4xl text-white font-bold">Welcome to PeerPay</h1>
        <p className="text-lg text-slate-200 my-4 text-center">
          A peer-to-peer payment system for the modern world.
          </p>
      </div>
      <div className="absolute top-12 right-12">
        <Bottombutton
          label="Sign Up"
          onClick={() => {
            window.location.href = "/signup";
          }}
        />
      </div>
    </>
  );
}

export default App;
