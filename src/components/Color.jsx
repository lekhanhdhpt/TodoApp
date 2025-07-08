import React from "react";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
  const { selectedNote, notes, setNotes } = useContext(NoteContext);

  const changColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.$id === selectedNote.$id
      );

      const updateNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updateNote;
      setNotes(newNotes);

      db.notes.update(selectedNote.$id, { colors: JSON.stringify(color) });
    } catch (error) {
      console.log(error);
      alert("Chọn Note trước khi thay đổi màu");
    }
  };

  return (
    <div
      className="color"
      onClick={changColor}
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;
