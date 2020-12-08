<template>
    <the-header></the-header>
    <the-game></the-game>
    <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheGame from './components/game-field/TheGame.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
    name: 'App',
    components: {
        TheHeader,
        TheGame,
        TheFooter,
    },
};
</script>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: 'Jost', sans-serif;
}

body {
    margin: 0;
}
.selectedColor {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
section {
    margin: 0;
    padding: 0;
}
</style>
