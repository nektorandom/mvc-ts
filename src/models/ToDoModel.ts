class ToDoModel {
    todos: {id: number, text: string, complete: boolean}[];
    onToDoListChanged: any;

    constructor() {
        this.todos = [
            {id: 1, text: 'Collect underpants', complete: false},
            {id: 2, text: '?', complete: false},
        ];
        this.todos = JSON.parse(localStorage.getItem('todos') as string) || this.todos;
    }

    bindToDoListChanged(callback: any) {
        this.onToDoListChanged = callback;
    }

    _commit(todos: object) {
        this.onToDoListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    addToDo(todoText: string): void {
        const todo: {id: number, text: string, complete: boolean} = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        };

        this.todos.push(todo);
        this._commit(this.todos)
    }

    editToDo(id: number, updatedText: string): void {
        this.todos = this.todos.map(todo => todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo);
        this._commit(this.todos)
    }

    deleteToDo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this._commit(this.todos)
    }

    toggleToDo(id: number): void {
        this.todos = this.todos.map(todo => todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo);
        this._commit(this.todos)
    }
}

export default ToDoModel;