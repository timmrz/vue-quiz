<template>
    <div @click=" handleClick "
         :class=" classObject "
         class="py-3 sm:py-7 px-5 sm:px-7 flex justify-center items-center text-2xl sm:text-4xl border-2 border-gray-950 rounded-md cursor-pointer">
        <span
              v-html=" text "></span>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: {
        text: {
            reqired: true,
            type: String
        },
        correctAnswer: {
            required: true,
            type: Boolean
        }
    },

    computed: {
        classObject() {
            return {
                'bg-red-300': this.$store.state.showAnswer && !this.correctAnswer,
                'bg-green-300': this.$store.state.showAnswer && this.correctAnswer,
                'hover:bg-green-200': !this.$store.state.showAnswer
            }
        }

    },
    methods: {
        ...mapMutations(['clickAnswer', 'incrementScore']),
        handleClick() {
            if (this.correctAnswer) {
                this.incrementScore()
            }
            this.clickAnswer()
        }
    }
}

</script>

<style scoped></style>