import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./assets/components/Sidebar";
import Editor from "./assets/components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import {
	Note,
	NotesArray,
	FindCurrentNote,
	SetCurrentNoteId,
	DeleteNote,
	CreateNewNote,
	UpdateNote
} from "./config/types";

export default function App() {
	const getLocalNotes = () => {
		// Making our initial grab of local storage typesafe.
		const localNotes: string | null = localStorage.getItem("notes");
		if (localNotes) {
			return JSON.parse(localNotes);
		}
		if (!localNotes) {
			return [];
		}
	};

	const [notes, setNotes] = useState<NotesArray>(() => getLocalNotes());
	const [currentNoteId, setCurrentNoteId] = useState<Note["id"]>(
		(notes[0] && notes[0].id) || ""
	);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const createNewNote: CreateNewNote = function () {
		const newNote: Note = {
			id: nanoid(),
			body: "# Type your markdown note's title here"
		};
		setNotes((prevNotes): NotesArray => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	};

	const updateNote: UpdateNote = function (text) {
		// Puts the most recently-modified note at the top
		setNotes((oldNotes) => {
			const newArray: NotesArray = [];
			for (let i = 0; i < oldNotes.length; i++) {
				const oldNote = oldNotes[i];
				if (oldNote.id === currentNoteId) {
					newArray.unshift({ ...oldNote, body: text });
				} else {
					newArray.push(oldNote);
				}
			}
			return newArray;
		});
	};

	const deleteNote: DeleteNote = function (event, noteId) {
		event?.stopPropagation();
		console.log(event);
		setNotes((oldNotes) => {
			return oldNotes.filter((note) => note.id !== noteId && note);
		});
	};

	const findCurrentNote: FindCurrentNote = function () {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	};

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						deleteNote={deleteNote}
						newNote={createNewNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="first-note" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
