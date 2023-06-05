import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config.js";

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };
   // bg-gradient-to-r from-indigo-500 via-sky-400 to-blue-500
    return (
        <>
            <div className="text-6xl font-bold pt-10">CHAT APP</div>
        <div className="flex flex-col items-center justify-center w-96 h-[450px]
        bg-gradient-to-r from-cyan-500 to-blue-500
          mt-10 rounded-xl border-4 border-gray-600">
            <span className="mb-10 text-black font-bold text-3xl ">New to App?</span>
            <button className="flex bg-gray-700 rounded-2xl  text-1xl border-2 border-white h-fit w-fit px-3 py-1 m-1
            hover:border-black hover:bg-white hover:text-black hover:font-bold text-xl text-white" onClick={signInWithGoogle}>
                Sign in with google
            </button>
        </div>
        </>
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
