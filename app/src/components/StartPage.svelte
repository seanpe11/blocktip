<script lang="ts">
	let username: string;
</script>

<form
	class="text-2xl shadow-md rounded-full flex items-center justify-between py-2 px-3"
	action="/create-page"
>
	<div class="p-3">
		<span class="font-semibold">blocktip.io/</span>
		<input
			type="text"
			name="username"
			placeholder="yourname"
			id="username"
			class="focus:outline-none"
			bind:value={username}
		/>
	</div>
	<button class="rounded-full font-semibold bg-yellow-300 py-3 px-6" type="submit">
		Start Page
	</button>
</form>
