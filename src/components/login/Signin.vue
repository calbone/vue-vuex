<template>
    <div class="signin">
      <img src="../../assets/logo.png">
      <h1 class="signin__title">Sign in</h1>
      <div class="signin__input">
          <el-input placeholder="Username" size="medium" v-model="username"></el-input>
          <el-input placeholder="Password" size="medium" v-model="password"></el-input>
          <el-button @click="signIn">sign in</el-button>
          <router-link to="/signup">Sign up</router-link>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Input, Button } from 'element-ui';
import firebase from 'firebase';
Vue.use(Input);
Vue.use(Button);

export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
      .then(user => {
        if(user) {
          alert('Success!');
          this.$router.push('/');
        }
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 16px;
    img {
        margin-bottom: 15px;
    }
    &__title {
        font-size: 24px;
        margin-bottom: 30px;
    }
    &__input {
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-input {
            width: 200px;
            margin-bottom: 20px;
        }
    }
}
</style>
