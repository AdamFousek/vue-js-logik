<template>
    <div class="pallete" :style="palleteColor"></div>
</template>

<script>
export default {
    computed: {
        palleteColor() {
            return {
                'background-color': this.color,
            };
        },
    },
    props: ['color'],
};
</script>

<style scoped>
.pallete {
    min-width: 35px;
    min-height: 35px;
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
    border: 1px solid #aaa;
}
</style>
