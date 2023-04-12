<template>
    <div class="h-full py-4 sm:py-8 text-center flex flex-col justify-between align-middle">
        <div>
            <h2 class="font-bold py-4 text-green-700 text-3xl sm:text-6xl">Here is your statistic for
                the last {{ $store.state.stats.length }} games</h2>
        </div>
        <ul>
            <li class="flex justify-around items-center py-3"
                v-for="(item, index) in $store.state.stats"
                :key=" item.id ">
                <div class="font-bold text-2xl sm:text-3xl">#{{ index + 1 }}</div>
                <div :class=" classObject( index ) " class="text-2xl sm:text-3xl">{{ getProcent( index )
                }}%</div>
                <div class="text-2xl sm:text-3xl">{{ $store.getters.getTime( index ) }}</div>
            </li>
        </ul>
        <div class=" mb-10 sm:mb-20 flex gap-6 justify-center flex-wrap">
            <MyButton @click=" changeStep( 0 ) ">Restart Game</MyButton>
            <MyButton @click=" changeStep( 2 ) ">Back</MyButton>
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

    },

    methods: {
        ...mapMutations(['changeStep']),
        getProcent(index) {
            return Math.round(this.getQuantityCorrect(index) / this.getQuantityQuestions(index) * 100)
        },

        classObject(index) {
            return this.getProcent(index) > 50 ? 'text-green-600' : 'text-red-600'

        }

    }

}
</script>

<style scoped></style>