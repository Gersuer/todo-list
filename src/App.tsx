import './App.css'
import { FormEvent, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import Header from './components/header/Header';
import Tasks from './components/tasks/Tasks';

export interface TasksProps {
  id: number
  task: string
  background: string
}

function App() {
  const [task, setTask] = useState('');
  const lista: TasksProps[] = [];
  const [atividades, setAtividades] = useState<TasksProps[]>([]);

  function handleTask(e: FormEvent) {
    e.preventDefault();
    if (task === '') {
      alert('Digite uma tarefa.');
      return
    }
    if (!localStorage.getItem('tasks')) {
      const tarefa = {
        id: Math.floor(Math.random() * (10000 - 500)) + 1,
        task:  task[0].toUpperCase()  + task.substring(1),
        background: 'white'
      }
      lista.push(tarefa);
      localStorage.setItem('tasks', JSON.stringify(lista));
      setAtividades(lista);
    } else {
      const novaLista = JSON.parse(localStorage.getItem('tasks')!);
      const tarefa = {
        id: Math.floor(Math.random() * (10000 + 1000)) + 1,
        task:  task[0].toUpperCase()  + task.substring(1),
        background: 'white'
      }
      novaLista.push(tarefa);
      localStorage.setItem('tasks', JSON.stringify(novaLista));
      setAtividades(novaLista);
    }
    setTask('');
  }

  return (
    <div className='container'>
      <Header />
      <div className='form_container'>
        <form
          className='form'
          onSubmit={handleTask}
        >
          <label className='input_container'>
            <input
              type="text"
              placeholder="Digite uma tarefa"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </label>
          <button type='submit' >
            <GoArrowRight className='icon' />
          </button>
        </form >
      </div>
      <div className='task_container'>
        <Tasks atividades={atividades} />
      </div>
    </div>
  )
}

export default App
