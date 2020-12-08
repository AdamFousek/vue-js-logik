<template>
    <div class="col-md-3 pallete-grid">
        <base-pin
            v-for="color in colors"
            :key="color"
            :color="color"
        ></base-pin>
    </div>
</template>

<script>
export default {
    props: ['colors'],
};
</script>

<style scoped></style>
