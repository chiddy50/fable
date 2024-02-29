import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION, getKeypair, umi } from "./data";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";

export const transferToUsers = async (publicKey, amount: any)  => {
    if (!publicKey) {
        throw new Error("Wallet not found...");
    }

    const public_account = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS;
    const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    if (!public_account) {
        throw new Error("Could not identify the sender account");
    }

    const senderPublicKey = getPublicKeyFromPrivateKey(private_key);
    console.log(senderPublicKey);
    
    
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: publicKey,
            lamports: Math.round(amount * LAMPORTS_PER_SOL)
        })
    );

    let keyPair = getKeypair();

    const signer = await createSignerFromKeypair(umi, keyPair);
    
    umi.use(signerIdentity(signer));

    transaction.feePayer = signer.publicKey;

    const { blockhash } = await CONNECTION.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;

    
    if (!signer.signTransaction) {
        throw new Error("Wallet does not support signing transactions");
    }
    
    const signedTransaction = await signer.signTransaction(transaction);
    console.log({signedTransaction});

    const signature = await CONNECTION.sendRawTransaction(signedTransaction.serialize());
    console.log({signature});
    
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