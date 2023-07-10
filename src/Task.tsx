import { Row, Col, Stack, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useTask } from "./TaskLayout";

type TaskProps = {
  onDelete: (id: string) => void
}

export const Task = ({ onDelete }: TaskProps) => {
  const task = useTask();
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="text-truncate">{task.title}</h1>
          <Badge className={`ms-auto ${task.status === 'Closed' ? 'bg-danger' : 'bg-success'}`}>{task.status}</Badge>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${task.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(task.id)
                navigate("/")
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div>{task.description}</div>
    </>
  )
}