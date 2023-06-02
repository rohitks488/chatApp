import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config.js";

export function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <>
            <button className="rounded-2xl text-1xl border-2 border-white h-fit w-fit px-2 py-1 m-5
      hover:border-black hover:bg-white hover:text-black hover:font-bold text-xl" onClick={signInWithGoogle}>
                Sign in
            </button>
            <p>
                Do not violate the community guidelines or you will be banned for life!
            </p>
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
