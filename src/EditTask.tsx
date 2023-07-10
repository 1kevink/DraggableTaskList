import { TaskData } from './App';
import { TaskForm } from './TaskForm';
import { useTask } from './TaskLayout';

type EditTaskProps = {
  onSubmit: (id: string, data: TaskData) => void
}

export const EditTask = ({ onSubmit} : EditTaskProps ) => {
  const task = useTask();
  return (
    <>
      <h1 className="mb-4">Edit Task</h1>
      <TaskForm 
        title={task.title}
        status={task.status}
        description={task.description}
        onSubmit={data => onSubmit(task.id, data)}
      />
    </>
  )
}
