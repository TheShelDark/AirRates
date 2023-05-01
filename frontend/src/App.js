import PageLayout from "./components/PageLayout";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import AirportView from "./components/AirportView";

function App() {
  return (
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/airport/:code" element={<AirportView />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
  );
}

export default App;
