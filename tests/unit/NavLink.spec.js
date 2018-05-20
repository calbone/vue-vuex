import { shallowMount } from '@vue/test-utils';
import NavLink from '@/components/NavLink.vue';

describe('NavLink.vue', () => {

    describe('template', () => {
        test('renders the correct markup', () => {
            const wrapper = shallowMount(NavLink);
            expect(wrapper.isVueInstance()).toBeTruthy();
        })
    })
})