<script lang="ts">
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
</script>

<nav class="w-100 flex justify-between items-center shadow-md px-6 py-2 rounded-full">
	<div class="font-medium flex gap-4">
		<a href="/">Blocktip</a>
		<a href="/explore">Explore Creators</a>
	</div>

	<div class="rounded-full overflow-hidden">
		<WalletMultiButton />
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		background-color: rgb(255, 255, 255);
	}

	a {
		text-decoration: none;
		color: #000;
	}
</style>
