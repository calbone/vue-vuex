<template>
  <nav class="gnav">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
    </el-menu>
  </nav>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
  name: 'nav-link',
    methods: {
    getLoggedInInfo() {
      let self = this;
      axios.get(`/api/staff/loggedInInfo`)
        .then(response => {
          self.$store.commit('mutateSetLoggedInInfo', {
            loggedInInfo: response.data
          });
          console.log('loggedInInfo', self.$store.state.loggedInInfo.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error
        });
    },
  },
}
</script>

<style lang="scss">
.gnav {
  background: #324057;
  color: #c0ccda;
  height: 60px;
  width: 100%;
  min-width: 650px;

  .el-menu-item {
    padding: 0;

    & > a {
      display: block;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
    }
  }

  .el-menu--horizontal .el-submenu {
    .el-menu-item {
      padding: 0;

      .submenuLink {
        display: block;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
      }
    }
  }
}
</style>