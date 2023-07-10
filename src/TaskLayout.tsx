import { useParams, Navigate, Outlet, useOutletContext } from "react-router-dom"
import { Task } from "./App"

type TaskLayoutProps = {
  tasks: Task[],
}
export const TaskLayout = ({ tasks } : TaskLayoutProps) => {
  const { id } = useParams();
  const task = tasks.find(t => id === t.id);

  if (task == null) return <Navigate to="/" replace/>

  return <Outlet context={task} />
}

//using context to share current task with childs
export const useTask = () => {
  return useOutletContext<Task>()
}