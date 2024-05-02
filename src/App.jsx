import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "./page";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="w-screen h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
