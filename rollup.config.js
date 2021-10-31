import { terser } from 'rollup-plugin-terser';

export default {
    input: 'static/js/app2/module1.js',
    output: [{
        file: 'static/bundle.js',
        format: 'esm'
    },
    {
        file: 'static/bundle.min.js',
        format: 'esm',
        name: 'version',
        plugins: [terser()]
    }
    ] 
};