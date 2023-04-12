import axios from 'axios'
import { createStore } from 'vuex'
import ShortUniqueId from 'short-unique-id';

export const uid = new ShortUniqueId();


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // generate a random index
        [array[i], array[j]] = [array[j], array[i]]; // swap elements using destructuring assignment
    }
    return array;
}

export const store = createStore({


    state: {
        step: 0,
        questions: [],
        currentQuestion: 1,
        showAnswer: false,
        stats: localStorage.getItem('quiz-score') ? JSON.parse(localStorage.getItem('quiz-score')) : [],
        loading: false
    },

    getters: {
        getCurrentQuestion(state) {

            return state.questions[state.currentQuestion - 1]

        },

        getCorrectAnswer(state) {
            return state.questions[state.currentQuestion - 1].correct_answer
        },

        getQuantityCorrect: (state) => (index) => {
            return state.stats[index].correct
        },

        getQuantityQuestions: (state) => (index) => {
            return state.stats[index].quantity
        },

        getTime: (state) => (index) => {

            const hours = Math.floor(state.stats[index].timeSpent / 3600);
            const minutes = Math.floor((state.stats[index].timeSpent % 3600) / 60);
            const seconds = state.stats[index].timeSpent % 60;
            if (hours > 0) {
                return `${ hours.toString().padStart(2, '0') }:${ minutes.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }`;
            }

            return `${ minutes.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }`
        }

    },

    mutations: {

        startQuiz(state) {
            state.loading = false;
            state.step = 1;

            if (state.stats.length >= 5) {
                state.stats.pop()
            }

            state.stats.unshift({
                quantity: state.questions.length,
                correct: 0,
                id: uid(),
                timeSpent: 0
            })
        },

        changeStep(state, value) {
            state.step = value;
        },

        updateQuestions(state, questions) {
            state.questions = questions
        },

        nextQuestion(state) {
            state.currentQuestion += 1
            state.showAnswer = false

        },

        seeResult(state) {
            state.currentQuestion = 1;
            state.showAnswer = false;
            state.step = 2;
            localStorage.setItem('quiz-score', JSON.stringify(state.stats))
        },

        clickAnswer(state) {
            state.showAnswer = true
        },

        incrementScore(state) {
            if (!state.showAnswer) {
                state.stats[0].correct++
            }
        },

        updateTimeSpent(state, time) {
            state.stats[0].timeSpent += time;
        },

        setLoading(state, value) {
            state.loading = value;
        }

    },

    actions: {
        async fetchQuestions(ctx) {
            ctx.commit('setLoading', true)
            try {
                const { data } = await axios.get('https://opentdb.com/api.php?amount=5')
                const questions = data.results


                const newQuestions = questions.map(q => {
                    return {
                        id: uid(),
                        question: q.question,
                        correct_answer: q.correct_answer,
                        answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
                    }
                })

                ctx.commit('updateQuestions', shuffleArray(newQuestions))
            } catch (error) {
                alert(error)
            }

        }
    }


})