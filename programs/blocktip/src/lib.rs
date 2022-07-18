use anchor_lang::prelude::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod blocktip {
    use super::*;

    pub fn send_block_tip(ctx: Context<SendBlockTip>, amount: u64, mint: Pubkey) -> Result<()> {
        let block_tip = &mut ctx.accounts.block_tip;
        block_tip.from = *ctx.accounts.signer.to_account_info().key;
        block_tip.to = *ctx.accounts.to.to_account_info().key;
        block_tip.amount = amount;
        block_tip.mint = mint;
        block_tip.royalty = false;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendBlockTip<'info> {
    #[account(init, payer = signer, space = BlockTip::LEN)]
    pub block_tip: Account<'info, BlockTip>,
    #[account(mut)]
    pub signer: Signer<'info>,
    // import the token program too when transfer implemented
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BlockTip {
    from: Pubkey,
    to: Pubkey,
    mint: Pubkey,
    amount: u64,
    message: String,
    royalty: bool,
}
impl BlockTip {
    pub const LEN: usize = 32 + // from
        32 + // to
        8 + // amount
        4 + 256; // string discriminator + max size
}

#[account]
pub struct Profile {
    address: Pubkey,
    total_donations: u64,
}
