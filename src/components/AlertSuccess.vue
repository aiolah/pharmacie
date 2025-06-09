<script setup>
    import { watch } from "vue";

    const props = defineProps(['msg']);
    const emit = defineEmits(['closeAlert']);

    watch(() => props.msg, (oldValue, newValue) => {

    });
</script>

<template>
    <div class="alert alert-success alert-dismissible fade show" role="alert" id="alert">
        <font-awesome-icon icon="circle-check" />
        &nbsp; {{ msg }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="$emit('closeAlert')"></button>
    </div>
</template>