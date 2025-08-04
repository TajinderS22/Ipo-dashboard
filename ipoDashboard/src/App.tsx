import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router"
import Authentication from "./components/admin/Authentication"
import Panel from "./components/admin/Panel"
import { ModalProvider } from "./components/utils/ModelContextProvider"
import Ipos from "./components/Ipos"


function App() {
  

  return (
    <>
    <ModalProvider>
      <RouterProvider router={routes}>

      </RouterProvider>
    </ModalProvider>

    </>
  )
}


const routes=createBrowserRouter([
  {
    path:"/ipos",
    element:<Ipos/>
  },{
    path:"/authentication",
    element:<Authentication/>
  },{
    path:"/panel",
    element:<Panel/>
  }
])

export default App
