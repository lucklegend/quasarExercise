<template>
  <q-page padding>
    <NoteContainer>
      <h3>New Note</h3>
      <form @submit="submit">
        <q-input
          class="q-mt-sm"
          v-model="note.title"
          outlined
          label="Title"
          dense
        />
        <q-input
          class="q-mt-sm"
          outlined
          label="Description"
          v-model="note.description"
          dense
        />

        <q-card flat bordered class="q-mt-sm">
          <q-editor v-model="note.content" min-height="5rem" />
        </q-card>

        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn color="positive" class="q-ml-sm" type="submit">Create</q-btn>
        </div>
      </form>
    </NoteContainer>
  </q-page>
</template>
<script>
import { api } from "boot/axios";
import NoteContainer from "src/components/NoteContainer.vue";
import { defineComponent, reactive } from "vue";
import { useLocalNotes } from "src/helper";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { NoteContainer },
  name: "NewPage",
  setup() {
    const router = useRouter();
    // const notes = useLocalNotes();

    const note = reactive({
      title: "",
      description: "",
      content: "",
    });

    const submit = async () => {
      // notes.value.unshift({
      //   ...note,
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // });
      await api.post("/api/note", { ...note });
      router.push("/");
      note.title = "";
      note.description = "";
      note.content = "";
    };
    return { note, submit };
  },
});
</script>
