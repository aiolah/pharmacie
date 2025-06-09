<script setup>
    import { ref, watch } from "vue";
    
    const emit = defineEmits(["searchMedicine", "reloadAfterSearch"]);
    const props = defineProps(["emptySearchBar"]);

    const searchItemInput = ref('');
    const showCloseButton = ref(false);

    // Clear de la searchBar après reload
    watch(props, () => {
        if(props.emptySearchBar)
        {
            searchItemInput.value = "";
        }
    });

    /**
     * Si la searchBar contient du texte, on affiche l'icône croix pour clear la searchBar. Sinon, on n'affiche pas l'icône
     */
    function handleCloseButton()
    {
        if(searchItemInput.value != "")
        {
            showCloseButton.value = true;
        }
        else
        {
            showCloseButton.value = false;
        }
    }

    /**
     * Fermeture de la recherche : on clear la searchBar et on n'affiche plus l'icône croix
     */
    function closeSearch()
    {
        searchItemInput.value = "";
        showCloseButton.value = !showCloseButton.value;

        emit("reloadAfterSearch");
    }
</script>

<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Rechercher un médicament" v-model="searchItemInput" id="searchBarInput" @change="handleCloseButton" @keyup.enter="$emit('searchMedicine', searchItemInput)"/>
        <span id="closeSearch">
            <font-awesome-icon icon="xmark" @click="closeSearch" v-if="showCloseButton" />
        </span>
        <span type="button" class="input-group-text" @click="$emit('searchMedicine', searchItemInput)">
            <font-awesome-icon icon="magnifying-glass" />
        </span>
    </div>
</template>

<style scoped>

    .input-group {
        position: relative;
    }

    #closeSearch {
        position: absolute;
        right: 25%;
        top: 30%;
        opacity: 0.7;
    }

    .input-group #closeSearch {
        cursor: pointer !important;
        z-index: 10;
    }

    #closeSearch * {
        height: 1.25em;
    }

    input {
        padding-right: 30px;
    }

</style>