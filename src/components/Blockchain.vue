<template>
  <div class="flex flex-col gap-5 justify-center items-center max-w-[740px] mx-auto">
    <h1 class="font-bold text-2xl">Blockchain</h1>
    <div class="flex gap-20">
      <button
      class="py-2 px-5 rounded-xl bg-lime-600 hover:bg-lime-500 duration-300"
      @click="start"
    >
      Start
    </button>
    <button
      class="py-2 px-5 rounded-xl bg-red-600 hover:bg-red-500 duration-300"
      @click="stop"
    >
      Stop
    </button>
    <button
      class="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 duration-300"
      @click="reset"
    >
      Reset
    </button>
    </div>
    <p class="font-bold">Total Sum: {{ totalPrice / 100000000 }} BTC</p>
    <table>
      <thead>
        <tr>
          <th class="p-5 border-2 border-slate-300 w-72">From</th>
          <th class="p-5 border-2 border-slate-300 w-72">To</th>
          <th class="p-5 border-2 border-slate-300 w-[164px]">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td class="p-5 text-center break-words max-w-72 border-2 border-slate-300">{{ transaction.inputs[0].prev_out.addr }}</td>
          <td class="p-5 text-center break-words max-w-72 border-2 border-slate-300">{{ transaction.out[0].addr }}</td>
          <td class="p-5 text-center border-2 border-slate-300">{{ transaction.inputs[0].prev_out.value / 100000000 }} BTC</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      transactions: [],
      totalPrice: 0,
    };
  },
  methods: {
    start() {
      this.ws = new WebSocket("wss://ws.blockchain.info/inv");

      this.ws.onopen = () => {
        this.ws.send('{"op":"unconfirmed_sub"}');
      };

      this.ws.onmessage = (event) => {
        const transaction = JSON.parse(event.data);
        this.transactions.push(transaction.x);
        this.totalPrice += transaction.x.inputs[0].prev_out.value;
      };
    },
    stop() {
      if (this.ws) {
        this.ws.close();
      }
    },
    reset() {
      this.transactions = [];
      this.totalPrice = 0;
    },
  },
  beforeDestroy() {
    this.stop();
  },
};
</script>

<style scoped></style>
