<script>
  import { formatDistanceToNow, parse } from "date-fns";
  import { todos } from "../store";
  import TodoForm from "./TodoForm.svelte";

  let isEditing = false;

  function handleDelete() {
    todos.deleteItem(item.id);
  }

  function handleEdit() {
    isEditing = !isEditing;
  }

  function saveChanges(values) {
    todos.updateItem(item.id, { ...item, ...values });
    isEditing = false;
  }

  function handleComplete() {
    todos.updateItem(item.id, { ...item, completed: !item.completed });
  }

  $: readableDate = `Due: ${formatDistanceToNow(
    parse(item.dueDate, "yyyy-MM-dd", new Date()),
    { addSuffix: true }
  )}`;

  export let item;
</script>

<style>
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.5em;
  }

  .content > h1 {
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
  }

  .completed {
    text-decoration: line-through;
    color: #c5c5c5;
    font-style: italic;
  }

  .content > h1:hover {
    cursor: pointer;
  }

  .date-info {
    color: #6d6d6d;
    font-size: 0.875em;
    display: flex;
    align-items: center;
    font-style: italic;
  }

  .date-info > svg {
    margin-right: 0.5em;
  }

  .item:hover > .actions {
    visibility: visible;
  }

  .actions {
    visibility: hidden;
    margin-left: auto;
  }

  .actions > svg + svg {
    margin-left: 0.75em;
  }

  .actions > svg:hover {
    cursor: pointer;
  }
</style>

<div class="item">
  {#if isEditing}
    <TodoForm
      values={{ ...item }}
      action={saveChanges}
      cancel={() => (isEditing = false)} />
  {:else}
    <div class="content">
      <h1 class:completed={item.completed} on:click={handleComplete}>
        {item.title}
      </h1>
      {#if !item.completed}
        <div class="extra-info">
          <p>{item.description}</p>
          <div class="date-info">
            <svg
              width="1.25em"
              height="1.25em"
              viewBox="0 0 16 16"
              class="calendar-icon"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 3.5c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1zm8.854 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
            </svg>
            <div class="date">{readableDate}</div>
          </div>
        </div>
      {/if}
    </div>
    <div class="actions">
      <svg
        on:click={handleEdit}
        width="1.25em"
        height="1.25em"
        viewBox="0 0 16 16"
        class="edit-icon"
        fill="#4771dc"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
      </svg>
      <svg
        on:click={handleDelete}
        width="1.25em"
        height="1.25em"
        viewBox="0 0 16 16"
        class="delete-icon"
        fill="#dc4771"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
      </svg>
    </div>
  {/if}
</div>
