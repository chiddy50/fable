import { CONNECTION, getKeypair, umi } from "./data";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";

import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";


export const transferToUsers  = async (toPublic: PublicKey, amount: number) => {
    try {
        
        const keyPair = await getKeypair();
        const from = Keypair.fromSecretKey(keyPair.secretKey);
    
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: toPublic,
                lamports: LAMPORTS_PER_SOL * amount
            })
        );
    
        transaction.feePayer = from.publicKey;
    
        const { blockhash } = await CONNECTION.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
    
        const signedTransaction = await sendAndConfirmTransaction(
            CONNECTION,
            transaction,
            [from]
        );
            
        return signedTransaction;
        console.log({signedTransaction})
    } catch (error) {
        return null;
        console.log(error);        
    }

}