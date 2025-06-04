<script setup>
    import { watch } from "vue";

    const props = defineProps(['msg']);
    const emit = defineEmits(['closeAlert']);

    watch(() => props.msg, (oldValue, newValue) => {

    });

    function closeAlert()
    {
        emit('closeAlert');
    }
</script>

<template>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" id="alert">
        <font-awesome-icon icon="triangle-exclamation" />
        <!-- v-html="variable" permet d'interpréter les balises HTML -->
        &nbsp; <span v-html="msg"></span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="closeAlert"></button>
    </div>
</template>