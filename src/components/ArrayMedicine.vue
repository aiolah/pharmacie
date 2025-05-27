<script setup>
    import { reactive, onMounted, watch } from "vue";

    const listMedicine = reactive([]);
    const props = defineProps(["reload"]);

    let url = "https://apipharmacie.pecatte.fr/api/13/medicaments";

    onMounted(() => {
        getAllMedicine();
    });

    watch(props, (reload) => {
        console.log(reload);
        listMedicine.length = 0;
        getAllMedicine();
    });

    function getAllMedicine()
    {
        const fetchOptions = { method: "GET" };

        fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
    
            let allMedicine = dataJSON;
    
            allMedicine.forEach((medicine) => {
                listMedicine.push(medicine);
            });
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
        let medicine = listMedicine[index];
        medicine.qte++;

        ajaxChangeQuantity(medicine);
    }

    /**
     * Enlève 1 à la quantité du médicament
     * @param index Index du médicament dont on réduit la quantité
     */
    function lessOneQuantity(index)
    {
        let medicine = listMedicine[index];
        medicine.qte--;
        ajaxChangeQuantity(medicine);
    }

    function ajaxChangeQuantity(medicine)
    {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(medicine)
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

    function deleteMedicine(index)
    {
        let medicine = listMedicine[index];
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

            listMedicine.splice(index, 1);
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
                <td>{{ medicine.denomination }}</td>
                <td>{{ medicine.formepharmaceutique}}</td>
                <td><img :src="'https://apipharmacie.pecatte.fr/images/' + medicine.photo"></td>
                <td>{{ medicine.qte }}</td>
                <td class="actions">
                    <button type="button" class="btn btn-primary btn-sm" @click="addOneQuantity(index)">+ 1</button>
                    <button type="button" class="btn btn-info btn-sm" @click="lessOneQuantity(index)">- 1</button>
                    <button type="button" class="btn btn-warning btn-sm" @click=""><font-awesome-icon icon="pen-to-square" /></button>
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