<script setup>
    import { ref } from "vue";

    const props = defineProps(["medicine"]);
    const emit = defineEmits(["goBack", "reloadListMedicine"]);

    const photo = ref('');

    /**
     * Modifie un médicament existant dans l'API
     */
    function updateMedicine()
    {
        const url = "https://apipharmacie.pecatte.fr/api/13/medicaments";

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({
                id: props.medicine.id,
                denomination: props.medicine.denomination,
                formepharmaceutique: props.medicine.formepharmaceutique,
                qte: props.medicine.qte,
                photo: photo.value
            })
        };

        // console.log(fetchOptions.body);

        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);

            // Pour recharger la page avec les modifications apportées
            emit("reloadListMedicine");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Convertit le fichier en base64 dès qu'il est inséré dans le champ
     */
    function handleFileUpload()
    {
        const file = document.querySelector("#img").files[0];
        if (!file) return; // Si l'utilisateur annule la sélection du fichier, on ne fait rien
        // FileReader est un objet JavaScript permettant de lire le contenu d'un fichier de manière asynchrone
        const reader = new FileReader(); 
        reader.onload = () => { // definir le traitement asynchrone du contenu du fichier
            photo.value = reader.result // --> convertit le contenu du fichier en base64
        };
        reader.readAsDataURL(file); // lance la lecture du fichier et donc la conversion en base64
    }
</script>

<template>
    <h5>Modifier un médicament</h5>
    <form action="" class="mb-3" @submit.prevent="updateMedicine">
        <div class="row mb-2">
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Nom</span>
                    <input type="text" class="form-control" v-model="props.medicine.denomination" required>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Forme</span>
                    <input type="text" class="form-control" v-model="props.medicine.formepharmaceutique" required>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Quantité</span>
                    <input type="number" class="form-control" min="1" v-model="props.medicine.qte" required>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-12">
                <input class="form-control" type="file" id="img" @change="handleFileUpload">
            </div>
        </div>
        <input type="submit" class="btn btn-primary me-2" value="Modifier">
        <button type="button" class="btn btn-secondary" @click="$emit('goBack')">Annuler</button>
    </form>
</template>