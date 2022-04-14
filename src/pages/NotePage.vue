<template>
  <q-page padding>
    <NoteContainer>
      <div v-if="editing">
        <form @submit="editing = false">
          <q-input v-model="note.title" label="Title" filled />
          <q-input
            v-model="note.description"
            label="Description"
            filled
            class="q-mt-sm"
            dense
          />

          <q-card flat bordered class="q-mt-sm">
            <q-editor v-model="note.content" min-height="5rem" />
          </q-card>

          <div class="q-mt-md">
            <q-btn
              class="q-ml-sm"
              color="positive"
              type="submit"
              @click="updateNote"
              >Done</q-btn
            >
          </div>
        </form>
      </div>
      <div v-else>
        <div class="row items-center justify-between">
          <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
          <div>
            <q-btn
              round
              class="q-ml-sm"
              color="secondary"
              icon="edit"
              @click="editing = true"
            />
            <q-btn
              round
              class="q-ml-sm"
              color="red"
              icon="delete"
              @click="remove(note.note_id)"
            />
          </div>
        </div>
        <div>{{ note.description }}</div>
        <div class="q-mt-md" v-html="note.content" />
      </div>
    </NoteContainer>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useLocalNotes } from "src/helper";
import NoteContainer from "src/components/NoteContainer.vue";
import { api } from "boot/axios";

export default {
  components: { NoteContainer },
  setup() {
    // const notes = useLocalNotes();
    const route = useRoute();
    const router = useRouter();
    const noteId = computed(() => parseInt(route.params.id));
    // const note = computed(() => notes.value[noteId.value]);
    const editing = ref(false);
    const note = ref([]);

    api.get(`/api/note/?id=${noteId.value}`).then((response) => {
      note.value = response.data[0];
    });

    const updateNote = async () => {
      await api.post("/api/note", note.value);
    };

    const remove = async (noteId) => {
      await api.delete(`/api/note/${noteId}`);
      router.push("/");
    };

    // const remove = () => {
    //   notes.value.splice(noteId.value, 1);
    //   router.push("/");
    // };

    // return { note, remove, editing };
    return { note, editing, remove, updateNote };
  },
};
</script>
