<script lang="ts">
	import { onMount } from 'svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletProvider, WalletMultiButton, WalletConnectButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider, workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
	import { clusterApiUrl } from '@solana/web3.js';
	import idl from '../assets/idl.json';
	import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

	import initProfile from '../rpc/initProfile';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');

	let wallets: PhantomWalletAdapter[];

	onMount(async () => {
		// const { PhantomWalletAdapter } = await import('@solana/wallet-adapter-wallets')

		wallets = [new PhantomWalletAdapter()];
	});

</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<AnchorConnectionProvider network="http://127.0.0.1:8899" {idl} />
<div class="layout">
	<slot />
	<WalletMultiButton />
	{$walletStore.publicKey}

	<button on:click={() => initProfile($walletStore.publicKey, $workSpace.program)}>
		Init profile
	</button>
</div>


<style>
	* {
		font-family: 'Open sans', sans-serif;
	}

	.layout {
		min-height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>