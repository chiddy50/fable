import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION } from "./data";

export const transfer = async (wallet: WalletContextState, amount: any)  => {
    if (!wallet || !wallet.connected || !wallet.publicKey) {
        throw new Error("Wallet not found...");
    }

    const public_account = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS;
    if (!public_account) {
        throw new Error("Could not identify the receiver account");
    }

    console.log({coversion: Math.round(amount * LAMPORTS_PER_SOL)});
    
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(public_account),
            lamports: Math.round(amount * LAMPORTS_PER_SOL)
        })
    );

    transaction.feePayer = wallet.publicKey;

    const { blockhash } = await CONNECTION.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    if (!wallet.signTransaction) {
        throw new Error("Wallet does not support signing transactions");
    }
    
    const signedTransaction = await wallet.signTransaction(transaction);
    console.log({signedTransaction});

    const signature = await CONNECTION.sendRawTransaction(signedTransaction.serialize());
    console.log({signature});
    
    await CONNECTION.confirmTransaction(signature, 'finalized');
}