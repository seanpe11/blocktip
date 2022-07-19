import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from 'chai';
import { Blocktip } from "../target/types/blocktip";


describe("blocktip", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktip as Program<Blocktip>;
  const profile = anchor.web3.Keypair.generate()

  it("Initializes Profile!", async () => {
    // Add your test here.
    await program.methods.initProfile(true)
      .accounts({
        profile: profile.publicKey
      })
      .signers([profile]) // problem here is that it needs to be for wallet signer
      .rpc()
    
    
    const profileAccount = await program.account.profile.fetch(profile.publicKey)
    // ts-ignore (provider does contain wallet)
    assert.isTrue(profileAccount.address.equals(program.provider.wallet.publicKey))
    assert.isTrue(profileAccount.royalty)
    assert.isTrue(profileAccount.totalDonations.eq(new anchor.BN(0)))
  });
});
