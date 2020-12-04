import { writable, derived } from 'svelte/store'
import { format, parse } from 'date-fns'
import data from './data'

function createTodoStore() {
  let { subscribe, set, update } = writable(data);

  return {
    subscribe,
    updateItem: (id, item) => update(items => {
      let parsedDate = parse(item.dueDate, "yyyy-MM-dd", new Date());
      item.dueDate = format(parsedDate, 'yyyy-MM-dd');
      let indexToUpdate = items.findIndex(item => item.id == id);
      items[indexToUpdate] = item;
      return items;
    }),
    deleteItem: (id) => update(items => {
      items = items.filter(item => item.id !== id);
      return items;
    }),
    addItem: (item) => update(items => {
      let parsedDate = parse(item.dueDate, "yyyy-MM-dd", new Date());
      item.dueDate = format(parsedDate, 'yyyy-MM-dd');
      items = [{ ...item, id: Date.now() }, ...items];
      return items;
    })
  }
}

export const todos = createTodoStore();

// export const allCompleted = derived(todos, $todos => $todos.filter(todo => todo.completed))
// export const allPending = derived(todos, $todos => $todos.filter(todo => !todo.completed))
