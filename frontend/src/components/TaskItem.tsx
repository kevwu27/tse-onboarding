import React, { useState } from "react";
import { Task, updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
    const [task, setTask] = useState<Task>(initialTask);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleToggleCheck = () => {
       setLoading(true);
       updateTask({...task, isChecked: !task.isChecked})
        .then((result) => {
            if (result.success) {
                setTask(result.data);
            } else {
                alert(result.error);
            }
            setLoading(false);
        })
        .catch((reason) => {
            alert(reason);
        })

    };

    return (
        <div className={styles.item}>
        <CheckButton onPress={handleToggleCheck} checked={task.isChecked} disabled={isLoading} />
        <div className={task.isChecked ? styles.textContainer + " " + styles.checked : styles.textContainer}>
            <span className={styles.title}>{ task.title }</span>
            {task.description && <span className={styles.description}>{ task.description }</span>}
        </div>
        </div>
    );
}