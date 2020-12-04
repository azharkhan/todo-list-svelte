<script>
  export let values = {};
  export let action;
  export let cancel;
</script>

<style>
  form {
    width: 100%;
    font-family: "Noto Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  input {
    border: 2px solid #e8ebed;
    border-radius: 3px;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0.5em;
  }

  label {
    font-size: 0.875em;
    padding-bottom: 0.25em;
    font-weight: bold;
  }

  .actions {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
  }

  .actions > button:hover {
    cursor: pointer;
  }

  .cancel {
    border: none;
    background: none;
    position: relative;
  }

  .cancel:after {
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #e8ebed;
    visibility: visible;
  }

  .save {
    background: #47dcb2;
    border: none;
    border-radius: 1.25em;
    padding: 0.75em 1.25em;
    color: #fefefe;
    font-weight: bold;
    font-size: 1.125em;
  }
</style>

<form name="todoForm">
  <fieldset>
    <label for="title">Title</label>
    <input
      name="title"
      placeholder="What needs to be done?"
      bind:value={values.title} />
  </fieldset>
  <fieldset>
    <label for="description">Description</label>
    <input
      name="description"
      placeholder="Add more details (as needed)"
      bind:value={values.description} />
  </fieldset>
  <fieldset>
    <label for="dueDate">Due By</label>
    <input type="date" name="dueDate" bind:value={values.dueDate} />
  </fieldset>
  <div class="actions">
    <button class="save" on:click|preventDefault={() => action(values)}>Save
      Item</button>
    <button class="cancel" on:click|preventDefault={cancel}>Cancel</button>
  </div>
</form>
