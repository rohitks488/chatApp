import {useRef, useState} from 'react'
import { initializeApp}  from 'firebase/app'
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { getFirestore, collection, orderBy, query, limit, addDoc } from 'firebase/firestore';

import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";
import {useCollection, useCollectionData} from "react-firebase-hooks/firestore";

const f=initializeApp({
    apiKey: "AIzaSyDtNSPBiMLwnyZmzw70XfmMhwsCOVa-uec",
    authDomain: "chatapp-8c813.firebaseapp.com",
    projectId: "chatapp-8c813",
    storageBucket: "chatapp-8c813.appspot.com",
    messagingSenderId: "1034272552088",
    appId: "1:1034272552088:web:09c9df0bd61b6cda2b8ced"
})
import './App.css'

const auth = getAuth(f);
const firestore = getFirestore(f);
// const analytics = firebase.analytics();

function App() {

    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <header>
                <h1>⚛️🔥💬</h1>
                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>

        </div>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}


function ChatRoom() {
    const firestore=getFirestore(f);
    const dummy = useRef();
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(25));

    const [messages] = useCollection(q, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: Date.now(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main>

            {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}

            <span ref={dummy}></span>

        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}


export default App;