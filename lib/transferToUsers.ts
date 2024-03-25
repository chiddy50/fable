import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION, getKeypair, umi } from "./data";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";

export const transferToUsers = async (publicKey: string, amount: number) => {
    if (!publicKey) {
        throw new Error("publicKey not found...");
    }

    const keypair = await getKeypair(); // Assuming getKeypair() is implemented elsewhere

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(keypair.publicKey),
            toPubkey: new PublicKey(publicKey),
            lamports: amount * LAMPORTS_PER_SOL
        })
    );

    transaction.feePayer = new PublicKey(keypair.publicKey);

    const { blockhash } = await CONNECTION.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    const signedTransaction = await keypair.signTransaction(transaction);
    const signature = await CONNECTION.sendRawTransaction(signedTransaction.serialize());
    await CONNECTION.confirmTransaction(signature, 'finalized');
}

function getPublicKeyFromPrivateKey(privateKey) {
    const privateKeyUint8Array = new Uint8Array(privateKey);
    console.log(privateKeyUint8Array);
    
    const keypair = Keypair.fromSecretKey(privateKeyUint8Array);

    // Get the public key from the keypair
    const publicKey = keypair.publicKey.toBase58();
    return publicKey;
}