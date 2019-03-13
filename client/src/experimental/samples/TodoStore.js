import { reaction, observable, decorate, computed, action } from 'mobx';

export class TodoStore {
    todoList = [];
    constructor() {
        reaction(() => this.todoList.filter((todo) => !todo.isComplete), (incompletedTasks) => {
            if (incompletedTasks.length > 5) {
                alert("Dude. You've got too much on your plate.");
            }
        });
    }
    get completedTasks() {
        return this.todoList.filter((todo) => todo.isComplete).length;
    }
    addTodo(task) {
        this.todoList.push({ task, isComplete: false });
    }
    completeTodo(completedTodo) {
        this.todoList.find((todo) => todo === completedTodo).isComplete = true;
    }
}

decorate(TodoStore, {
    todoList: observable,
    completedTasks: computed,
    completeTodo: action,
    addTodo: action,
})

export const todoStore = new TodoStore();
