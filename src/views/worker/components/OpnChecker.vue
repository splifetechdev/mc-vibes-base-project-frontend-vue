<template>
  <v-row
    class="checker"
    style="width: 100%; overflow-y: auto; flex-wrap: nowrap;"
  >
    <v-col
      cols="4"
      v-for="machineId in selectedMachines.filter(
        (mchId) => machineOPNs[mchId]
      )"
      :key="machineId"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-card style="padding: 5px;">
            <h3 style="text-align: center; ">
              {{ getMachineName(machineId) }}
            </h3>
            <div style="max-height: 400px; min-height: 400px; overflow: auto;">
              <v-checkbox
                v-model="selectedMachineOpn.planed[machineId]"
                v-for="opn in machineOPNs[machineId]"
                :key="opn.id"
                :label="opn.label"
                :value="opn.id"
                :disabled="getDisabled(opn.id, machineId)"
                @change="onOpnChange(machineId, opn.id)"
              >
              </v-checkbox>
            </div>

            <v-autocomplete
              v-model="selectedMachineOpn.unplaned[machineId]"
              hide-details
              multiple
              :items="machineUnplanedOPNs[machineId]"
              item-text="label"
              item-value="id"
              dense
              outlined
              @change="onChangeUnplaned(machineId, $event)"
            ></v-autocomplete>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "OpnChecker",
  props: {
    machines: Array,
    machineOPNs: Object,
    machineUnplanedOPNs: Object,
    selectedMachines: Array,
    operations: Array,
    selectedOpnIds: Array,
    operations: Array,
    selectedMachineOpn: Object,
    machineOpnRunning: Object,
  },
  watch: {
    machineOpnRunning: function(val) {
      Object.keys(val).forEach((mchId) => {
        if (val[mchId]) {
          const opns = val[mchId];
          const planedOpns = opns.filter((opnId) =>
            this.machineOPNs[mchId].map((opn) => opn.id).includes(opnId)
          );
          const unplanedOpns = opns.filter((opnId) =>
            this.machineUnplanedOPNs[mchId].map((opn) => opn.id).includes(opnId)
          );

          if (planedOpns.length > 0) {
            this.selectedMachineOpn.planed[mchId] = planedOpns;
            planedOpns.map((opnId) => {
              this.onOpnChange(mchId, opnId);
            });
          }
          if (unplanedOpns.length > 0) {
            unplanedOpns.forEach((opnId) => {
              this.selectedMachineOpn.unplaned[mchId].push(opnId);
            });
            this.onChangeUnplaned(mchId, unplanedOpns);
          }
        }
      });
    },
  },
  methods: {
    checkOpn() {
      this.$emit("checkOpn", this.opn);
    },
    getMachineName(mchId) {
      const machine = this.machines.find((mch) => mch.id === mchId);
      return machine.label;
    },
    getDisabled(opnId, machineId) {
      return this.operations
        .filter((opn) => opn.selected && opn.selectedBy != machineId)
        .map((opn) => opn.id)
        .includes(opnId);
    },
    onChangeUnplaned(machineId, opnIds) {
      if (opnIds.length === 0) {
        const unselectedOpns = this.operations.filter(
          (opn) => opn.selectedBy === machineId
        );
        unselectedOpns
          .filter(
            (opn) => !this.selectedMachineOpn.planed[machineId].includes(opn.id)
          )
          .forEach((opn) => {
            opn.selected = false;
            opn.selectedBy = null;
          });
        this.operations = [...this.operations];
      } else {
        const planedOpnIds = this.selectedMachineOpn.planed[machineId];
        const selectedOpnIds = [...planedOpnIds, ...opnIds];
        const unselectedOpns = this.operations.filter(
          (opn) =>
            !selectedOpnIds.includes(opn.id) && opn.selectedBy === machineId
        );
        selectedOpnIds.forEach((opnId) => {
          const opn = this.operations.find((opn) => opn.id === opnId);
          opn.selected = true;
          opn.selectedBy = machineId;
        });
        unselectedOpns.forEach((opn) => {
          opn.selected = false;
          opn.selectedBy = null;
        });
        this.operations = [...this.operations];
      }
      const unplaned = this.selectedMachineOpn.unplaned[machineId];
      this.selectedMachines.forEach((mchId) => {
        if (mchId != machineId) {
          this.selectedMachineOpn.unplaned[
            mchId
          ] = this.selectedMachineOpn.unplaned[mchId].filter(
            (opn) => !unplaned.includes(opn)
          );
        }
      });
    },
    onOpnChange(machineId, opnId) {
      const opn = this.operations.find((opn) => opn.id === opnId);
      opn.selected = !opn.selected;
      opn.selectedBy = machineId;
      this.operations = [...this.operations];
      if (opn.selected) {
        this.selectedMachines.forEach((mchId) => {
          if (mchId !== machineId) {
            this.machineUnplanedOPNs[mchId] = this.machineUnplanedOPNs[
              mchId
            ].filter((opn) => opn.id !== opnId);
          }
        });
      } else {
        this.selectedMachines.forEach((mchId) => {
          if (mchId !== machineId) {
            this.machineUnplanedOPNs[mchId] = [
              ...this.machineUnplanedOPNs[mchId],
              opn,
            ];
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.checker {
  padding: 10px;
}
</style>
