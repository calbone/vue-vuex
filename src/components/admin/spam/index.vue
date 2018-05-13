<template>
  <spam v-bind="spam.mutation"/>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Spam from './spam.vue';

export default {
  name: 'spamContainer',
  computed: mapState([
    'spam'
  ]),
  methods: mapActions([
    'fetchSpamList'
  ]),
  created() {
    this.fetchSpamList();
  },
  components: {
    Spam
  }
}
</script>
