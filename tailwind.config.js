module.exports = {
    purge: ['components/*', 'pages/**/*'],
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn .1s ease-out',
                fadeOut: 'fadeOut .1s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    from: { transform: 'scale(.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' },
                },
                fadeOut: {
                    from: { transform: 'scale(1)', opacity: '1' },
                    to: { transform: 'scale(.95)', opacity: '0' },
                },
            },
        },
    },
    variants: {},
    plugins: [],
};
