<script setup>
    import { ref, onMounted } from "vue";

    const props = defineProps(['medicine']);
    const emit = defineEmits(['closePrescription', 'prescriptionDeleted']);

    const ordo = ref({ });
    const renewalOrNot = ref(false);

    onMounted(() => {
        // Récupération de l'ordonnance depuis le localStorage
        ordo.value = JSON.parse(localStorage.getItem(`ordo-${props.medicine.id}`));

        // On affiche si le renouvellement est autorisé (si la checkbox était cochée)
        (renewalOrNot.value) = ordo.renewal ? "Pas de renouvellement" : "Renouvellement autorisé";

        document.querySelector("#scroll-bottom").scrollIntoView();
    });

    /**
     * Suppression de l'ordonnance
     */
    function deletePrescription()
    {
        localStorage.removeItem(`ordo-${props.medicine.id}`);

        emit("prescriptionDeleted");
    }
</script>

<template>
    <div class="d-flex justify-content-between align-items-center mb-2">
        <h3>Consulter une ordonnance</h3>
        <div class="d-flex" id="buttons">
            <button class="btn btn-danger" @click="deletePrescription"><font-awesome-icon icon="trash"/> Supprimer l'ordonnance</button>
            <button class="btn btn-secondary" @click="$emit('closePrescription')"><font-awesome-icon icon="xmark"/> Fermer</button>
        </div>
    </div>
    <section class="bg-white">
        <h4 class="text-center">Ordonnance</h4>
        <div class="d-flex justify-content-end align-items-center mb-2">
            Date : {{ ordo.date }}
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="same-line">
                Pour : {{ ordo.for }}
            </div>
            <div class="same-line">
                Docteur : {{ ordo.doctor }}
            </div>
        </div>
        <h5 class="text-center mb-3">Prescription</h5>
        <div class="mb-2">
            Médicament : {{ props.medicine.denomination }} en {{ props.medicine.formepharmaceutique }}
        </div>
        <div class="mb-3">
            Dose : {{ ordo.dose }} pendant {{ ordo.duration }} jours ({{ renewalOrNot }})
        </div>
    </section>
</template>

<style scoped>
    section {
        height: 60vh;
        color: black;
        padding: 2%;
        margin-bottom: 3vh;
    }

    .same-line {
        height: 6em;
    }

    h5 {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        padding: 15px 0;
    }

    #buttons {
        gap: 20px;
    }
</style>