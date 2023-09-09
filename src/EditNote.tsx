import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
   onSubmit: (id: string, data: NoteData) => void;
   onAddTag: (tag: Tag) => void;
   avalibleTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, avalibleTags }: EditNoteProps) => {
   const note = useNote();
   return (
      <>
         <h1 className="mb-4">Edit Note</h1>
         <NoteForm
            title={note.title}
            markdown={note.markdown}
            tags={note.tags}
            onSubmit={(data) => onSubmit(note.id, data)}
            onAddTag={onAddTag}
            avalibleTags={avalibleTags}
         />
      </>
   );
};
export default EditNote;
