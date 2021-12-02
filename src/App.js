import Landing from "./Components/Landing/Landing.js"
import Competition from "./Components/Competition/Competition.js"
import Rankings from "./Components/Rankings/Rankings.js"
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="competition" element={<Competition />} />
        <Route path="rankings" element={<Rankings />} />
    </Routes>
  </main>
  );
}

export default App;
