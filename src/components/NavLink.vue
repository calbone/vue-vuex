<template>
  <nav class="gnav">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
    </el-menu>
  </nav>
</template>

<script>
import Vue from 'vue';
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
  name: 'NavLink',
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