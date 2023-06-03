import {
    addDoc,
    collection,
    getFirestore,
    limit,
    orderBy,
    query,
    getDocs,
    startAfter,
} from "firebase/firestore";
import {auth, f} from "../config.js";
import {useEffect, useRef, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage.jsx";

export function ChatRoom() {
    const myElementRef=useRef(null);
    const [messages, setMessages] = useState([]);
    const [positionTop, setPositionTop] = useState(0);
    const url = new URL(document.location.href);
    const room = url.searchParams.get('room') || 'messages1';

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const firestore = getFirestore(f);
    const dummy = useRef();
    const messagesRef = collection(firestore, room);
    const li=25;
    const q =(createdAt=9999999999999)=> query(messagesRef, orderBy("createdAt", "desc"),
        startAfter(createdAt), limit(li));
    async function getNext() {
        const docSnap = await getDocs(q(messages[0].data().createdAt));
        console.log(messages[0].data(), messages[0].createdAt)
        setMessages([...docSnap.docs.reverse(),...messages]);
    }
    const [batch] = useCollection(q(), {idField: "id"});

    const [formValue, setFormValue] = useState("");
    useEffect(()=>{
        dummy.current.scrollIntoView();
        },[messages]);
    useEffect(()=>{
        setMessages([...messages.slice(0,-li+1),...(batch?.docs||[]).reverse()])
    },[batch])


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
    const handleScroll = () => {
        const el = myElementRef.current;
        setPositionTop(el.scrollTop);
    };
    return (
        <>
            <button
                    onClick={getNext}
                    className="border-2 border-black text-black">load more</button>
            <main
                ref={myElementRef}
                // onScroll={handleScroll}
                className="flex flex-col px-2 overflow-auto">
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg.data()}/>
                    ))}

                <span ref={dummy}></span>
            </main>

            <form className="flex" onSubmit={sendMessage}>
                <textarea
                    rows={(formValue.length>100)?2:1}
                    className="w-full rounded-2xl py-1.5 px-2 m-2 flex bg-white border-2 border-black
                    text-black min-w-fit"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something nice"
                />
                <button className="mr-auto flex my-2  p-1.5 " type="submit" disabled={!formValue}>
                    🕊️
                </button>
            </form>
        </>
    );
}
