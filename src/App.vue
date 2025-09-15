<template>
  <v-app>
    <Header v-if="$store.state.isLogged" />
       <!-- v-if="$store.state.navMenu" -->
    <Menu   v-if="$store.state.isLogged"/>
    <Content />
  </v-app>
</template>

<script>
import Header from "@/components/core/Header";
import Menu from "@/components/core/Menu";
import Content from "@/components/core/Content";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },
};
</script>

<style>
.signature {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #0730e9, #0730e9);
  background-origin: border-box;
  background-clip: content-box, border-box;
  position: relative;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  max-width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 0;
}

.bg-colorth {
  background-color: #4f4a41;
  color: #ffffff;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>.tabletextwhite {
  color: #ffffff;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>.texttablehcenter {
  color: #ffffff;
  text-align-last: center;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>th>.tabletheader {
  background-color: #aeaeae !important;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
  background-color: #2a4bc1;
  color: white;
}

.v-main__wrap {
  background-color: #f3f3f3;
  /* f3f3f3 ededed */
}

/* input {
    width: 100% !important;
} */

.vue__time-picker input.display-time {
  border: 1px solid rgb(82, 86, 89);
  width: 100% !important;
  border-radius: inherit !important;

}

.vue__time-picker .controls .char {
  color: rgb(82, 86, 89);
}

.vue__time-picker .dropdown,
.vue__time-picker-dropdown {
  width: auto;
  min-width: 200px;
}


.vue__time-picker .dropdown .select-list,
.vue__time-picker-dropdown .select-list {
  width: 100%;
}

.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker-dropdown ul li:not([disabled]).active,
.vue__time-picker-dropdown ul li:not([disabled]).active:hover,
.vue__time-picker-dropdown ul li:not([disabled]).active:focus {
  background: #0730e9;
}

.vue__time-picker {
  width: 100%;
  border-radius: 4px !important;
}

/* .vue__time-picker .dropdown ul, .vue__time-picker-dropdown ul {
    width: 50%;
} */
/* @import '../node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
@import '../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
@import "../node_modules/@syncfusion/ej2-vue-gantt/styles/material.css"; */
/* div{
  position: relative !important;
} */
</style>
