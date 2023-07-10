import { makeAutoObservable } from 'mobx';
import { Task, TaskData } from '../App';
import { v4 as uuidV4 } from 'uuid';

class TasksStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  setTasks = (newTasks: Task[]) => {
    this.tasks = newTasks.slice();
  }

  addTask = (data: TaskData) => {
    this.tasks.push({...data, id: uuidV4()})
  }
  
  deleteTask = (id: string) => {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  //change tasks data when we find it in array by id
  editTask = (id: string, data: TaskData) => {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return { ...task, ...data }
      } else {
        return task
      }
    })
  }
}

export default  new TasksStore();