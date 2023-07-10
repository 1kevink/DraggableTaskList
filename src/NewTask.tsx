import { TaskData } from './App';
import { TaskForm } from './TaskForm';

type NewTaskProps = {
  onSubmit: (data: TaskData) => void
}

export const NewTask = ({ onSubmit} : NewTaskProps ) => {
  return (
    <>
      <h1 className="mb-4">New Task</h1>
      <TaskForm onSubmit={onSubmit}/>
    </>
  )
}
