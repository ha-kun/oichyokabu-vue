<template>
  <div class="dealer">
    <div class="flex">
      <card v-for="(card, index) in hand" :key="index" :suit="card.suit" :number="card.number" :hide="card.hide"></card>
    </div>
  </div>
</template>

<script>
  import pick from '../utils/deck'
  import calc from '../utils/calc'
  import Card from './Card'
  export default {
    name: 'dealer',
    components: { Card },
    data () {
      return {
        hand: []
      }
    },
    created: function () {
      this.hand.push(pick());
      this.$on('postexec', this.postexec)
    },
    methods: {
      postexec (playerBust) {
        this.hand[0].hide = false;
        this.hand[1].hide = false;
        while (!playerBust && calc(this.hand) < 5) {
          this.hand.push(pick())
        }
        this.$emit('result', calc(this.hand))
      },
      hit () {
        this.hand.push(pick());
        this.hand[1].hide = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    justify-content: center;
  }
</style>
