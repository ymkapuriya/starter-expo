module.exports = {
    root: true,
    extends: '@react-native-community',
    plugins: ['import'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['app'],
                alias: {
                    _assets: './app/assets',
                    _components: './app/components',
                    _configs: './app/configs',
                    _navigations: './app/navigations',
                    _views: './app/views',
                    _services: './app/services',
                    _styles: './app/styles',
                    _actions: './app/actions',
                    _reducers: './app/reducers',
                },
            },
        },
    },
};