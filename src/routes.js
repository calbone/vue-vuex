import Signin from '@/components/login/Signin';
// import Signup from '@/components/login/signup';
import Spam from '@/components/admin/spam';

export default {
  mode: 'history',
  routes: [
    {
      path: '/', component: Spam, name: 'Spam'
    },
    {
      path: '/signin', component: Signin, name: 'Signin'
    },
  ]
}