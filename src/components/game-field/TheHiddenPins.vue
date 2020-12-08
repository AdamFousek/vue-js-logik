<template>
    <section>
        <div class="hidden-pins">
            <span class="guessNo">-</span>
            <base-guess
                v-for="(color, index) in hiddenPins"
                class="guessPin"
                :key="index"
                :color="isOver ? color : 'black'"
            ></base-guess>
            <base-result-pin
                v-for="(color, index) in hiddenPins"
                :key="index"
            ></base-result-pin>
        </div>
    </section>
</template>

<script>
export default {
    props: ['hiddenPins', 'isOver'],
};
</script>

<style scoped>
.hidden-pins {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
