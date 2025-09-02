import { Layout } from "components/shared/layout"
import { HomePage } from "pages/home-page"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./i18n"

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}