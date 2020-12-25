import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import url from 'postcss-url';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs-extra';
import path from 'path';

fs.emptyDirSync('dist')

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		dir: 'dist',
		entryFileNames: production ? 'static/[name].[hash].js' : 'static/build.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		postcss({
      plugins: [
				url({
					url: 'copy',
					// base path to search assets from
					basePath: path.resolve('public/'),
					// dir to copy assets
					assetsPath: './img',
					// using hash names for assets (generates from asset content)
					useHash: true
				})
			],
			to: path.resolve('./dist/builde.css')
    }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		html({
			attributes: {html: { lang: 'zh-CN' }},
			meta: [{ charset: 'utf-8' }, {name: 'viewport', content: 'width=480,user-scalable=no'}],
			title: '碧蓝幻想 抽卡模拟器'
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('dist'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
