import {useAuthState} from "react-firebase-hooks/auth";
import {createContext} from "react";
import "./App.css";
import {SignIn, SignOut} from "./components/Auth.jsx";
import {auth} from "./config.js";
import {ChatRoom} from "./components/ChatRoom.jsx";

// const analytics = firebase.analytics();
export const UserContext = createContext("")

function App() {
    const [user] = useAuthState(auth);
    return (
        //min-h-fit h-screen
        <div className="flex flex-col App mx-[250px] h-screen pb-2 bg-amber-100">
            <header className="flex flex-col items-center bg-amber-950">
                <div className="w-fit m-5 text-5xl">⚛️🔥💬</div>
                {user?<SignOut />:<SignIn/>}
            </header>
            {user && <UserContext.Provider value={user}>
                <div className="flex flex-col flex-auto overflow-auto">
                    <ChatRoom/>
                </div>
            </UserContext.Provider>}
        </div>
    );
}

export default App;
