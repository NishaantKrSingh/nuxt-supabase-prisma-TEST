<template>
  <div>
    <h1>Submit a New Note</h1>

    <!-- Form to Submit a New Note -->
    <form @submit.prevent="submitNote">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="content">Note:</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <button type="submit">Add Note</button>
    </form>

    <!-- Message to Show Submission Status -->
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const content = ref('')
const message = ref('')

const submitNote = async () => {
  if (username.value && content.value) {
    try {
      await $fetch('/api/notes', {
        method: 'POST',
        body: { username: username.value, content: content.value },
      })
      message.value = 'Note added successfully!'
      content.value = ''  // Clear the content field
    } catch (error) {
      message.value = 'Failed to add the note.'
    }
  }
}
</script>
