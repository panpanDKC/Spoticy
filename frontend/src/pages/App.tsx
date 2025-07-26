import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Connect from "./Connect";
import Home from "./Home";
import SpotifyAuth from "./SpotifyAuth";
import {
    SPOTICY_CONNECT_URL,
    SPOTICY_HOME_URL,
    SPOTICY_SPOTIFY_AUTH_URL,
} from "../const";
import NextDeparture from "./NextDeparture";

function App() {
    return (
        <Routes>
            <Route path="/" element={<NextDeparture />} />
            <Route path={SPOTICY_CONNECT_URL} Component={Connect} />
            <Route path={SPOTICY_HOME_URL} Component={Home} />
            <Route path={SPOTICY_SPOTIFY_AUTH_URL} Component={SpotifyAuth} />
        </Routes>
    );
}

export default App;
