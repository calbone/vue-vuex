<template>
  <nav class="gnav">
      <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1"><a @click.prevent="signOut">Sign out</a></el-menu-item>
      </el-menu>
  </nav>
</template>

<script>
import Vue from 'vue';
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';
import firebase from 'firebase';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
  name: 'NavLink',
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style lang="scss">
.gnav {
  color: #c0ccda;
  height: 60px;
  width: 100%;
  min-width: 650px;
  .el-menu {
      background: #324057;
  }

  .el-menu-item {
    padding: 0;

    & > a {
        display: block;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        color: #00bcd4;
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