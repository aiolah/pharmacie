<script setup>
  import ButtonAddMedicine from "./components/ButtonAddMedicine.vue";
  import SearchBar from "./components/SearchBar.vue";
  import FormNewMedicine from "./components/FormNewMedicine.vue";
  import ArrayMedicine from "./components/ArrayMedicine.vue";
  import FormUpdateMedicine from "./components/FormUpdateMedicine.vue";
  import AlertSuccess from "./components/AlertSuccess.vue";

  import { ref } from "vue";

  // Sert à montrer/cacher le bouton Ajouter et le formulaire
  let seen = ref(true);
  let reload = ref(0);
  let medicine = ref({ });
  let showUpdateForm = ref(false);
  let disabled = ref(false);
  let searchItem = ref('');
  let emptySearchBar = ref(false);
  let msg = ref('');
  let showAlert = ref(false);

  /**
   * Après l'ajout d'un médicament, on recharge la liste des médicaments, on cache le formulaire et on réaffiche le bouton Ajouter
   */
  function loadAndHide()
  {
    reload.value++;
    seen.value = !seen.value;
    emptySearchBar.value = true;

    msg.value = "Le médicament a été ajouté avec succès !";
    showAlert.value = true;
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
    reload.value++;
    disabled.value = false;
    showUpdateForm.value = !showUpdateForm.value;
    emptySearchBar.value = true;

    msg.value = "Le médicament a bien été modifié !";
    showAlert.value = true;
  }

  /**
   * Transfert de searchInput de la SearchBar à ArrayMedicine
   * @param searchItemInput Chaîne entrée par l'utilisateur dans la barre de recherche
   */
  function filterMedicine(searchItemInput)
  {
    searchItem.value = searchItemInput;
  }

  /**
   * Reload de la page après une recherche
   */
  function reloadAfterSearch()
  {
    reload.value++;
  }

  function showDeleteMessage()
  {
    msg.value = "Le médicament a bien été supprimé !";
    showAlert.value = true;
  }

  function closeAlert()
  {
    showAlert.value = false;
  }
</script>

<template>
  <header>
  </header>

  <main>
    <div class="container">
      <h1 class="text-center m-3">Ma Pharmacie</h1>

      <AlertSuccess v-if="showAlert" :msg="msg" @closeAlert="closeAlert"></AlertSuccess>

      <div class="d-flex justify-content-between">
        <ButtonAddMedicine v-if="seen" @click="seen = !seen"></ButtonAddMedicine>
        <div class="col-3">
          <SearchBar :emptySearchBar="emptySearchBar" v-if="seen" @searchMedicine="filterMedicine" @reloadAfterSearch="reloadAfterSearch"></SearchBar>
        </div>
      </div>
      <FormNewMedicine v-if="!seen" @goBack="seen = !seen" @loadNewMedicine="loadAndHide"></FormNewMedicine>
      <ArrayMedicine :reload="reload" :disabled="disabled" :searchItem="searchItem" @updateMedicine="sendDataToForm" @showDeleteSuccessAlert="showDeleteMessage"></ArrayMedicine>
      <FormUpdateMedicine v-if="showUpdateForm" @goBack="hideFormAndAutorizeEdit" @reloadListMedicine="reloadAfterUpdate" :medicine="medicine"></FormUpdateMedicine>
    </div>
  </main>
</template>

<style scoped>

</style>
