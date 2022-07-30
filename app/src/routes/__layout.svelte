<script lang="ts">
	import { onMount } from 'svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider, workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { clusterApiUrl } from '@solana/web3.js';
	import idl from '../assets/idl.json';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	import '../styles/globals.css';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');

	let wallets: PhantomWalletAdapter[];

	onMount(async () => {
		wallets = [new PhantomWalletAdapter()];
	});
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider network="http://127.0.0.1:8899" {idl} />
<div class="wrapper mt-8">
	<Navbar />
	<div class="content">
		<slot />
	</div>
	<Footer />
</div>

<style>
	.wrapper {
		min-height: 100vh;

		display: flex;
		flex-direction: column;

		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.content {
		display: flex;
		flex-direction: column;
	}
</style>
