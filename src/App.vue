<template>
  <div class="w-screen h-screen p-4 flex items-center justify-center">
    <div class="w-full h-full max-w-7xl sm:p-8 ">
      <StartQuiz @startTimer=' startTimer ' v-if=" $store.state.step === 0 " />
      <MyQuiz @stopTimer=" stopTimer " v-if=" $store.state.step === 1 " />
      <QuizResult v-if=" $store.state.step === 2 " />
      <LatestStats v-if=" $store.state.step === 3 " />
    </div>
  </div>
</template>

<script>

import StartQuiz from '@/components/StartQuiz.vue'
import MyQuiz from '@/components/MyQuiz.vue'
import QuizResult from '@/components/QuizResult.vue'
import LatestStats from './components/LatestStats.vue'
import { mapMutations } from 'vuex'


export default {
  components: {
    StartQuiz, MyQuiz, QuizResult, LatestStats
  },
  name: 'App',

  methods: {
    ...mapMutations(['updateTimeSpent']),
    startTimer() {
      this.timer = setInterval(() => {
        this.updateTimeSpent(1);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },

}
</script>

<style>
.section-enter-active,
.section-leave-active,
.quiz-enter-active,
.quiz-leave-active {
  transform: translateY(0);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}



.section-enter-from,
.section-leave-to,
.quiz-enter-from,
.quiz-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
