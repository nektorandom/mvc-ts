import ToDoModel from './../models/ToDoModel';
import ToDoView from './../views/ToDoView';

class ToDoController {
    model: ToDoModel;
    view: ToDoView;

    constructor(model: ToDoModel, view: ToDoView) {
        this.model = model;
        this.view = view;

        this.model.bindToDoListChanged(this.onToDoListChanged);
        this.view.bindAddToDo(this.handleAddToDo);
        this.view.bindEditToDo(this.handleEditToDo);
        this.view.bindDeleteToDo(this.handleDeleteToDo);
        this.view.bindToggleToDo(this.handleToggleToDo);

        this.onToDoListChanged(this.model.todos);
    }

    onToDoListChanged = (todos: any) => {
        this.view.displayToDos(todos)
    };

    handleAddToDo = (todoText: string) => {
        this.model.addToDo(todoText);
    };

    handleEditToDo = (id: number, todoText: string) => {
        this.model.editToDo(id, todoText);
    };

    handleDeleteToDo = (id: number) => {
        this.model.deleteToDo(id);
    };

    handleToggleToDo = (id: number) => {
        this.model.toggleToDo(id);
    }
}

export default ToDoController;