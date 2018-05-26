import Signup from '@/components/login/Signup';
import Signin from '@/components/login/Signin';
import Spam from '@/components/admin/spam';

export default {
  mode: 'history',
  routes: [
    {
      path: '/', component: Spam, name: 'Spam'
    },
    {
      path: '/signup', component: Signup, name: 'Signup'
    },
    {
      path: '/signin', component: Signin, name: 'Signin'
    },
  ]
}