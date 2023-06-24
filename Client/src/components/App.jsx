import React, { useState, useEffect } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import Axios from "axios";

function App() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([]);

  function submitNote(event) {
    Axios.post("http://localhost:4500/", {
      title: title,
      content: content,
    });

    // setNotes([
    //   ...notes,
    //   {
    //     title: title,
    //     content: content,
    //   },
    // ]);
    // setTitle("");
    // setContent("");
    // event.preventDefault();
  };

  useEffect(() => {
    Axios.get("http://localhost:4500/").then((Response) => {
      setNotes(Response.data)
    });
  }, []);

  // const deleteNote = (titleVal) => {
  //   Axios.delete(`http://localhost:4500/${titleVal}`);
  // };

  const deleteNote = (title) => {
    // Axios.delete(`http://localhost:4500/${titleVal}`);
    Axios.delete("http://localhost:4500/" + title);
    window.location.reload(false)
  };

  // function addNote(newNote) {
  //   setNotes(prevNotes => {
  //     return [...prevNotes, newNote];
  //   });
  // }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }

  return (
    <div>
      <Header />
      <div>
        <form>
          <input
            name="title"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            // value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            type="text"
            required
            onChange={(e) => {
              setContent(e.target.value)
            }}
            // value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <button onClick={submitNote}>+</button>
        </form>
      </div>
      {notes.map((noteItem) => {
        return (
          <div className="note">
            <h1>{noteItem.title}</h1>
            <p>{noteItem.content}</p>
            <button onClick={() => {deleteNote(noteItem.title)}}>DELETE</button>
          </div>
        );
      })}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
