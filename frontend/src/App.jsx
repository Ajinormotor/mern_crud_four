import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const HomeWrapper = lazy(() => import('./pages/HomePage.jsx'))

function App() {
  return (
    <div className="">
      <ToastContainer />

<Routes>
  <Route  index element={
    <Suspense>
      <HomeWrapper  />
    </Suspense>
  }

  />
</Routes>
    </div>
  )
}

export default App
