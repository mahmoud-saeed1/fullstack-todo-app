data.todos.map((todo: ITodo) => (
    <motion.div
      key={todo.id}
      variants={VTodoVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, type: "spring" }}
      className={`todo-container mb-4 p-4 rounded-lg shadow-lg transition-all ${
        todo.completed ? "bg-gray-200" : "bg-white"
      }`}
    >
      {/$ Customized Checkbox $/}
      <Input
        type="checkbox"
        className="todo-checkbox mr-4"
        checked={todo.completed}
        onChange={() => checkTodoHandler(todo)}
      />

      {/$ Todo Title with Strikethrough $/}
      <Button
        className={`todo-title text-lg font-semibold ${
          todo.completed ? "line-through text-gray-500" : "text-black"
        }`}
        onClick={() => openTodoHandler(todo)}
        disabled={todo.completed}
      >
        {todo.title}
      </Button>

      {/$ Action Buttons $/}
      <div className="todo-actions flex ml-auto">
        <Button
          className={`todo-update-button todo-btn mr-2 ${
            todo.completed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => openEditModalHandler(todo)}
          isLoading={isLoading}
          disabled={todo.completed}
        >
          Update
        </Button>

        <Button
          className={`todo-delete-button todo-btn ${
            todo.completed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => openDeleteModalHandler(todo)}
          disabled={todo.completed}
        >
          Delete
        </Button>
      </div>
    </motion.div>
  ))