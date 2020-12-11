<template>
    <section>
        <div class="row hidden-pins">
            <div class="guessNumber">
                <span class="guessNo">-</span>
            </div>
            <div :style="setPinsWidth()">
                <base-guess
                    v-for="(color, index) in hiddenPins"
                    class="guessPin"
                    :key="index"
                    :color="isOver ? color : 'black'"
                ></base-guess>
            </div>
            <div :style="setResultWidth()">
                <base-result-pin
                    v-for="(color, index) in hiddenPins"
                    :key="index"
                ></base-result-pin>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['hiddenPins', 'isOver'],
    inject: ['setPinsWidth', 'setResultWidth'],
};
</script>

<style scoped>
.hidden-pins {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.guessResults {
    margin-left: 15px;
}
.guessNumber {
    margin-right: 15px;
}
</style>
