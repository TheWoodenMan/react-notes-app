import React, { ReactComponentElement, MouseEvent } from "react";
import reactLogo from "../react.svg";
import { Note, NotesArray } from "../../config/types";
import { SidebarProps } from "../../config/types";

export default function Sidebar(props: SidebarProps): JSX.Element {
	const noteElements = props.notes.map((note: Note) => (
		<div key={note.id}>
			<div
				className={`title ${
					note.id === props.currentNote.id ? "selected-note" : ""
				}`}
				onClick={() => props.setCurrentNoteId(note.id)}
			>
				<h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
				<button
					className="delete-btn"
					onClick={() => props.deleteNote(event, note.id)}
					// Your onClick event handler here
				>
					<i className="gg-trash trash-icon"></i>
				</button>
			</div>
		</div>
	));

	return (
		<section className="pane sidebar">
			<div className="sidebar--header">
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logoReact" alt="React logo" />
				</a>
				<h3>Notes</h3>
				<button className="new-note" onClick={props.newNote}>
					+
				</button>
			</div>
			{noteElements}
		</section>
	);
}
