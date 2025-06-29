<script setup>
    import { ref, onMounted, watch } from "vue";
    import Medicine from "../Medicine.js";

    const listMedicine = ref([]);
    const props = defineProps(["reload", "disabled", "searchItem", "disabledOrdo"]);
    const emit = defineEmits(["updateMedicine", 'showDeleteSuccessAlert', 'showPrescription', 'showSavedPrescription']);

    const url = "https://apipharmacie.pecatte.fr/api/13/medicaments";

    onMounted(() => {
        getAllMedicine();
    });

    watch(() => props.reload, (newValue, oldValue) => {
        listMedicine.value.length = 0;
        getAllMedicine();
    });

    watch(() => props.searchItem, (newValue, oldValue) => {
        getSearchedMedicine();
    });

    /**
     * Récupère la liste de tous les médicaments
     */
    function getAllMedicine()
    {
        const fetchOptions = { method: "GET" };

        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            listMedicine.value.length = 0;

            let allMedicine = dataJSON;
    
            allMedicine.forEach((medicine) => {
                listMedicine.value.push(new Medicine(medicine));
            });

            // Scroll en haut de la page après affichage des médicaments
            window.scrollTo(0, 0);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Ajoute 1 à la quantité du médicament
     * @param index Index du médicament dont on augmente la quantité
     */
    function addOneQuantity(index)
    {
        let medicine = listMedicine.value[index];
        medicine.addQte();

        ajaxChangeQuantity(medicine);
    }

    /**
     * Enlève 1 à la quantité du médicament
     * @param index Index du médicament dont on réduit la quantité
     */
    function lessOneQuantity(index)
    {
        let medicine = listMedicine.value[index];

        if(medicine.qte >= 1)
        {
            medicine.reduceQte();
            ajaxChangeQuantity(medicine);
        }
        else
        {
            alert("L'opération est impossible");
        }

    }

    /**
     * Effectue une requête AJAX pour changer la quantité d'un médicament
     * @param medicine Objet représentant un médicament
     */
    function ajaxChangeQuantity(medicine)
    {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({
                id: medicine.id,
                qte: medicine.qte
            })
        };

        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            // console.log(dataJSON);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Suppression d'un médicament
     * @param index Index du médicament à supprimer
     */
    function deleteMedicine(index)
    {
        let medicine = listMedicine.value[index];
        let idMedicine = medicine.id;

        const deleteUrl = url + `/${idMedicine}`;
        const fetchOptions = {
            method: "DELETE",
        };

        fetch(deleteUrl, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            emit("showDeleteSuccessAlert");

            getAllMedicine();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Effectue une recherche parmi les médicaments existants
     */
    function getSearchedMedicine()
    {       
        const searchUrl = url + `?search=${props.searchItem}`;
        const fetchOptions = {
            method: "GET",
        };

        fetch(searchUrl, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            let listSearchedMedicine = [];

            dataJSON.forEach((medicine) => {
                listSearchedMedicine.push(new Medicine(medicine));
            });

            listMedicine.value = listSearchedMedicine;
        })
        .catch((error) => {
            console.log(error);
        });
    }
</script>

<template>
    <table class="table table-hover align-middle">
        <thead>
            <tr>
                <th scope="col">Dénomination</th>
                <th scope="col">Forme pharmaceutique</th>
                <th scope="col">Photo</th>
                <th scope="col">Quantité</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(medicine, index) in listMedicine" :key="medicine.id">
                <td class="name-medicine">{{ medicine.denomination }}</td>
                <td>{{ medicine.formepharmaceutique }}</td>
                <td><img :src="medicine.photo"></td>
                <td>{{ medicine.qte }}</td>
                <td class="actions">
                    <button type="button" class="btn btn-primary btn-sm" title="Augmenter la quantité" @click="addOneQuantity(index)">+ 1</button>
                    <button type="button" class="btn btn-info btn-sm" title="Réduire la quantité" @click="lessOneQuantity(index)">- 1</button>
                    <button type="button" class="btn btn-warning btn-sm" :title="'Modifier le médicament ' + medicine.denomination" @click="$emit('updateMedicine', medicine)" :disabled="props.disabled"><font-awesome-icon icon="pen-to-square" /></button>
                    <button v-if="!medicine.ordo" type="button" class="btn btn-success btn-sm" title="Ajouter une ordonnance" @click="$emit('showPrescription', medicine)" :disabled="props.disabledOrdo"><font-awesome-icon icon="file-medical" /></button>
                    <button v-if="medicine.ordo" type="button" class="btn btn-light btn-sm" title="Consulter l'ordonnance" @click="$emit('showSavedPrescription', medicine)"  :disabled="props.disabledOrdo"><font-awesome-icon icon="tablets" /></button>
                    <button type="button" class="btn btn-danger btn-sm" :title="'Supprimer le médicament ' + medicine.denomination" @click="deleteMedicine(index)"><font-awesome-icon icon="trash"/></button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    img {
        width: 55px;
        height: auto;
    }

    .actions > * {
        margin-right: 10px;
    }

    button:last-child {
        margin-right: 0 !important;
    }

    button {
        width: 40px;
    }
</style>