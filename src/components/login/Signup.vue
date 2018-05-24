<template>
    <div class="signup">
        <img src="../../assets/logo.png">
      <h1 class="signup__title">Sign up</h1>
      <div class="signup__input">
          <el-input placeholder="Username" size="medium" v-model="username"></el-input>
          <el-input placeholder="Password" size="medium" v-model="password"></el-input>
          <el-button @click="signUp">Sign up</el-button>
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
  name: 'Signup',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
      .then(user => {
        alert('Create account: ', user.email);
        this.username = '';
        this.password = '';
      })
      .catch(error => {
        alert(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
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
