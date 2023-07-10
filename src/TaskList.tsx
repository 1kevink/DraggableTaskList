import { useMemo, useState } from 'react';
import { Form, Stack, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Task } from './App';
import { observer } from 'mobx-react-lite'
import TasksStore from "./store/tasks";
import styles from './TaskList.module.css';

type TaskListProps= {
  tasks: Task[]
}

type SimplifiedTask = {
  title: string,
  status: string,
  id: string,
  index: number,
  endPos: number,
  setEndPos: (pos: number) => void
}

export const TaskList = ({ tasks } : TaskListProps) => {
  const [title, setTitle] = useState('');
  const [status, setStatus]  = useState('All')
  const [endPos, setEndPos] = useState(0)

  //filtering tasks by title and status
  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>{
      return (status === "All" || task.status === status)
    })
      .filter(task =>{
        return (title === "" || task.title.toLowerCase().includes(title.toLocaleLowerCase()))
      })
  }, [title, tasks, status])

  const openedCount = useMemo(() => {
    return tasks.filter(task => task.status === "Opened").length;
  }, [tasks])
  const closedCount = tasks.length - openedCount;

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Tasks</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
           <Form.Group controlId="status">
             <Form.Label>Status</Form.Label>
             <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
               <option>Opened</option>
               <option>Closed</option>
               <option>All</option>
             </Form.Select>
           </Form.Group>
         </Col>
        </Row>
      </Form>
      <Stack gap={2} className="mb-4">
        <div>Opened task count: {openedCount}</div>
        <div>Closed task count: {closedCount}</div>
      </Stack>
      <Stack gap={2}>
        {filteredTasks.map((task,index) => (         
            <TaskCard
              title={task.title}
              id={task.id}
              status={task.status}
              index={index}
              setEndPos={setEndPos}
              endPos={endPos}
            />
          
        ))}
      </Stack>
    </>
  )
}

const TaskCard = observer(( {title, id, status, index, setEndPos, endPos }: SimplifiedTask) => {
  const { setTasks, tasks } = TasksStore;
  const [startPos, setStartPos] = useState(0)

  const handleSort = () => {
    //duplicate items
    const _tasks = [...tasks];

    //remove and save the dragged item content
    const draggedItemContent = _tasks.splice(startPos, 1)[0];

    //switch the position
    _tasks.splice(endPos, 0, draggedItemContent);

    //update the actual array
    setTasks(_tasks);
  };

  return (
    <Card
     draggable
     as={Link}
     to={`/${id}`}
     onDragStart={()=> setStartPos(index)}
     onDragEnter={() => setEndPos(index)}
     onDragEnd={() => handleSort()}
     onDragOver={(e) => e.preventDefault()}
     className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} direction="horizontal">
          <span className='fs-5 text-truncate'>{title}</span>
          <Badge className={`ms-auto ${status === 'Closed' ? 'bg-danger' : 'bg-success'}`}>{status}</Badge>
        </Stack>

      </Card.Body>
    </Card>
  )
})