import {useAuthState} from "react-firebase-hooks/auth";
import {createContext, useEffect} from "react";
import "./App.css";
import {SignIn, SignOut} from "./components/Auth.jsx";
import {auth} from "./config.js";
import {ChatRoom} from "./components/ChatRoom.jsx";
import {Routes, Route, useNavigate, useParams} from "react-router-dom";
import Room from "./components/Room.jsx";
import Help from "./components/Help.jsx";

// const analytics = firebase.analytics();
export const UserContext = createContext("")

function App() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
            if (!loading) {
                if (user) {
                    if (!window.location.pathname.startsWith("/chatApp/home"))
                        navigate("/home");
                } else {
                    navigate("/sign-in")
                }
            }
        }, [user, loading]
    )
    return (
        <div className="flex flex-col items-center">
            <UserContext.Provider value={user}>
                <Routes>
                    <Route path="/home/*" element={<Room/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
