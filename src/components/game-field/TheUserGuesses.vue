<template>
    <section>
        <div class="row guesses" v-for="(guess, i) in allGuesses" :key="i">
            <div class="guessNumber">
                <span class="guessNo">{{ i + 1 }}</span>
            </div>
            <div :style="setPinsWidth()">
                <base-guess
                    v-for="(g, index) in guess"
                    class="guessPin"
                    :key="index"
                    :color="g"
                    @click="$emit('set-color-of-guess', i, index)"
                ></base-guess>
            </div>
            <div :style="setResultWidth()">
                <span class="guessNo">
                    <base-result-pin
                        v-for="r in guessResults[i]"
                        :key="r"
                        :color="r"
                    ></base-result-pin>
                </span>
            </div>
        </div>
        <div class="button-confirm" v-if="!isOver">
            <button class="btn btn-primary" @click="$emit('confirm-guess')">
                Confirm
            </button>
        </div>
        <div class="button-confirm" v-else>
            <button class="btn btn-success" @click="$emit('new-game')">
                New Game!
            </button>
            <button class="btn btn-warning" @click="$emit('back-to-settings')">
                Back To Settings
            </button>
        </div>
    </section>
</template>

<script>
export default {
    props: ['allGuesses', 'guessResults', 'isOver'],
    emits: [
        'confirm-guess',
        'set-color-of-guess',
        'new-game',
        'back-to-settings',
    ],
    inject: ['setPinsWidth', 'setResultWidth'],
};
</script>

<style scoped>
.button-confirm,
.guesses {
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
