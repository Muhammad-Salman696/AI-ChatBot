import { useState } from "react";

export default function ChatBox (){
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async (msg) => {
        if (msg.trim() !== "") {
            setMessages((prevMessages) => [...prevMessages, { role: 'user', content: msg }]);
            setMessage(""); // Clear the input field after sending

        try {
            const res = await fetch('/api/chat', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'},
                body : JSON.stringify({ message: msg })
            })
            const data = await res.json();
            setMessages((prevMessages) => [...prevMessages, { role: 'ai', content: data.reply }]);
        }
        catch (error) {
            console.error('Error talking to AI:', error);
        }    
    }
}

    return (
        <>
            <div className="chat-box">
                <ul>
                    {messages.map((msg, index) =>{
                        return(
                            <li key={index} className={msg.role === 'user' ? 'user-query' : 'ai-response'}>
                                <p>{msg.content}</p>
                            </li>
                        )
                    })}
                </ul>

                <input 
                type="text"
                placeholder="Enter your question!"
                onChange={(e)=> setMessage(e.target.value)} 
                value={message}
                />


                <button
                onClick={()=>handleSend(message)}>
                     Send </button>
            </div>
        </>
         
    )
}