<template>
    <div class="h-full py-4 sm:py-8 text-center flex flex-col justify-between align-middle">
        <div>
            <h2 class="font-bold py-4 sm:py-8 text-green-700 text-3xl sm:text-6xl">Congrats on finishing
                Quiz Quest!!!</h2>
            <p class=" text-3xl sm:text-5xl py-4">{{ $store.getters.getTime( 0 ) }}</p>
            <p class="text-xl sm:text-3xl sm:pt-4">You answered {{ getQuantityCorrect( 0 ) }} out of {{
                getQuantityQuestions( 0 ) }} questions correctly </p>
            <p :class=" classObject " class="text-4xl sm:text-6xl font-bold py-4 sm:py-8">{{ getProcent
            }}%</p>
            <p class="text-xl sm:text-3xl">{{ feedback }}</p>
        </div>
        <div class="mb-20 flex gap-6 justify-center flex-wrap">
            <MyButton @click=" changeStep( 0 ) ">Restart Game</MyButton>
            <MyButton @click=" changeStep( 3 ) ">My Latest Games</MyButton>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MyButton from './UI/MyButton.vue';

export default {
    components: { MyButton },
    computed: {
        ...mapGetters(['getQuantityCorrect', 'getQuantityQuestions']),
        getProcent() {
            return Math.round(this.getQuantityCorrect(0) / this.getQuantityQuestions(0) * 100)
        },
        feedback() {
            return this.getProcent > 50 ? 'This is a great result, you did well!!!' : 'You need to try harder next time!!!'
        },
        classObject() {
            return this.getProcent > 50 ? 'text-green-600' : 'text-red-600'

        }
    },
    methods: {
        ...mapMutations(['changeStep']),

    }

}
</script>

<style scoped></style>