import {useNavigate} from "react-router-dom";
import {firebaseApp} from "../config.js";
import {collection, getFirestore, query} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useEffect, useState} from "react";
import '../index.css';

export default function SelectRoom(){
    const navigate=useNavigate();
    const [roomId, setRoomId]=useState('')
    const firestore = getFirestore(firebaseApp);
    const collectionRef = collection(firestore, "listCollections");
    const [list] = useCollection(query(collectionRef));
    // const  [temp, setTemp] = useState([]);
    // useEffect(()=>{
    //     list &&
    //     list.docs.reverse().map((msg) => (
    //         // temp.push(msg.data('text'))
    //         setTemp(e=>[...temp,msg.data('text')])
    //     ));
    // },[])

    let temp = []
    list &&
    list.docs.reverse().map((msg) => (
        temp.push(msg.data('text'))
    ));
    {console.log(temp)}
    function handleOnClick(){
        navigate(`/home/${roomId}`);
    }
    const handleOnClick2 = (e,room) =>{
        navigate(`/home/${room}`);
    }
    return(
        <div className="flex items-center justify-between w-full h-full">
            <div className="text-black w-2/4 h-full">
                <table className="table-auto w-3/4 bg-yellow-100">
                    <thead></thead>
                    <tbody>
                    {temp.map((msg) => (
                        <tr className="bg-yellow-100" onClick={e =>handleOnClick2(e,msg.text)} >
                    <td>{msg.text}</td>
                    </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        <div>
        <div className="flex flex-col w-80 h-[400px] bg-sky-200 border-2 border-gray-500 rounded-2xl items-center justify-center mr-72 my-auto
            "> <span className="text-3xl font-bold text-black mb-16">Enter Room Id:</span>
        <input type="text"
               value={roomId}
               placeholder={"Ex-messages"}
               onChange={e=> setRoomId(e.target.value)}
               className="bg-gray-100 mb-5 rounded-2xl w-52 h-9 p-2 text-black"
        />
            <button className=" bg-blue-100 border-2 border-gray-500
            rounded-xl w-20 h-10 p2 font-bold text-black hover:bg-sky-950 hover:text-white" onClick={handleOnClick}>submit</button>
        </div>
        </div>
        </div>
    )
}