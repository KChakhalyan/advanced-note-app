import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Tag } from "./App";
import styles from "./NoteList.module.css";

type SimplifiedNote = {
   tags: Tag[];
   title: string;
   id: string;
};

type NoteListProp = {
   avalibleTags: Tag[];
   notes: SimplifiedNote[];
   onDeleteTag: (id: string) => void;
   onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProp = {
   show: boolean;
   avalibleTags: Tag[];
   handleClose: () => void;
   onDeleteTag: (id: string) => void;
   onUpdateTag: (id: string, label: string) => void;
};

const NoteList = ({ avalibleTags, notes, onDeleteTag, onUpdateTag }: NoteListProp) => {
   const [selectedTags, setSelectedtags] = useState<Tag[]>([]);
   const [title, setTitle] = useState("");
   const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

   const filteredNotes = useMemo(() => {
      return notes.filter((note) => {
         return (
            title === "" ||
            (note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
               (selectedTags.length === 0 ||
                  selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id))))
         );
      });
   }, [title, selectedTags, notes]);
   return (
      <>
         <Row className="align-items-center mb-4">
            <Col>
               <h1>Notes</h1>
            </Col>
            <Col xs="auto">
               <Stack gap={2} direction="horizontal">
                  <Link to="/new">
                     <Button variant="primary">Create</Button>
                  </Link>
                  <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">
                     Edit Tags
                  </Button>
               </Stack>
            </Col>
         </Row>
         <Form>
            <Row className="mb-4">
               <Col>
                  <Form.Group controlId="titlle">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group controlId="title">
                     <Form.Label>Tags</Form.Label>
                     <Select
                        value={selectedTags.map((tag) => {
                           return { label: tag.label, value: tag.id };
                        })}
                        options={avalibleTags.map((tag) => {
                           return { label: tag.label, value: tag.id };
                        })}
                        onChange={(tags) => {
                           setSelectedtags(
                              tags.map((tag) => {
                                 return { label: tag.label, id: tag.value };
                              })
                           );
                        }}
                        isMulti
                     />
                  </Form.Group>
               </Col>
            </Row>
         </Form>
         <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map((note) => (
               <Col key={note.id}>
                  <NoteCard id={note.id} title={note.title} tags={note.tags} />
               </Col>
            ))}
         </Row>
         <EditTagModal
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
            show={editTagsModalIsOpen}
            handleClose={() => setEditTagsModalIsOpen(false)}
            avalibleTags={avalibleTags}
         />
      </>
   );
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
   return (
      <Card
         as={Link}
         to={`/${id}`}
         className={`h-100 test-reset text-decoration-none ${styles.card}`}
      >
         <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
               <span className="fs-5">{title}</span>
               {tags.length > 0 && (
                  <Stack
                     gap={1}
                     direction="horizontal"
                     className="justify-content-center flex-wrap "
                  >
                     {tags.map((tag) => (
                        <Badge className="text-truncate" key={tag.id}>
                           {tag.label}
                        </Badge>
                     ))}
                  </Stack>
               )}
            </Stack>
         </Card.Body>
      </Card>
   );
}

function EditTagModal({
   avalibleTags,
   handleClose,
   show,
   onDeleteTag,
   onUpdateTag,
}: EditTagsModalProp) {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Stack gap={2}>
                  {avalibleTags.map((tag) => (
                     <Row key={tag.id}>
                        <Col>
                           <Form.Control
                              type="text"
                              value={tag.label}
                              onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                           />
                        </Col>
                        <Col sx="auto">
                           <Button onClick={() => onDeleteTag(tag.id)} variant="outline-danger">
                              &times;
                           </Button>
                        </Col>
                     </Row>
                  ))}
               </Stack>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default NoteList;
