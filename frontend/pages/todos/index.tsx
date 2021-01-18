import { observer } from "mobx-react-lite"
import { types } from "mobx-state-tree"
import React, { FC } from 'react'

const Todo = types.model("Todo", {
    id: types.optional(types.number, () => Math.random()),
    title: types.string,
    finished: false
})
    .actions(self => ({
        toggle() {
            self.finished = !self.finished;
        }
    }));


export const TodoStore = types
    .model("TodoStore", {
        todos: types.array(Todo)
    })
    .views((self) => ({
        get unfinishedTodoCount() {
            return self.todos.filter((todo) => !todo.finished).length;
        },
        get completedTodos() {
            return self.todos.filter(t => t.finished)
        },
        findTodosByUser(user) {
            // return self.todos.filter(t => t.assignee === user)
        }
    }))
    .actions((self) => ({
        addTodo(title) {
            self.todos.push({ title });
            console.log(self.todos.length);
        }
    }));

// YOU MUST OBSERVE EACH INDIVIDUAL ITEM IN A STORE'S ARRAY!!!
const TodoItem: FC<any> = observer(({ todo }) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={todo.toggle}
        />
        {todo.title}
    </li>
)

// YOU MUST OBSERVE THE STORE, NOT THE CONTENTS OF THE STORE!!!
const TodoListSample: FC<any> = observer(({ todoStore }) => {

    return (
        <div>
            <ul>
                {todoStore.todos.map((todo, i) => {
                    return <TodoItem key={i} todo={todo} />
                })}
            </ul>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    let id = Math.floor(Math.random() * 999);
                    todoStore.addTodo(`Todo - ${id}`)
                    // todoStore.addTodo({
                    //     id,
                    //     title: `Todo - ${id}`,
                    //     finished: false
                    // })
                    console.log('storeIntance.todos.length', todoStore.todos.length)
                }}
            >+</button>

            <span>{`Count ${todoStore.todos.length}`}</span>
        </div>
    )
});

export default TodoListSample;
