module.export = {
    presets:[
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '3.0'
            }
        ]
    ]
};