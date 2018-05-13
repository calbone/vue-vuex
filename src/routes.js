import Spam from './components/admin/spam';

export default {
  mode: 'history',
  routes: [
    {
      path: '/', component: Spam, name: 'spam'
    }
  ]
}