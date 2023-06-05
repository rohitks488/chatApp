import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SelectRoom(){
    const navigate=useNavigate();
    const [roomId, setRoomId]=useState('')

    function handleOnClick(){
        navigate(`/home/${roomId}`);
    }
    return(
        <div className="flex items-center justify-center my-auto">
        <div className="flex flex-col w-80 h-[400px] bg-sky-200 border-2 border-gray-500 rounded-2xl items-center justify-center
            "> <span className="text-3xl font-bold text-black mb-16">Enter Room Id:</span>
        <input type="text"
               value={roomId}
               placeholder={"message"}
               onChange={e=> setRoomId(e.target.value)}
               className="bg-gray-100 mb-5 rounded-2xl w-52 h-9 p-2 text-black"
        />
            <button className=" bg-blue-100 border-2 border-gray-500
            rounded-xl w-20 h-10 p2 font-bold text-black hover:bg-sky-950 hover:text-white" onClick={handleOnClick}>submit</button>
        </div>
        </div>
    )
}