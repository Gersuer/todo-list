import styles from './Tasks.module.css'
import { MdDelete } from 'react-icons/md'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import { useState, useEffect } from 'react'

interface TasksProps {
    id: number
    task: string
    background: string
}

interface AtivProps {
    atividades: TasksProps[]
}

const Tasks = ({ atividades }: AtivProps) => {

    const [tasks, setTasks] = useState(atividades);

    useEffect(() => {
        if (localStorage.getItem('tasks')) {
            setTasks(JSON.parse(localStorage.getItem('tasks')!))
        }
    }, [atividades]);

    const handleCheck = (id: number) => {
        const alterado = tasks;
        alterado.map(item => {
            if (item.id === id) {
                if (item.background === '#b3fabf') {
                    item.background = 'white';
                } else {
                    item.background = '#b3fabf';
                }
            }
        })
        localStorage.setItem('tasks', JSON.stringify(alterado));
        setTasks(JSON.parse(localStorage.getItem('tasks')!));
    }

    const handleDelete = (id: number) => {
        const deletado = tasks.filter(task => (task.id !== id));
        localStorage.setItem('tasks', JSON.stringify(deletado));
        setTasks(JSON.parse(localStorage.getItem('tasks') || ''));
    }

    return (
        <div className={styles.tasks_container}>
            {tasks && tasks.map(task => (
                <div
                    className={styles.task_container}
                    style={{ background: `${task.background}` }}

                >
                    <div className={styles.task}>
                        <span> {task.task} </span>
                    </div>
                    <div className={styles.task_btn}>
                        <button onClick={() => handleDelete(task?.id)}>
                            <MdDelete className={styles.iconDelete} />
                        </button>

                        <button onClick={() => handleCheck(task?.id)}>
                            <AiOutlineCheckSquare
                                className={styles.iconCheck}
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks