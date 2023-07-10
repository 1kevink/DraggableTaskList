import { FormEvent, useRef } from 'react';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { TaskData } from './App';

//onSubmit is reqired prop, while TaskData is needed only for edit
type TaskFormProps = {
  onSubmit: (data : TaskData) => void
} & Partial<TaskData>

export const TaskForm = ({ onSubmit, title="", description="", status=""}: TaskFormProps ) => {

  const titleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      status: statusRef.current!.value,
    })

    //navigate back after submit
    navigate("..");
  }

  return (
   <Form onSubmit={handleSubmit}>
     <Stack gap={4}>
       <Row>
         <Col>
           <Form.Group controlId="title">
             <Form.Label>Title</Form.Label>
               <Form.Control ref={titleRef} required defaultValue={title}/>
           </Form.Group>
         </Col>
         <Col>
           <Form.Group controlId="status">
             <Form.Label>Status</Form.Label>
             <Form.Select ref={statusRef} required defaultValue={status}>
               <option>Opened</option>
               <option>Closed</option>
             </Form.Select>
           </Form.Group>
         </Col>
       </Row>
       <Form.Group controlId="description">
         <Form.Label>Description</Form.Label>
         <Form.Control ref={descriptionRef} required as="textarea" rows={10} defaultValue={description}/>
       </Form.Group>
       <Stack direction="horizontal" gap={2} className='justify-content-end'>
         <Button type="submit" variant="primary">Save</Button>
         <Link to="..">
           <Button type="button" variant="outline-secondary">Cancel</Button>
         </Link>
        </Stack>
     </Stack>

   </Form>
  )
}