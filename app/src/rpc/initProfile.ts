import * as anchor from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import type { Program } from '@project-serum/anchor';

export default async function initProfile(
	walletKey: PublicKey | null,
	program: Program | undefined
) {
	const [userProfilePDA, _] = await PublicKey.findProgramAddress(
		[anchor.utils.bytes.utf8.encode('profile'), walletKey?.toBuffer() as Buffer],
		program?.programId as PublicKey
	);

	await program?.methods
		.initProfile(true)
		.accounts({
			profile: userProfilePDA,
			systemProgram: SystemProgram.programId
		})
		.rpc();

	const profileAccount = await program?.account.profile.fetch(userProfilePDA);
	console.log(profileAccount);
}
