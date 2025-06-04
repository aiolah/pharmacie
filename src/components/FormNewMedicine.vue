<script setup>
    import { ref } from "vue";

    const emit = defineEmits(["goBack", "loadNewMedicine"]);

    const name = ref('');
    const form = ref('');
    const quantity = ref(1);
    const photo = ref(''); // --> variable qui va contenir le fichier en base64

    /**
     * Ajoute un médicament dans l'API
     */
    function addMedicine()
    {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let url = "https://apipharmacie.pecatte.fr/api/13/medicaments";
        const fetchOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                denomination: name.value,
                formepharmaceutique: form.value,
                qte: quantity.value,
                photo: photo.value
            })
        };

        // console.log(fetchOptions.body);

        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            // Évènement qui remonte vers App pour dire à ArrayMedicine de recharger la liste des médicaments
            emit("loadNewMedicine");
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
    <h5>Ajouter un médicament</h5>
    <form action="" class="mb-3" @submit.prevent="addMedicine">
        <!-- <div class="row">
            <div class="col-5">
                <label for="name" class="form-label">Nom</label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="col-5">
                <label for="form" class="form-label">Forme pharmaceutique</label>
                <input type="text" class="form-control" id="form">
            </div>
            <div class="col-2">
                <label for="quantity" class="form-label">Quantité</label>
                <input type="number" class="form-control" id="quantity" min="1">
            </div>
        </div> -->
        <div class="row mb-2">
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Nom</span>
                    <input type="text" class="form-control" v-model="name" required>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Forme</span>
                    <input type="text" class="form-control" v-model="form" required>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text">Quantité</span>
                    <input type="number" class="form-control" min="1" v-model="quantity" required>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-12">
                <input class="form-control" type="file" id="img" @change="handleFileUpload">
            </div>
        </div>
        <input type="submit" class="btn btn-primary me-2" value="Enregistrer">
        <button type="button" class="btn btn-secondary" @click="$emit('goBack')">Annuler</button>
    </form>
</template>