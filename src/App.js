import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil"
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Page404 from "./pages/Page404";

function App() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [teams, setTeams] = useState({})


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <RecoilRoot>
      <div className="App h-screen">
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <div className="h-full flex px-6 md:space-x-8">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/team/:team_name" element={<TeamDetail />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </Router>
        )}
      </div>
    </RecoilRoot>
  );
}

export default App;
