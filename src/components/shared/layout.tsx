import { Outlet } from "react-router-dom"
import { Container } from "./container"
import { Header } from "components/widgets/header"

export const Layout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Container>
          <Header />
          <main className="flex flex-col gap-10 grow">
            <Outlet />
          </main>
        </Container>
      </div>
    </>
  )
}