<template>
    <div>
        <Nav-Link></Nav-Link>
        <spam v-bind="spam.mutation" />
    </div>
</template>

<script>
    import NavLink from '@/components/NavLink';
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
        Spam,
        NavLink
      }
    }
</script>
