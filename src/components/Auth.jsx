import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config.js";

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };
   // bg-gradient-to-r from-indigo-500 via-sky-400 to-blue-500
    return (
        <div className={"flex flex-col w-full h-screen bg-[url('../public/front4.png')] m-"}>
            {/*<div className={"flex text-7xl mt-80 ml-20 font-bold"}>CHAT APP</div>*/}
            <button className="bg-gray-700 rounded-2xl ml-[1150px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1
            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white" onClick={signInWithGoogle}>
                Sign in with google
            </button>
        </div>
    );
}

export function SignOut() {
    return (
        auth.currentUser && (
            <button className="rounded-2xl flex text-1xl border-2 border-white h-fit w-fit px-2 py-1 m-5
      hover:border-black hover:bg-white hover:text-black hover:font-bold text-xl"
                    onClick={() => auth.signOut()}>
                Sign Out
            </button>
        )
    );
}
