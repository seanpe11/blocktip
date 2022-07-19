import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from 'chai';
import { Blocktip } from "../target/types/blocktip";


describe("blocktip", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktip as Program<Blocktip>;
  const profile = anchor.web3.Keypair.generate()

  it("Initializes Profile!", async () => {
    // Add your test here.
    const [userProfilePDA, _] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("profile"),
          program.provider.wallet.publicKey.toBuffer(),
        ],
        program.programId,
      )

    await program.methods.initProfile(true, program.provider.wallet.publicKey)
      .accounts({
        profile: userProfilePDA
      })
      .rpc()
    
    
    const profileAccount = await program.account.profile.fetch(userProfilePDA)
    // ts-ignore (provider does contain wallet)
    assert.isTrue(profileAccount.donationAddress.equals(program.provider.wallet.publicKey))
    assert.isTrue(profileAccount.royalty)
    assert.isTrue(profileAccount.totalDonations.eq(new anchor.BN(0)))
  });

  it("Sends a blocktip!", async () => {
    const blockTip = anchor.web3.Keypair.generate()
    const amount = new anchor.BN(1000);
    await program.methods.sendBlockTip(amount, "hello")
      .accounts({
        blockTip: blockTip.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([blockTip])
      .rpc()
    
    const blockTipAccount = await program.account.blockTip.fetch(blockTip.publicKey)
    assert.isTrue(blockTipAccount.from.equals(program.provider.wallet.publicKey))
    assert.strictEqual(blockTipAccount.message, "hello")
    assert.isTrue(blockTipAccount.amount.eq(amount))
  })
});
