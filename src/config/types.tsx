export type Note = {
	body: string;
	id: string;
};

export type NotesArray = Note[];
export type FindCurrentNote = () => Note;
export type SetCurrentNoteId = (arg: string) => void;
export type DeleteNote = (event: Event | undefined, noteId: Note["id"]) => void;
export type CreateNewNote = () => void;
export type UpdateNote = (text: string) => NotesArray | void;

export type SidebarProps = {
	notes: NotesArray;
	currentNote: Note;
	setCurrentNoteId: SetCurrentNoteId;
	deleteNote: DeleteNote;
	newNote: CreateNewNote;
};
