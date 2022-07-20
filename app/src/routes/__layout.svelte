<script lang="ts">
	import { onMount } from 'svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider, workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { clusterApiUrl } from '@solana/web3.js';
	import idl from '../assets/idl.json';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');

	let wallets: PhantomWalletAdapter[];

	onMount(async () => {
		// const { PhantomWalletAdapter } = await import('@solana/wallet-adapter-wallets')

		wallets = [new PhantomWalletAdapter()];
	});
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider {network} {idl} />
<div>
	<slot />
</div>
<WalletMultiButton />
