<script lang="ts">
	import InitProfileButton from '../components/buttons/InitProfileButton.svelte';
	import CreatePageInput from '../components/inputs/CreatePageInput.svelte';
	import ImageUpload from '../components/inputs/ImageUpload.svelte';
	import { page } from '$app/stores';

	let inputs = {
		name: '',
		username: $page.url.searchParams.get('username') ?? '',
		about: '',
		website: ''
	};

	$: console.table(inputs);
</script>

<form class="flex flex-col items-center justify-center pt-20 gap-10 mx-auto w-full max-w-md">
	<h1 class="font-medium text-3xl">Complete your page</h1>

	<ImageUpload />
	<CreatePageInput bind:value={inputs.name} label="Name" placeholder="Name" name="name" />
	<CreatePageInput
		label="Blocktip link"
		name="link"
		bind:value={inputs.username}
		inline="blocktip.io/"
		placeholder="yourname"
	/>
	<CreatePageInput isTextArea label="About" name="about" bind:value={inputs.about} placeholder="" />
	<CreatePageInput
		label="Website or social link"
		placeholder="https://"
		name="website"
		bind:value={inputs.website}
	/>

	<InitProfileButton />
</form>
