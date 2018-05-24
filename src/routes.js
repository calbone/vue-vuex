// import Signin from '@/components/login/Signin';
import Signup from '@/components/login/Signup';
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
  ]
}