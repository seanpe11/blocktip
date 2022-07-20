import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	// ...
	define: {
		'process.env.BROWSER': true
	},
	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer']
	}
};

export default config;
