import {
    addDoc,
    collection,
    getFirestore,
    limit,
    orderBy,
    query,
} from "firebase/firestore";
import {auth, f} from "../config.js";
import {useEffect, useRef, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage.jsx";

export function ChatRoom() {
    const url = new URL(document.location.href);
    const room = url.searchParams.get('room') || 'messages';

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const firestore = getFirestore(f);
    const dummy = useRef();
    const messagesRef = collection(firestore, room);
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25));

    const [messages] = useCollection(q, {idField: "id"});

    const [formValue, setFormValue] = useState("");
    useEffect(()=>{
        executeScroll();
    },[messages]);
    const sendMessage = async (e) => {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: Date.now(),
            uid,
            photoURL,
        });

        setFormValue("");
        dummy.current.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="flex flex-col">
            <main className="flex flex-col">
                {messages &&
                    messages.docs.reverse().map((msg) => (
                        <ChatMessage key={msg.id} message={msg.data()}/>
                    ))}

                <span ref={dummy}></span>
            </main>

            <form className="flex" onSubmit={sendMessage}>
                <button className="ml-auto flex my-2  p-1.5 " type="submit" disabled={!formValue}>
                    🕊️
                </button>
                <input
                    ref={myRef}
                    className=" rounded-2xl py-1.5 px-2 m-2 flex bg-white border-2 border-black
                    text-black min-w-fit"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something nice"
                />
            </form>
        </div>
    );
}
