import { api } from "boot/axios";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

// import { notStrictEqual } from "assert";
export default defineComponent({
  components: { NoteCard, NoteContainer },
  name: "IndexPage",
  setup() {
    // const notes = useLocalNotes();
    // const router = useRouter();
    // return { router, notes };
    api.get("/api/note").then((response) => {
      notes.value = response.data;
    });
    const router = useRouter();
    return { router, notes };
  },
});
