use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod blocktip {
    use super::*;

    pub fn init_profile(ctx: Context<InitProfile>, royalty: bool) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.donation_address = *ctx.accounts.signer.to_account_info().key;
        profile.royalty = royalty;
        profile.total_donations = 0;
        profile.bump = *ctx.bumps.get("profile").unwrap();
        Ok(())
    }

    pub fn update_royalty(ctx: Context<UpdateRoyalty>, royalty: bool) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.royalty = royalty;

        Ok(())
    }

    pub fn send_block_tip(ctx: Context<SendBlockTip>, amount: u64, message: String) -> Result<()> {
        let block_tip = &mut ctx.accounts.block_tip;
        block_tip.from = *ctx.accounts.signer.to_account_info().key;
        block_tip.amount = amount;
        block_tip.message = message;

        // let cpi_accounts = Transfer {
        //     from: ctx.accounts.from.to_account_info().clone(),
        //     to: ctx.accounts.from.to_account_info().clone(),
        //     authority: ctx.accounts.signer.to_account_info().clone(),
        // };
        // let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        // let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        // token::transfer(cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitProfile<'info> {
    #[account(
        init,
        payer = signer,
        space = Profile::LEN,
        seeds = [b"profile", signer.key().as_ref()], bump
    )]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct SendBlockTip<'info> {
    #[account(init, payer = signer, space = BlockTip::LEN)]
    pub block_tip: Account<'info, BlockTip>,
    // #[account(mut)]
    // pub from: Account<'info, TokenAccount>,
    // #[account(mut)]
    // pub to: Account<'info, TokenAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    // import the token program too when transfer implemented
    pub system_program: Program<'info, System>,
    // pub token_program: Program<'info, Token>,
}
#[derive(Accounts)]
pub struct UpdateRoyalty<'info> {
    #[account(
        mut,
        has_one = donation_address,
    )]
    pub profile: Account<'info, Profile>,
    pub donation_address: Signer<'info>,
}

#[account]
pub struct BlockTip {
    from: Pubkey,
    to: Pubkey,
    mint: Pubkey,
    amount: u64,
    message: String,
}
impl BlockTip {
    pub const LEN: usize = 8 + // 680 bytes,  0.005 sol rent
        32 + // from
        32 + // to
        32 + // mint
        8 + // amount
        4 + 140*4; // string discriminator + max size
}

#[account]
pub struct Profile {
    donation_address: Pubkey,
    royalty: bool,
    total_donations: u64,
    bump: u8,
}
impl Profile {
    pub const LEN: usize = 8 + // 50 bytes, 0.001 sol rent
        32 + // address (supposedly wallet address of profile)
        1 + // royalty
        8 +  // total_donations
        1; // bump
}
