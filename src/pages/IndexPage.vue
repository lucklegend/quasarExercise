<template>
  <q-page padding>
    <NoteContainer>
      <div class="row items-center justify-between">
        <h3>Your Notes</h3>
        <div>
          <q-btn round color="positive" icon="add" to="/new"></q-btn>
        </div>
      </div>
      <NoteCard
        v-for="note in notes"
        :key="note.note_id"
        :title="note.title"
        :description="note.description"
        @click="router.push(`/note/${note.note_id}`)"
      />
      <div v-if="notes.length === 0">You have not created any notes.</div>
    </NoteContainer>
  </q-page>
</template>

<script>
import NoteContainer from "src/components/NoteContainer.vue";
import NoteCard from "src/components/NoteCard.vue";
// import { useLocalNotes } from "src/helper";
import { api } from "boot/axios";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

// import { notStrictEqual } from "assert";
export default defineComponent({
  components: { NoteCard, NoteContainer },
  name: "IndexPage",
  setup() {
    // const notes = useLocalNotes();
    // const router = useRouter();
    // return { router, notes };
    const notes = ref([]);
    api.get("/api/note").then((response) => {
      notes.value = response.data;
    });
    const router = useRouter();
    return { router, notes };
  },
});
</script>
