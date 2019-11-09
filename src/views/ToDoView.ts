class ToDoView {
    app: any;
    title: HTMLElement;
    form: HTMLElement;
    input: any;
    submitButton: HTMLElement;
    toDoList: HTMLElement;
    _temporaryTodoText: string;

    constructor() {
        this.app = this.getElement('#app');

        this.title = this.createElement('h1');
        this.title.textContent = 'Todos';

        this.form = this.createElement('form');

        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';

        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';

        this.toDoList = this.createElement('ul', 'todo-list');

        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.toDoList);

        this._temporaryTodoText = '';
        this._initLocalListeners();
    }

    get _toDoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = '';
    }

    createElement(tag: string, className?: string): any {
        const element = document.createElement(tag);

        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    getElement(selector: string): HTMLElement | null {
        return document.querySelector(selector);
    }

    _initLocalListeners() {
        this.toDoList.addEventListener('input', (event: any) => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText;
            }
        });
    }

    displayToDos(todos: {id: number, text: string, complete: boolean}[]) {

        while(this.toDoList.firstChild) {
            this.toDoList.removeChild(this.toDoList.firstChild);
        }

        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.toDoList.append(p)
        } else {
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                const span = this.createElement('span', 'editable');
                span.contentEditable = true;

                span.textContent = todo.text;
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent =  todo.text;
                    span.textContent = '';
                    span.append(strike);
                }

                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                this.toDoList.append(li);
            })
        }
    }

    bindAddToDo(handler: any) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();

            if (this._toDoText) {
                handler(this._toDoText);
                this._resetInput();
            }
        })
    }

    bindEditToDo(handler: any) {
        this.toDoList.addEventListener('focusout', (event: any) => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id);

                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = '';
            }
        })
    }

    bindDeleteToDo(handler: any) {
        this.toDoList.addEventListener('click', (event: any) => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);

                handler(id);
            }
        })
    }

    bindToggleToDo(handler: any) {
        this.toDoList.addEventListener('change', (event: any) => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id);

                handler(id);
            }
        })
    }
}

export default ToDoView;