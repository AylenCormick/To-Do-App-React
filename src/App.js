import { Input } from "./components/input/Input";
import { Title } from "./components/title/title"
import { TodoList } from "./components/TodoList/TodoList";
import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   title: "Welcome To New York",
    //   completed: false
    // },
    // {
    //   id: 2,
    //   title: "Blank Space",
    //   completed: false
    // },
    // {
    //   id: 3,
    //   title: "Style",
    //   completed: false
    // },
    // {
    //   id: 4,
    //   title: "Out Of The Woods",
    //   completed: false
    // },
    // {
    //   id: 5,
    //   title: "All You Have To Do Was Stay",
    //   completed: false
    // }
  ])

  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);

  //añadir todo

  const addTodo = (title) => {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;

    const newTodo = {
      id: lastId + 1,
      title: title,
      completed: false
    }

    const todoList = [...todos]
    todoList.push(newTodo);

    setTodos(todoList);
  }

  //cambiar completo todo

  const handleSetComplete = (id) => {
    const UpdateList = todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo; 
    })

    setTodos(UpdateList)

  }

  //eliminar todo

  const handleDelete = (id) => {
    const updateList = todos.filter(todo => todo.id !== id)
    setTodos(updateList);
  }


  //eliminar todos completadas

  const handleClearComplete = () => {
    const updatedList = todos.filter(todo => !todo.completed);
    setActiveFilter(updatedList);
  }

  //mostrar all todos

  const showAllTodos = () => {
    setActiveFilter('all');
  }

  //mostrar todos activas

  const showActiveTodos = () => {
    setActiveFilter('active')
  }

  //mostrar todos completadas

  const showCompletedTodos = () => {
    setActiveFilter('completed')
  }


  useEffect(() => {
    if(activeFilter === "all") {
      setFilteredTodos(todos);
    } else if (activeFilter === "active") {
      const activeTodos = todos.filter(todo => todo.completed === false);
      setFilteredTodos(activeTodos);
    } else if (activeFilter === "completed") {
      const completedTodos = todos.filter(todo => todo.completed === true);
      setFilteredTodos(completedTodos);
    }
  }, [activeFilter, todos])


  return (
    <div className='bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5'>
      <div className='container flex flex-col max-w-xl'>
        <Title />
        <Input addTodo = {addTodo}/>
        <TodoList 
        todos = {filteredTodos}
        activeFilter={filteredTodos}
        handleSetComplete = {handleSetComplete}
        handleDelete = {handleDelete}
        handleClearComplete = {handleClearComplete}
        showAllTodos = {showAllTodos}
        showActiveTodos = {showActiveTodos}
        showCompletedTodos = {showCompletedTodos}
        />
      </div>
    </div>
  );
}

export default App;
