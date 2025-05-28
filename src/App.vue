<script setup>
  import ButtonAddMedicine from "./components/ButtonAddMedicine.vue";
  import FormNewMedicine from "./components/FormNewMedicine.vue";
  import ArrayMedicine from "./components/ArrayMedicine.vue";
  import FormUpdateMedicine from "./components/FormUpdateMedicine.vue";

  import { ref } from "vue";

  // Sert à montrer/cacher le bouton Ajouter et le formulaire
  let seen = ref(true);
  let reload = ref(false);
  let medicine = ref({ });
  let showUpdateForm = ref(false);
  let disabled = ref(false);

  /**
   * Après l'ajout d'un médicament, on recharge la liste des médicaments, on cache le formulaire et on réaffiche le bouton Ajouter
   */
  function loadAndHide()
  {
    reload.value = !reload.value;
    seen.value = !seen.value;
  }

  /**
   * Envoie l'objet medicine au composant FormUpdateMedicine + désactive la modification + affiche le formulaire
   * @param medicineToUpdate Objet medicine qui doit être modifié
   */
  function sendDataToForm(medicineToUpdate)
  {
    medicine.value = medicineToUpdate;
    disabled.value = !disabled.value;
    showUpdateForm.value = !showUpdateForm.value;
  }

  /**
   * Bouton Annuler : on cache le formulaire et on ré autorise la modification
   */
  function hideFormAndAutorizeEdit()
  {
    showUpdateForm.value = !showUpdateForm.value;
    disabled.value = !disabled.value;
  }

  /**
   * Rechargement de la liste des médicaments après modification de l'un d'entre eux + ré autorisation de la modification + cache le formulaire
   */
  function reloadAfterUpdate()
  {
    reload.value = true;
    disabled.value = false;
    showUpdateForm.value = !showUpdateForm.value;
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
      <ArrayMedicine :reload="reload" :disabled="disabled" @updateMedicine="sendDataToForm"></ArrayMedicine>
      <FormUpdateMedicine v-if="showUpdateForm" @goBack="hideFormAndAutorizeEdit" @reloadListMedicine="reloadAfterUpdate" :medicine="medicine"></FormUpdateMedicine>
    </div>
  </main>
</template>

<style scoped>

</style>
