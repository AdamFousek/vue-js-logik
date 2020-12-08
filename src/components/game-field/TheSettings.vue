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
    </section>
</template>

<script>
export default {
    emits: ['set-settings'],
    name: 'TheSettings',
    data() {
        return {
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
    },
};
</script>

<style scoped>
section {
    margin-bottom: 3rem;
}
</style>
