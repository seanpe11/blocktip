import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Blocktip } from "../target/types/blocktip";

describe("blocktip", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktip as Program<Blocktip>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.sendBlockTip().rpc();
    console.log("Your transaction signature", tx);
  });
});
