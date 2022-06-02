<template></template>

<script>
import { TutorialsApiService } from "../services/tutorials-api.service";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "tutorials",
  data() {
    return {
      tutorials: [],
      tutorialDialog: false,
      deleteTutorialDialog: false,
      deleteTutorialsDialog: false,
      tutorial: {},
      selectedTutorials: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: true },
        { label: "Unpublished", value: false },
      ],
      tutorialsService: new TutorialsApiService(),
    };
  },

  methods: {

    openNew() {
      this.tutorial = {};
      this.submitted = false;
      this.tutorialDialog = true;
    },

    hideDialog() {
      this.tutorialDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
      return this.tutorials.findIndex((tutorial) => tutorial.id === id);
    },

    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.title.trim()) {


        if (this.tutorial.id) {
          //esto me valida que si el tutorial ya tiene id entonces solo actualizara
          this.tutorialsService
            .update(this.tutorial.id, this.tutorial)
            .then((response) => {
              this.tutorials[this.findIndexById(this.tutorial.id)] = this.tutorial;
              this.$toast.add({
                //el $toast es el mensajito que aparece automaticamente y solito se desvanece
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 4000,
              });
              console.log(response);
            });
        }
        else {
          this.tutorial.id=0;
          this.tutorialsService.create(this.tutorial).then((response)=>{
            this.tutorial.id=response.data.id;
            this.tutorials.push(this.tutorial);

            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Created",
              life: 4000,
            });
            console.log(response);

          })

        }
      }
      this.tutorialDialog=false;
      this.tutorial={};
    },

    editTutorial(tutorial){
      this.tutorial={...tutorial};
      this.tutorialDialog=true;
    },

    confirmDeleteTutorial(tutorial){
      this.tutorial=tutorial;
      this.deleteTutorialsDialog=true;
    },

    deleteTutorial(){
      this.tutorialsService.delete(this.tutorial.id)
      .then((response)=>{
        this.tutorial=this.tutorial.filters((t)=>t.id!==this.tutorial.id);
        this.deleteTutorialsDialog=false;
        this.tutorial={};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Tutorial Deleted",
          life: 4000,
        });
        console.log(response);
      })
    }
  },
};
</script>

<style scoped></style>
