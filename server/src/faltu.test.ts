describe('trial', () => {
    test('one', () => {
        const set = new Set();
        set.add({ id: 1, name: 'denny' });
        set.add({ id: 2, name: 'tanima' });
        set.add({ id: 3, name: 'denny' });
        set.add({ id: 1, name: 'denny' });
        console.log(set);
        expect(1).toBe(1);
    });
});
