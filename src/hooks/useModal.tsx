import { useState } from "react";

const useModal = <T,>(defaultTodo: T) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<T>(defaultTodo);

  const handleModalOpen = (
    type: "create" | "update" | "delete" | "view",
    todo?: T
  ) => {
    setSelectedTodo(todo || defaultTodo);
    switch (type) {
      case "create":
        setOpenCreateModal(true);
        break;
      case "update":
        setOpenUpdateModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      case "view":
        setOpenTodoModal(true);
        break;
    }
  };

  const handleModalClose = (type: "create" | "update" | "delete" | "view") => {
    switch (type) {
      case "create":
        setOpenCreateModal(false);
        break;
      case "update":
        setOpenUpdateModal(false);
        break;
      case "delete":
        setOpenDeleteModal(false);
        break;
      case "view":
        setOpenTodoModal(false);
        break;
    }
    setSelectedTodo(defaultTodo);
  };

  const resetTodo = () => {
    setSelectedTodo(defaultTodo);
    handleModalClose("view");
    handleModalClose("create");
    handleModalClose("update");
    handleModalClose("delete");
  };

  return {
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    openTodoModal,
    selectedTodo,
    handleModalOpen,
    handleModalClose,
    resetTodo,
  };
};

export default useModal;
