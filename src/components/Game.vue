<template>
  <div class="game">
    <dealer ref="dealer" @result="postexec" />
    <div class="message">
      {{ mainMessage }}
    </div>
    <div class="message result">
      {{ resultMessage }}
    </div>
    <player ref="player1" @stand="stand" @deal="deal" :showButtons="showButtons" />
    <player ref="player2" @stand="stand" @deal="deal" :showButtons="showButtons" />
    <player ref="player3" @stand="stand" @deal="deal" :showButtons="showButtons" />
    <player ref="player4" @stand="stand" @deal="deal" :showButtons="showButtons" />

  </div>
</template>

<script>
  import Dealer from './Dealer'
  import Player from './Player'
  export default {
    name: "game",
    components: { Dealer, Player },
    data () {
      return {
        mainMessage: 'Welcome to Oichyo Kabu',
        playersResult: 0,
        dealersResult: 0,
        showButtons: "choice",
      }
    },
    methods: {
      stand: function (playersResult) {
        this.playersResult = playersResult;
        this.$refs.dealer.$emit('postexec', playersResult === 'Bust')
      },
      postexec: function (dealersResult) {
        this.dealersResult = dealersResult
        this.showButtons = false
        this.mainMessage = `Dealer : ${dealersResult} / Player : ${this.playersResult}`
      },
      deal: function () {
        // 各playerにカードを配る
        this.$refs.dealer.hit();
        this.$refs.player1.hit();
        this.$refs.player2.hit();
        this.$refs.player3.hit();
        this.$refs.player4.hit();

        // 選択したカード以外のボタンを隠す
        var obj = this.$refs;
        Object.keys(obj).forEach(function (key) {
          if (key == 'dealer') {
            return;
          }

          if (obj[key].$data.choiced) {
            obj[key].showButtons = "choiced";
            return;
          }

          obj[key].showButtons = false;
        });
      }
    },
    computed: {
      resultMessage: function () {
        if (this.showButtons) {
          return ''
        }
        if (this.playersResult > this.dealersResult || this.dealersResult === 'Bust') {
          return 'You Win'
        }
        if (this.playersResult < this.dealersResult || this.playersResult === 'Bust') {
          return 'You Lose'
        }
        return 'Draw'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
  }
  .message {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 2rem;
  }
  .result {
    font-size: 3rem;
    color: orangered;
  }
</style>
