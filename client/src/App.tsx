import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";


export default function App(){

return(

<BrowserRouter>

<Navbar/>


<main>

<Routes>

<Route
path="/"
element={<Home/>}
/>


<Route
path="/history"
element={<History/>}
/>


<Route
path="/settings"
element={<Settings/>}
/>


</Routes>

</main>


</BrowserRouter>

)

}