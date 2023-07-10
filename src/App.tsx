import "bootstrap/dist/css/bootstrap.css"
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { NewTask } from "./NewTask";
import { TaskList } from "./TaskList";
import { TaskLayout } from "./TaskLayout";
import { Task } from "./Task";
import { EditTask } from "./EditTask";
import TasksStore from "./store/tasks";

export type Task = {
  id: string,
} & TaskData

export type TaskData = {
  title: string,
  description: string,
  status: string
}

const App = observer(() => {
  const { tasks, addTask, editTask, deleteTask } = TasksStore;

  const onCreateTask = (data: TaskData) => {
    addTask(data)
  }

  const onEditTask = (id: string, data: TaskData) => {
    editTask(id,data)
  }

  const onDeleteTask = (id: string) => {
    deleteTask(id)
  }
  
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks}/>} />
        <Route path="/new" element={<NewTask onSubmit={onCreateTask} />} />
        <Route path="/:id" element={<TaskLayout tasks={tasks} />}>
          <Route index element={<Task onDelete={onDeleteTask}/>} />
          <Route path="edit" element={<EditTask onSubmit={onEditTask}/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
})

export default App
