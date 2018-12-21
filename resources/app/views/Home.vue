<template>
  <div class="home">
    <a-row>
      <a-col :span="6">
        <a-card title="Transferwise balance">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane
              v-for="(account, index) in transferwiseAccounts"
              :key="index"
              :tab="account.currency"
            >
              <template v-if="account.bankDetails">
                <strong>Accountnumber:</strong>
                {{account.bankDetails.accountNumber}}
              </template>
              <p>
                <strong>Available balance:</strong>
                {{account.amount.value}} {{account.amount.currency}}
              </p>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import transferwise from "@/services/api/transferwise";

export default {
  name: "home",
  data() {
    return {
      transferwiseAccounts: []
    };
  },
  methods: {
    async getBalance() {
      const result = await transferwise.getBalance();
      let accounts = [];
      this.transferwise = result;
      // TODO FOREACH
      this.transferwiseAccounts = accounts;
    },
    callback(key) {
      console.log(key);
    }
  },
  created() {
    this.getBalance();
  }
};
</script>
