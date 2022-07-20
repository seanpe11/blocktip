import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createWrappedNativeAccount, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID} from '@solana/spl-token'
import { assert } from 'chai';
import { Blocktip } from "../target/types/blocktip";

describe("blocktip", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktip as Program<Blocktip>;

  it("Initializes Profile!", async () => {
    // Add your test here.
    const [userProfilePDA, _] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("profile"),
          program.provider.wallet.publicKey.toBuffer()
        ],
        program.programId,
      )
    
    await program.methods.initProfile(true)
        .accounts({
          profile: userProfilePDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc()
        
    const profileAccount = await program.account.profile.fetch(userProfilePDA)
    // ts-ignore (provider does contain wallet)
    assert.isTrue(profileAccount.donationAddress.equals(program.provider.wallet.publicKey))
    assert.isTrue(profileAccount.royalty)
    assert.isTrue(profileAccount.totalDonations.eq(new anchor.BN(0)))
  });

  it("Sends a native sol blocktip!", async () => {
    const blockTip = anchor.web3.Keypair.generate()
    const amount = new anchor.BN(0.5 * LAMPORTS_PER_SOL);

    const from = await createWrappedNativeAccount(
      program.provider.connection,
      program.provider.wallet.toBuffer(),
      program.provider.wallet.publicKey,
      0.5 * LAMPORTS_PER_SOL,
    )

    await program.methods.sendBlockTip(amount, "hello")
      .accounts({
        blockTip: blockTip.publicKey,
        // from: from,
        // to: from,
        systemProgram: SystemProgram.programId,
        // tokenProgram: TOKEN_PROGRAM_ID
      })
      .signers([blockTip])
      .rpc()
    
    const blockTipAccount = await program.account.blockTip.fetch(blockTip.publicKey)
    assert.isTrue(blockTipAccount.from.equals(program.provider.wallet.publicKey))
    assert.strictEqual(blockTipAccount.message, "hello")
    assert.isTrue(blockTipAccount.amount.eq(amount))
  })
});