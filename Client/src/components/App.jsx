import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./css/app.css"

function App() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);

  const [details, setDetails] = useState({
    title: "",
    content: ""
  })

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:4500/")
      .then(res => {
        if (res.data.status === "success") {
          setAuth(true)
          setUsername(res.data.username)
        } else {
          setAuth(false)
          setMessage(res.data.error)
        }
      })
      .then(err => console.log(err));
  }, [])

  const inputDetails = (event) => {
    setDetails(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const submitNote = () => {
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

  function logout() {
    Axios.get("http://localhost:4500/logout")
      .then(res => {
        window.location.reload(true);
      }).catch(err => console.log(err));
  }

  return (
    <div>
      {auth ? (
        <div>
          <header>
            <img src="assets/notes.png" alt="logo"></img>
            <h1>Note-Vault {username} <button type="submit" onClick={logout}>LOGOUT</button> </h1>
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
                <button onClick={() => { deleteNote(noteItem.id) }}>DELETE</button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="auth-heading">
          <h1>{message}</h1>
          <Link to="/" className="auth-login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default App;



  // const submitNote = () => {
  //  Axios.post("http://localhost:4500/note/insert", details);
  // };

  // const fetchNotes = async (token) => {
  //   try {
  //     const response = await Axios.get("http://localhost:4500/note/get", {
  //       headers: {
  //         'x-auth-token': token,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // };

  // useEffect(() => {
  //   Fetch notes when the component mounts
  //   const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
  //   fetchNotes(token)
  //     .then((data) => {
  //       setNotes(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching notes:', error);
  //     });
  // }, []); 