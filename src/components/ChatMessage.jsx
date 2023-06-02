import { auth } from "../config.js";
import {useContext} from "react";
import {UserContext} from "../App.jsx";
export default function ChatMessage(props) {
  const user=useContext(UserContext);
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <>
      <div className={`${user.uid===uid? "pl-2 ml-auto flex-row-reverse " : "mr-auto pr-2"} message
       ${messageClass} m-2 flex  bg-gray-700 rounded-2xl w-fit }`}>
        <img
          className={`${user.uid===uid? "ml-2" : "mr-2"} 
          w-6 h-6 flex flex-wrap  rounded-full`}
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="text-1xl">{text}</p>
      </div>
    </>
  );
}
