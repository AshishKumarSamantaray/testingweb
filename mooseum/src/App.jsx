import { Outlet } from "react-router-dom"
import Nav from "./frontendComponents/Nav"
import ChatBot from "./screens/ChatBot"
import PreLoader from "./frontendComponents/PreLoader"
function App() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default App