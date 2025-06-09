<script setup>
  import ButtonAddMedicine from "./components/ButtonAddMedicine.vue";
  import SearchBar from "./components/SearchBar.vue";
  import FormNewMedicine from "./components/FormNewMedicine.vue";
  import ArrayMedicine from "./components/ArrayMedicine.vue";
  import FormUpdateMedicine from "./components/FormUpdateMedicine.vue";
  import AlertSuccess from "./components/AlertSuccess.vue";
  import AlertError from "./components/AlertError.vue";
  import FormPrescription from "./components/FormPrescription.vue";
  import SavedPrescription from "./components/SavedPrescription.vue";

  import { ref } from "vue";

  // Sert à montrer/cacher le bouton Ajouter et le formulaire
  let seen = ref(true);
  let reload = ref(0);
  let medicine = ref({ });
  let showUpdateForm = ref(false);
  let disabled = ref(false);
  let searchItem = ref('');
  let emptySearchBar = ref(false);
  let msgSuccess = ref('');
  let showAlertSuccess = ref(false);
  let msgError = ref('');
  let showAlertError = ref(false);
  let showPrescription = ref(false);
  let showSavedPrescription = ref(false);
  let disabledOrdo = ref(false);

  function showAddForm()
  {
    seen.value = !seen.value;

    hideUpdateFormNow();
    hidePrescriptionNow();
    hideSavedPrescriptionNow();
  }

  /**
   * Après l'ajout d'un médicament, on recharge la liste des médicaments, on cache le formulaire et on réaffiche le bouton Ajouter
   */
  function loadAndHide()
  {
    reload.value++;
    seen.value = !seen.value;
    emptySearchBar.value = true;

    showSuccessAlert("Le médicament a été ajouté avec succès !");
    hideErrorAlert();
  }

  /**
   * Envoie l'objet medicine au composant FormUpdateMedicine + désactive la modification + affiche le formulaire
   * @param medicineToUpdate Objet medicine qui doit être modifié
   */
  function sendDataToForm(medicineToUpdate)
  {
    medicine.value = medicineToUpdate;
    showUpdateFormNow();
    hidePrescriptionNow();
    hideSavedPrescriptionNow();

    seen.value = true;
  }

  /**
   * Rechargement de la liste des médicaments après modification de l'un d'entre eux + ré autorisation de la modification + cache le formulaire
   */
  function reloadAfterUpdate()
  {
    reload.value++;
    emptySearchBar.value = true;
    hideUpdateFormNow();

    showSuccessAlert("Le médicament a bien été modifié !");
  }

  /**
   * Transfert de searchInput de la SearchBar à ArrayMedicine
   * @param searchItemInput Chaîne entrée par l'utilisateur dans la barre de recherche
   */
  function filterMedicine(searchItemInput)
  {
    searchItem.value = searchItemInput;
    hideErrorAlert();
  }

  /**
   * Reload de la page après une recherche
   */
  function reloadAfterSearch()
  {
    reload.value++;
    hideErrorAlert();
  }

  /**
   * Affichage d'une alerte d'erreur lors de l'ajout d'un médicament existant
   * @param nameExistingMedicine Nom du médicament qui existe déjà
   */
  function showErrorAlert(nameExistingMedicine)
  {
    showAlertError.value = true;
    msgError.value = `Le médicament <strong>${nameExistingMedicine}</strong> existe déjà ! <br> Veuillez modifier le médicament existant ou changer le nom du nouveau médicament.`;
  }

  /**
   * Affichage de l'ordonnance
   * @param medicinePrescription Médicament dont on veut afficher l'ordonnance
   */
  function displayPrescription(medicinePrescription)
  {
    hideUpdateFormNow();
    hideSavedPrescriptionNow();
    showPrescriptionNow();

    seen.value = true;
    medicine.value = medicinePrescription;
  }

  /**
   * Reload de la page après ajout de l'ordonnance
   */
  function reloadAfterPrescriptionAdded()
  {
    hidePrescriptionNow();
    reload.value++;

    showSuccessAlert("L'ordonnance a bien été ajoutée !");
  }

  /**
   * Affichage de l'ordonnance existante
   */
  function displaySavedPrescription(medicinePrescription)
  {
    hideUpdateFormNow();
    hidePrescriptionNow();
    showSavedPrescriptionNow();

    seen.value = true;
    medicine.value = medicinePrescription;
  }

  /**
   * Reload de la page après suppression de l'ordonnance
   */
  function reloadAfterPrescriptionDeleted()
  {
    hideSavedPrescriptionNow();
    reload.value++;

    showSuccessAlert("L'ordonnance a bien été supprimée !");
  }

  /**
   * Affiche l'alert de succès avec le message passé en paramètre
   * @param msg Message à afficher
   */
  function showSuccessAlert(msg)
  {
    msgSuccess.value = msg;
    showAlertSuccess.value = true;
  }

  /**
   * Affiche le formulaire de modification d'un médicament
   */
  function showUpdateFormNow()
  {
    showUpdateForm.value = true;
    disabled.value = true;
  }

  /**
   * Affiche le formulaire d'ajout d'une ordonannce
   */
  function showPrescriptionNow()
  {
    showPrescription.value = true;
    disabledOrdo.value = true;
  }

  /**
   * Affiche le formulaire de modification d'une ordonnance
   */
  function showSavedPrescriptionNow()
  {
    showSavedPrescription.value = true;
    disabledOrdo.value = true;
  }

  /**
   * Cache le formulaire de modification d'un médicament
   */
  function hideUpdateFormNow()
  {
    showUpdateForm.value = false;
    disabled.value = false;
  }

  /**
   * Cache le formulaire d'ajout d'une ordonnance
   */
  function hidePrescriptionNow()
  {
    showPrescription.value = false;
    disabledOrdo.value = false;
  }

  /**
   * Cache l'ordonnance
   */
  function hideSavedPrescriptionNow()
  {
    showSavedPrescription.value = false;
    disabledOrdo.value = false;
  }

  /**
   * Cache l'alert d'erreur
   */
  function hideErrorAlert()
  {
    showAlertError.value = false;
  }
