<script lang="ts">
	export let name: string;
	export let label: string;
	export let placeholder: string = '';
	export let value: string;
	export let inline: string = '';
	export let isTextArea: boolean = false;
</script>

<div class="w-full">
	<label for={name}>
		{label}
	</label>
	<div class="outline outline-2 p-3 rounded-lg mt-2 flex">
		<span class="text-slate-400">{inline}</span>
		{#if !isTextArea}
			<input class="focus:outline-none" {label} {placeholder} {name} bind:value />
		{/if}
		{#if isTextArea}
			<div
				class="focus:outline-none w-full"
				role="textbox"
				contenteditable
				{label}
				{placeholder}
				{name}
				bind:innerHTML={value}
			/>
		{/if}
	</div>
</div>

<style>
	div[role='textbox'] {
		min-height: 100px;
	}
</style>
