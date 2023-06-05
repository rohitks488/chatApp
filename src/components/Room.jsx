import {SignIn, SignOut} from "./Auth.jsx";
import {ChatRoom} from "./ChatRoom.jsx";
import {UserContext} from "../App.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../config.js";
import {Route, Routes, useParams} from "react-router-dom";
import {useContext} from "react";
import SelectRoom from "./SelectRoom.jsx";
export default function Room(){
    const user=useContext(UserContext);
    return user && (
        <>
        <div className="flex flex-col App mx-auto w-3/4 h-screen pb-2 bg-[url('../public/69.jpg')]">
            <header className="flex flex-col items-center bg-gradient-to-t from-cyan-200 to-cyan-700">
                <div className="w-fit m-1 text-2xl">⚛️🔥💬</div>
                {user?<SignOut />:null}
            </header>
                <div className="flex flex-col flex-auto overflow-auto ">
                    <Routes>
                        <Route index element={<SelectRoom/>}/>
                        <Route path=":roomId" element={<ChatRoom/>}/>
                    </Routes>
                </div>
        </div>
        </>
    )
}