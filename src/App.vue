<script setup>
  import ButtonAddMedicine from "./components/ButtonAddMedicine.vue";
  import FormNewMedicine from "./components/FormNewMedicine.vue";
  import ArrayMedicine from "./components/ArrayMedicine.vue";

  import { ref } from "vue";

  // Sert à montrer/cacher le bouton Ajouter et le formulaire
  let seen = ref(true);
  let reload = ref(false);

  /**
   * Après l'ajout d'un médicament, on recharge la liste des médicaments, on cache le formulaire et on réaffiche le bouton Ajouter
   */
  function loadAndHide()
  {
    reload.value = !reload.value;
    seen.value = !seen.value;
  }

</script>

<template>
  <header>
  </header>

  <main>
    <div class="container">
      <h1 class="text-center m-3">Ma Pharmacie</h1>

      <ButtonAddMedicine v-if="seen" @click="seen = !seen"></ButtonAddMedicine>
      <FormNewMedicine v-if="!seen" @goBack="seen = !seen" @loadNewMedicine="loadAndHide"></FormNewMedicine>
      <ArrayMedicine :reload="reload"></ArrayMedicine>
    </div>
  </main>
</template>

<style scoped>

</style>
