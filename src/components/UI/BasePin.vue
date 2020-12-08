<template>
    <div
        class="pallete"
        :style="palleteColor"
        @click="selectColor(color)"
    ></div>
</template>

<script>
export default {
    inject: ['selectColor'],
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
.pallete:hover {
    cursor: pointer;
}
</style>
