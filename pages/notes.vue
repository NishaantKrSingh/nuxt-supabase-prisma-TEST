<template>
  <div>
    <h1>All Notes</h1>
    <ul v-if="notes.length">
      <li v-for="note in notes" :key="note.id">
        <strong>{{ note.user.username }}:</strong> {{ note.content }}
      </li>
    </ul>
    <p v-else>No notes available</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const notes = ref([])

const fetchNotes = async () => {
  try {
    const res = await fetch('/api/getnotes', {
      method: 'GET'
    })
    const result = await res.json()

    console.log('Raw response:', result)

    if (!result.body) {
      console.warn('No data or body found in the response.')
      return
    }

    // Extract the notes array from the body
    notes.value = result.body || []
    console.log('Notes:', notes.value)
  } catch (err) {
    console.error('Fetch failed:', err)
  }
}

onMounted(() => {
  fetchNotes()
})
</script>
