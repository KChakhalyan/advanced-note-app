import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
   onSubmit: (data: NoteData) => void;
   onAddTag: (tag: Tag) => void;
   avalibleTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, avalibleTags }: NewNoteProps) => {
   return (
      <>
         <h1 className="mb-4">New Note</h1>
         <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} avalibleTags={avalibleTags} />
      </>
   );
};
export default NewNote;
