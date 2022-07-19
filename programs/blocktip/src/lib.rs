use anchor_lang::prelude::*;
// use anchor_spl::{
//     associated_token::AssociatedToken,
//     token::{Mint, TokenAccount}
// };
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod blocktip {
    use super::*;

    pub fn init_profile(ctx: Context<InitProfile>, royalty: bool) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.address = *ctx.accounts.signer.to_account_info().key;
        profile.royalty = royalty;
        profile.total_donations = 0;
        Ok(())
    }

    pub fn send_block_tip(ctx: Context<SendBlockTip>, amount: u64, message: String) -> Result<()> {
        let block_tip = &mut ctx.accounts.block_tip;
        block_tip.from = *ctx.accounts.signer.to_account_info().key;
        block_tip.amount = amount;
        block_tip.message = message;
        block_tip.royalty = false;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitProfile<'info> {
    #[account(init, payer = signer, space = Profile::LEN)]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
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
    pub const LEN: usize = 8 + // anchor discriminator 
        32 + // from
        32 + // to
        32 + // mint
        8 + // amount
        4 + 256; // string discriminator + max size
}

#[account]
pub struct Profile {
    address: Pubkey,
    royalty: bool,
    total_donations: u64,
}
impl Profile {
    pub const LEN: usize = 8 + // anchor discriminator 
        32 + // address (supposedly wallet address of profile)
        1 + // royalty
        8; // total_donations
}
