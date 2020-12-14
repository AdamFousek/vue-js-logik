<template>
    <section>
        <the-settings
            v-if="!gameIsRunning"
            @set-settings="setSettings"
        ></the-settings>
        <div class="container" v-else>
            <div class="row">
                <div class="col gamePlan">
                    <div class="selectedColor">
                        <div>Selected Color:</div>
                        <base-pin :color="selectedColor"></base-pin>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col gamePlan">
                    <the-hidden-pins
                        :hiddenPins="hiddenPins"
                        :isOver="isOver"
                    ></the-hidden-pins>
                    <the-user-guesses
                        :allGuesses="allGuesses"
                        :guessResults="guessResults"
                        :isOver="isOver"
                        @set-color-of-guess="setColorOfGuess"
                        @confirm-guess="confirmGuess"
                        @new-game="newGame"
                        @back-to-settings="backToSettings"
                    ></the-user-guesses>
                </div>
                <the-pallete :colors="settings.colors"></the-pallete>
                <base-dialog
                    v-if="openDialog && isOver && playerWon"
                    title="You won!"
                    @close="closeDialog"
                >
                    <template #default>
                        <p>
                            You won!
                        </p>
                    </template>
                    <template #actions>
                        <button class="btn btn-success" @click="newGame">
                            New Game!
                        </button>
                        <button class="btn btn-warning" @click="backToSettings">
                            Back To Settings
                        </button>
                    </template>
                </base-dialog>
                <base-dialog
                    v-if="openDialog && isOver && !playerWon"
                    title="You lose!"
                    @close="closeDialog"
                >
                    <template #default>
                        <p>
                            Unfortunetly you lose!
                        </p>
                    </template>
                    <template #actions>
                        <button class="btn btn-success" @click="newGame">
                            Try again!
                        </button>
                        <button class="btn btn-warning" @click="backToSettings">
                            Change settings
                        </button>
                    </template>
                </base-dialog>
            </div>
        </div>
    </section>
</template>

<script>
import TheSettings from './TheSettings.vue';
import ThePallete from './ThePallete.vue';
import TheHiddenPins from './TheHiddenPins.vue';
import TheUserGuesses from './TheUserGuesses.vue';

export default {
    components: {
        TheSettings,
        ThePallete,
        TheHiddenPins,
        TheUserGuesses,
    },
    data() {
        return {
            settings: {
                colors: ['red', 'yellow', 'green', 'blue', 'purple', 'orange'],
                pinsNumber: 0,
                repeateColors: false,
                numberOfGuesses: 0,
            },
            gameIsRunning: false,
            isOver: false,
            playerWon: false,
            openDialog: false,
            hiddenPins: [],
            allGuesses: [],
            guessResults: [],
            selectedColor: 'white',
        };
    },
    methods: {
        newGame() {
            this.resetData();

            this.setSettings(
                this.settings.pinsNumber,
                this.settings.repeateColors,
                this.settings.numberOfGuesses
            );
        },
        backToSettings() {
            this.resetData();
            this.gameIsRunning = false;
        },
        setSettings(pinsNumber, repeateColors, numberOfGuesses) {
            this.settings.pinsNumber = +pinsNumber;
            this.settings.repeateColors = repeateColors;
            this.settings.numberOfGuesses = numberOfGuesses;
            // fill hidden pins with random colors
            var color;
            while (this.hiddenPins.length < this.settings.pinsNumber) {
                color = this.settings.colors[
                    Math.floor(Math.random() * this.settings.colors.length)
                ];
                if (!this.settings.repeateColors) {
                    if (!this.hiddenPins.includes(color)) {
                        this.hiddenPins.push(color);
                    }
                } else {
                    this.hiddenPins.push(color);
                }
            }
            // Create new guesses
            this.createNewGuesses();
            this.gameIsRunning = true;
        },
        setColorOfGuess(row, column) {
            if (this.allGuesses.length - 1 === row) {
                this.allGuesses[row][column] = this.selectedColor;
            }
        },
        createNewGuesses() {
            // Create new empty guesses to be filled
            let guess = new Array(this.settings.pinsNumber);
            this.allGuesses.push(guess);
        },
        selectColor(color) {
            this.selectedColor = color;
        },
        confirmGuess() {
            let index = this.allGuesses.length - 1;
            let guesses = [...this.allGuesses[index]];
            let hiddenPins = [...this.hiddenPins];
            let result = {};
            if (this.allGuesses.length <= this.settings.numberOfGuesses) {
                for (let i = 0; i < this.settings.pinsNumber; i++) {
                    if (guesses[i] === hiddenPins[i]) {
                        result[i] = 'black';
                        hiddenPins[i] = 'done';
                        guesses[i] = '';
                    }
                }
                for (let i = 0; i < this.settings.numberOfGuesses; i++) {
                    if (hiddenPins.indexOf(guesses[i]) !== -1) {
                        result[i] = 'white';
                        hiddenPins[hiddenPins.indexOf(guesses[i])] = 'done';
                    }
                }
                let resultArray = Object.values(result).sort();
                // Fill remains guess pins with grey - neutral - color
                while (resultArray.length < this.settings.pinsNumber) {
                    resultArray.push('grey');
                }
                this.guessResults.push(resultArray);
                if (this.isPlayerWinner(index)) {
                    // If player won, set everything to display dialog
                    this.isOver = true;
                    this.playerWon = true;
                    this.openDialog = true;
                } else {
                    if (
                        this.allGuesses.length != this.settings.numberOfGuesses
                    ) {
                        this.createNewGuesses();
                    } else {
                        this.isOver = true;
                        this.playerWon = false;
                        this.openDialog = true;
                    }
                }
            }
        },
        isPlayerWinner(index) {
            // Checking if all result is black -> hit color and positon then player is winner
            if (this.guessResults[index].length == this.settings.pinsNumber) {
                for (const result of this.guessResults[index]) {
                    if (result !== 'black') {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        resetData() {
            this.isOver = false;
            this.playerWon = false;
            this.gameIsRunning = false;
            this.selectedColor = 'white';
            this.hiddenPins = [];
            this.allGuesses = [];
            this.guessResults = [];
        },
        closeDialog() {
            this.openDialog = false;
        },
        setPinsWidth() {
            return {
                'min-width': this.settings.pinsNumber * 55 + 'px',
            };
        },
        setResultWidth() {
            return {
                'min-width': this.settings.pinsNumber * 20 + 'px',
            };
        },
    },
    provide() {
        return {
            selectColor: this.selectColor,
            setPinsWidth: this.setPinsWidth,
            setResultWidth: this.setResultWidth,
        };
    },
};
</script>

<style scoped>
.selectedColor {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
