<template>
    <div class="h-full py-4 sm:py-8 text-center flex flex-col justify-between align-middle">
        <div>
            <div class="pb-3 sm:py-5 text-2xl sm:text-4xl">{{ $store.getters.getTime( 0 ) }}</div>
            <h2 class="font-bold py-5 text-green-700 text-3xl sm:text-5xl">
                <span v-html=" getCurrentQuestion.question "></span>
            </h2>
        </div>
        <div class=" my-6 grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2">
            <QuestionAnswer v-for="(answer, index) in getCurrentQuestion.answers" :key=" index "
                            :text= answer 
                            :correctAnswer=" answer == $store.getters.getCorrectAnswer " />
        </div>
        <div class=" basis-1/3 flex items-center justify-center">
            <transition name="button">
                <MyButton v-if=" showNextButton " @click=" nextQuestion "> Next Question </MyButton>
            </transition>
            <transition name="button">
                <MyButton v-if=" showResultButton " @click=" result "> See Result </MyButton>
            </transition>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import MyButton from '@/components/UI/MyButton.vue'
import QuestionAnswer from './QuestionAnswer.vue';

export default {
    components: { MyButton, QuestionAnswer },
    computed: {
        ...mapGetters(['getCurrentQuestion', 'getCorrectAnswer']),
        showNextButton() {
            return this.$store.state.showAnswer && this.$store.state.currentQuestion !== this.$store.state.questions.length
        },
        showResultButton() {
            return this.$store.state.showAnswer && this.$store.state.currentQuestion === this.$store.state.questions.length
        },

    },
    methods: {
        ...mapMutations(['nextQuestion', 'clickAnswer', 'seeResult']),
        result() {
            this.seeResult();
            this.$emit('stopTimer')

        }
    }
}

</script>

<style scoped>
.button-enter-active,
.button-leave-active {
    transform: translateY(0);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.button-enter-from,
.button-leave-to {
    opacity: 0;
    transform: translateY(5px);
}
</style>