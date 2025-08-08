import { Main, Navbar } from "./pages"

const App = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(0,50,165,0.8),rgba(255,255,255,0.8)),url('./assets/Trees.png')] bg-cover bg-center w-full p-4 py-6 ">
      <Navbar />
      <Main />
    </div>
  )
}

export default App