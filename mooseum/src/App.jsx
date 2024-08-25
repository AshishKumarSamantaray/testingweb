import { Outlet } from "react-router-dom"
import Nav from "./frontendComponents/Nav"
function App() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}

export default App