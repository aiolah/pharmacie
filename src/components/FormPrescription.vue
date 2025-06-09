<script setup>
    import { onMounted, ref } from "vue";

    const props = defineProps(['medicine']);
    const emit = defineEmits(['goBack', 'prescriptionSubmitted']);

    const date = ref('');
    const person = ref('');
    const doctor = ref('');
    const dose = ref('');
    const duration = ref('');
    const renewalOrNot = ref(false);

    onMounted(() => {
        document.querySelector("#scroll-bottom").scrollIntoView();
    });

    /**
     * Enregistrement de l'ordonnance dans le localStorage
     */
    function addPrescription()
    {
        const ordo = {
            "medicineId": props.medicine.id,
            "for": person.value,
            "doctor": doctor.value,
            "dose": dose.value,
            "duration": duration.value,
            "renewal": renewalOrNot.value,
            "date": date.value
        }

        // Enregistrement de l'ordonnance dans le localStorage
        const ordoJSON = JSON.stringify(ordo);
        localStorage.setItem(`ordo-${props.medicine.id}`, ordoJSON);

        emit("prescriptionSubmitted");
    }
</script>

<template>
    <h3>Ajouter une ordonnance</h3>
    <form action="" @submit.prevent="addPrescription">
        <section class="bg-white">
            <h4 class="text-center">Ordonnance</h4>
            <div class="d-flex justify-content-end align-items-center mb-2">
                <label for="date">Date : </label>
                <input type="date" name="date" id="date" class="classic-input" v-model="date" required>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="same-line">
                    <label for="for" class="me-1">Pour :</label>
                    <input type="text" name="for" placeholder="Mme Howl" id="for" class="classic-input" v-model="person" required>
                </div>
                <div class="same-line">
                    <label for="doctor" class="me-1">Docteur :</label>
                    <input type="text" name="doctor" placeholder="Dr Tristan" id="doctor" class="classic-input" v-model="doctor" required>
                </div>
            </div>
            <h5 class="text-center mb-3">Prescription</h5>
            <div class="mb-2">
                <label for="medicine">Médicament : </label>
                <input type="text" v-model="props.medicine.denomination" name="medicine" id="medicine" class="classic-input important-input text-center" readonly>
                <label for="forme" id="en"> en </label>
                <input type="text" name="forme" id="forme" class="classic-input important-input text-center" readonly v-model="props.medicine.formepharmaceutique">
            </div>
            <div class="mb-3 d-flex justify-content-start">
                <label for="dose" class="me-1">Dose :</label>
                <div class="d-flex flex-column">
                    <div id="dose-inputs">
                        <input type="text" name="dose" placeholder="1 cp le matin et le soir" id="dose" class="classic-input" v-model="dose" required>
                        <span id="pendant"> pendant </span>
                        <input type="number" name="duration" placeholder="14" min="1" class="classic-input" v-model="duration" required>
                        <span id="jours"> jours </span>
                    </div>
                
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="renewal" v-model="renewalOrNot">
                        <label class="form-check-label" for="renewal">Renouvellement</label>
                    </div>
                </div>
            </div>
        </section>
        <div class="mb-4">
            <input type="submit" class="btn btn-primary me-2" value="Enregistrer">
            <button type="button" class="btn btn-secondary" @click="$emit('goBack')">Annuler</button>
        </div>
    </form>
</template>

<style scoped>
    section {
        height: auto;
        color: black;
        padding: 2%;
        margin-bottom: 3vh;
    }

    .classic-input {
        all: unset;
    }

    .classic-input {
        border: 0px;
        border-bottom: 1px solid black;
        width: 14vw;
        height: 21%;
        padding: 11px;
        margin-left: 1%;
        background-color: rgb(227 227 227);
    }

    .classic-input:focus-visible {
        border-color: var(--bs-primary);
    }

    .same-line {
        height: 6em;
        flex-basis: 21vw;
    }

    h5 {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        padding: 15px 0;
    }

    [name="dose"] {
        width: 25vw;
    }

    #pendant {
        margin: 0 7px;
    }

    #en {
        margin: 0 15px;
    }

    [name="duration"], [name="forme"] {
        width: 5vw;
        margin: 0;
    }

    [for="dose"] {
        margin-top: 5px;
    }

    #jours {
        margin-left: 5px;
    }

    #renewal {
        border: 1px solid rgb(140, 140, 140);
    }

    #dose-inputs {
        width: 50vw;
        height: 8vh;
    }

    .important-input {
        border: 1px solid black;
        width: auto;
    }
</style>