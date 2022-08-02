<script lang="ts">
	import initProfile from '../../rpc/initProfile';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-anchor';
</script>

<button
	class="rounded-full font-semibold bg-yellow-300 p-3"
	on:click={() => initProfile($walletStore.publicKey, $workSpace.program)}
>
	Create profile
</button>
