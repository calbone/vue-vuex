<template>
  <div id="app">
    <Nav-Link></Nav-Link>
    <router-view></router-view>
  </div>
</template>

<script>
import NavLink from './components/NavLink';
import './styles/app.scss';

export default {
  name: 'app',
  components: {
      NavLink
  }
}
</script>
