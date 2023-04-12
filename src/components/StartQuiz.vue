<template>
    <div class="h-full py-4 sm:py-8 text-center flex flex-col justify-between align-middle">
        <div>
            <h2 class="font-bold py-4 sm:py-8 text-green-700 text-4xl sm:text-6xl">Welcome to the Quiz
                Quest! </h2>
            <p class="text-xl sm:text-3xl py-4">Get ready to test your knowledge with five randomly
                selected questions. </p>
            <p class="text-xl sm:text-3xl">Are you up for the challenge? Let's see how well you do!</p>
            <p class="text-2xl sm:text-4xl text-red-600 font-bold py-4 sm:py-8">Good luck and have fun!
            </p>
        </div>
        <div class="mb-20">
            <QuizLoader v-if=" $store.state.loading " />
            <MyButton @click=" start " v-else> Start Game </MyButton>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import MyButton from './UI/MyButton.vue';
import QuizLoader from './UI/QuizLoader.vue';

export default {
    components: {
        MyButton, QuizLoader
    },
    methods: {
        ...mapMutations(['startQuiz']),
        async start() {
            await this.$store.dispatch('fetchQuestions')
            this.startQuiz();
            this.$emit('startTimer')
        }
    }
}
</script>

<style scoped></style>