</script>

<template>
  <header>
  </header>

  <main>
    <div class="container">
      <h1 class="text-center m-3">Ma Pharmacie</h1>

      <AlertSuccess v-if="showAlertSuccess" :msg="msgSuccess" @closeAlert="showAlertSuccess = false"></AlertSuccess>
      <AlertError v-if="showAlertError" :msg="msgError" @closeAlert="showAlertError = false"></AlertError>

      <div class="d-flex justify-content-between">
        <ButtonAddMedicine v-if="seen" @click="showAddForm"></ButtonAddMedicine>
        <div class="col-3">
          <SearchBar :emptySearchBar="emptySearchBar" v-if="seen" @searchMedicine="filterMedicine" @reloadAfterSearch="reloadAfterSearch"></SearchBar>
        </div>
      </div>
      <FormNewMedicine v-if="!seen" @goBack="seen = !seen" @loadNewMedicine="loadAndHide" @showErrorAlert="showErrorAlert"></FormNewMedicine>
      <ArrayMedicine :reload="reload" :disabled="disabled" :disabledOrdo="disabledOrdo" :searchItem="searchItem" @updateMedicine="sendDataToForm" @showDeleteSuccessAlert="showSuccessAlert('Le médicament a bien été supprimé !')" @showPrescription="displayPrescription" @showSavedPrescription="displaySavedPrescription"></ArrayMedicine>
      <FormUpdateMedicine v-if="showUpdateForm" @goBack="hideUpdateFormNow" @reloadListMedicine="reloadAfterUpdate" :medicine="medicine"></FormUpdateMedicine>
      <FormPrescription v-if="showPrescription" @goBack="hidePrescriptionNow" @prescriptionSubmitted="reloadAfterPrescriptionAdded" :medicine="medicine"></FormPrescription>
      <SavedPrescription v-if="showSavedPrescription" @closePrescription="hideSavedPrescriptionNow" @prescriptionDeleted="reloadAfterPrescriptionDeleted" :medicine="medicine"></SavedPrescription>
      <div id="scroll-bottom"></div>
    </div>
  </main>
</template>

<style scoped>

</style>
