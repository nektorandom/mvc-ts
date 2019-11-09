import ToDoModel from './models/ToDoModel';
import ToDoView from './views/ToDoView';
import ToDoController from './controllers/ToDoController';

const app = new ToDoController(new ToDoModel(), new ToDoView());
