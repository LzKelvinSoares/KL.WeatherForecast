import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: (prop) => {
            return '';
        }
    })
});

Object.defineProperty(global, 'define', {
    value: () => ({})
});
