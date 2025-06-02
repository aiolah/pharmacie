<script setup>
    import { ref, onMounted, watch } from "vue";
    import defaultBoite from "@/assets/boite-default.png";

    const listMedicine = ref([]);
    const props = defineProps(["reload", "disabled", "searchItem"]);
    const emit = defineEmits(["updateMedicine", 'showDeleteSuccessAlert']);

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
            console.log(dataJSON);

            listMedicine.value.length = 0;

            let allMedicine = dataJSON;
    
            allMedicine.forEach((medicine) => {
                getPhotoUrl(medicine);
                listMedicine.value.push(medicine);
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
        medicine.qte++;

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
            medicine.qte--;
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
            console.log(dataJSON);
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

        console.log(idMedicine);

        const deleteUrl = url + `/${idMedicine}`;
        const fetchOptions = {
            method: "DELETE",
        };

        fetch(deleteUrl, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);

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

        console.log(searchUrl);

        fetch(searchUrl, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);

            dataJSON.forEach((medicine) => {
                getPhotoUrl(medicine);
            });

            listMedicine.value = dataJSON;

            console.log(listMedicine.value);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Récupère l'URL de l'image ou l'image par défaut du médicament
     * @param medicine Objet médicament
     */
    function getPhotoUrl(medicine)
    {
        if(medicine.photo == null)
        {
            medicine.photo = defaultBoite;
        }
        else
        {
            medicine.photo = `https://apipharmacie.pecatte.fr/images/${medicine.photo}`;
        }
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
                <td>{{ medicine.denomination }}</td>
                <td>{{ medicine.formepharmaceutique}}</td>
                <td><img :src="medicine.photo"></td>
                <td>{{ medicine.qte }}</td>
                <td class="actions">
                    <button type="button" class="btn btn-primary btn-sm" @click="addOneQuantity(index)">+ 1</button>
                    <button type="button" class="btn btn-info btn-sm" @click="lessOneQuantity(index)">- 1</button>
                    <button type="button" class="btn btn-warning btn-sm" @click="$emit('updateMedicine', medicine)" :disabled="props.disabled"><font-awesome-icon icon="pen-to-square" /></button>
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteMedicine(index)"><font-awesome-icon icon="trash"/></button>
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