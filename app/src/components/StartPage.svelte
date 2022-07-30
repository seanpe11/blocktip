<script lang="ts">
	async function handleSubmit(e: Event) {
		e.preventDefault();
		console.log(username);
	}

	let username: string;
</script>

<form
	on:submit={handleSubmit}
	class="text-2xl shadow-md rounded-full flex items-center justify-between py-2 px-3"
>
	<div class="p-3">
		<span class="font-semibold">blocktip.io/</span>
		<input
			type="text"
			name="handle"
			placeholder="yourname"
			id="handle"
			class="focus:outline-none"
			bind:value={username}
		/>
	</div>
	<button class="rounded-full font-semibold bg-yellow-300 py-3 px-6" type="submit">
		Start Page
	</button>
</form>
