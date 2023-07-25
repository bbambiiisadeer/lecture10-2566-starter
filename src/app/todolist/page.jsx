"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";

export default function Todolist() {
  //tasks = array of {id: string, title: string, complete: boolean}
  const [tasks, setTasks] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    // console.log("tasks is changed");
    const strTasks = JSON.stringify(tasks);
    localStorage.setItem("tasks", strTasks);
  }, [tasks]);

  useEffect(() => {
    const strTasks = localStorage.getItem("tasks");
    if (strTasks === null) {
      setTasks([]);
      return;
    }
    const loadedTasks = JSON.parse(strTasks);
    setTasks(loadedTasks);
  }, []);

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleDoneTask = (taskId) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);
    task.completed = !task.completed;
    setTasks(newTasks);
  };

  const doneLength = tasks.filter((task) => task.completed).length;

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({tasks.length}) Done ({doneLength})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer
        year="2023"
        fullName="Nunnapat Sirithanachokpaisan"
        studentId="650610776"
      />
    </div>
  );
}
