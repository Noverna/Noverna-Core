import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

//!TODO: GITHUB_TODO this path to your output Path
const BuildOutputPath =
	'../../../game_server/data_files/resources/Noverna-Core/web'

// https://vitejs.dev/config/
export default defineConfig({
	css: {},
	plugins: [
		svelte({
			/* plugin options */
		}),
	],
	base: './', // fivem nui needs to have local dir reference
	resolve: {
		alias: {
			'@assets': resolve('./src/assets'),
			'@components': resolve('./src/components'),
			'@providers': resolve('./src/providers'),
			'@store': resolve('./src/store'),
			'@utils': resolve('./src/utils'),
			'@typings': resolve('./src/typings'),
		},
	},
	build: {
		emptyOutDir: true,
		outDir: BuildOutputPath,
		assetsDir: './',
		rollupOptions: {
			output: {
				// By not having hashes in the name, you don't have to update the manifest, yay!
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
})
