import Calendar from "./components/calendar"
import sidebars from "./components/sidebar"

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">
      <sidebars />
      <Calendar />
      
    </div>
  )
}

export default App
