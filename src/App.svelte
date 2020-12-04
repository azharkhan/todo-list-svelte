<script>
  import { format } from "date-fns";
  import { todos } from "./store";
  import TodoList from "./components/TodoList.svelte";
  import TodoForm from "./components/TodoForm.svelte";
  let isAddingNewItem = false;

  function handleCreate(values) {
    todos.addItem({
      ...values,
      completed: false,
    });
    isAddingNewItem = false;
  }

  $: today = `It's ${format(Date.now(), "EEEE, do MMMM y")}`;
  $: count = $todos.filter((item) => !item.completed).length;
</script>

<style>
  main {
    max-width: 400px;
    width: 100%;
    margin: auto;
    background-color: #fff;
    border-radius: 1em;
    font-size: 1em;
    color: #455963;
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
    max-height: 100%;
    overflow: hidden;
    padding: 1em 2em;
    font-family: "Noto Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  header {
    border-bottom: 1px solid #455963;
  }

  header > h1 {
    font-family: "Fjalla One", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .add-new {
    border: none;
    background: none;
    color: #4771dc;
    font-style: italic;
  }

  .add-new:hover {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    main {
      max-width: 640px;
    }
  }
</style>

<main>
  <header>
    <h1>{today}</h1>
    <p>You have {count} items to complete.</p>
    {#if isAddingNewItem}
      <TodoForm
        action={handleCreate}
        cancel={() => (isAddingNewItem = false)} />
    {:else}
      <button class="add-new" on:click={() => (isAddingNewItem = true)}>Add Todo</button>
    {/if}
  </header>
  <TodoList items={$todos} />
</main>
