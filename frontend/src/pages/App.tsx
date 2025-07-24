import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Connect from "./Connect";
import Home from "./Home";
import SpotifyAuth from "./SpotifyAuth";

function App() {
    return (
        <Routes>
            <Route path="/" Component={Connect} />
            <Route path="/home" Component={Home} />
            <Route path="/spotify-auth" Component={SpotifyAuth} />
        </Routes>
    );
}

export default App;
