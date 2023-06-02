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
        <div className="App mx-[250px] h-screen pb-8 overflow-y-auto bg-amber-100">
            <header className="sticky top-0 flex flex-1 flex-col justify-center items-center bg-amber-950">
                <div className=" relative w-fit m-5 text-5xl">⚛️🔥💬</div>
                <SignOut />
            </header>
            <UserContext.Provider value={user}>
                <section>{user ? <ChatRoom/> : <SignIn/>}</section>
            </UserContext.Provider>
        </div>
    );
}

export default App;
