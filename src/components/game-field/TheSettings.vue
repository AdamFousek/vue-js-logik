<template>
    <section class="container">
        <h2>Settings</h2>
        <div class="form-group">
            <label>How many pins?</label>
            <select class="form-control" v-model="pinsNumber">
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
        </div>
        <div class="form-group">
            <label>How many guesses?</label>
            <select class="form-control" v-model="numberOfGuesses">
                <option>10</option>
                <option>15</option>
            </select>
        </div>
        <div class="form-check">
            <input
                type="checkbox"
                class="form-check-input"
                v-model="repeateColors"
            />
            <label class="form-check-label" for="exampleCheck1"
                >Repeate color (harder)</label
            >
        </div>
        <button class="btn btn-primary" @click="setSettings">
            Start Game
        </button>
        <button class="btn btn-secondary" @click="openDialog">
            How to play
        </button>
        <base-dialog v-if="howToPlay" title="How to play!" @close="closeDialog">
            <template #default>
                <p>
                    The player tries to guess this combination by creating a
                    combination of X pegs on the guards on the board. The first
                    player evaluates each of his attempts using the evaluation
                    pegs as follows:
                </p>
                <ul>
                    <li>
                        for each peg that the guessing player has placed in the
                        correct color in the correct place, adds a black peg
                        (red in the original version);
                    </li>
                    <li>
                        for each peg that the guessing player has placed in the
                        correct color but in the wrong place, he adds a white
                        peg.
                    </li>
                </ul>
                <p>
                    The guessing player does not know for which peg the pegs
                    have been assigned.
                </p>
                <p>
                    The game ends when the guessing player guesses the
                    combination (the winning attempt is therefore evaluated by
                    the full number of black pegs, the number may vary depending
                    on the version of the game), or when it consumes all the
                    lines on the game board without guessing the combination.
                </p>
            </template>
        </base-dialog>
    </section>
</template>

<script>
export default {
    emits: ['set-settings'],
    name: 'TheSettings',
    data() {
        return {
            howToPlay: false,
            pinsNumber: 4,
            repeateColors: false,
            numberOfGuesses: 10,
        };
    },
    methods: {
        setSettings() {
            this.$emit(
                'set-settings',
                this.pinsNumber,
                this.repeateColors,
                this.numberOfGuesses
            );
        },
        openDialog() {
            this.howToPlay = true;
        },
        closeDialog() {
            this.howToPlay = false;
        },
    },
};
</script>

<style scoped>
section {
    margin-bottom: 3rem;
}
</style>
