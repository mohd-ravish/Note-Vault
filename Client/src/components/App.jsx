import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./css/app.css"

function App() {

  const [details, setDetails] = useState({
    title: "",
    content: ""
  })

  const inputDetails = (event) => {
    setDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const [notes, setNotes] = useState([]);

  const submitNote = (event) => {
    if (details.title !== "" && details.content !== "") {
    Axios.post("http://localhost:4500/note/insert", details);
    };
  };

  useEffect(() => {
    Axios.get("http://localhost:4500/note/get").then((Response) => {
      setNotes(Response.data)
    });
  }, []);

  

  const deleteNote = (value) => {
    Axios.delete("http://localhost:4500/note/delete/" + value);
    window.location.reload(false)
  };

  const navigate = useNavigate();

  function logout(){
    navigate("/");
  }

  return (
    <div>
      <header>
        <img src="assets/notes.png"></img>
        <h1>Note-Vault <button type="submit" onClick={logout}>LOGOUT</button> </h1>
      </header>
      <div>
        <form className="inputArea">
          <input
            name="title"
            type="text"
            onChange={inputDetails}
            placeholder="Title"
            required />
          <textarea
            name="content"
            type="text"
            onChange={inputDetails}
            placeholder="Take a note..."
            rows="3"
            required />
          <button onClick={() => { submitNote() }}>+</button>
        </form>
      </div>
      {notes.map((noteItem) => {
        return (
          <div className="note">
            <h1>{noteItem.title}</h1>
            <p>{noteItem.content}</p>
            <button onClick={() => { deleteNote(noteItem.c_id) }}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;