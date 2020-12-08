<template>
    <div class="result-pin" :style="resultPinColor"></div>
</template>

<script>
export default {
    computed: {
        resultPinColor() {
            return {
                'background-color': this.color,
            };
        },
    },
    props: ['color'],
};
</script>

<style scoped>
.result-pin {
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin: 5px;
    border: 1px solid #aaa;
    background-color: grey;
}
.pallete:hover {
    cursor: pointer;
}
</style>
