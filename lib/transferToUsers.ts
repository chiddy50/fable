import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CONNECTION, getKeypair, umi } from "./data";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";

export const transferToUsers = async (publicKey: string, amount: number) => {
   try{
    const keypair = await getKeypair()

    const signer = createSignerFromKeypair(umi, keypair)

    const blockHash = (await CONNECTION.getLatestBlockhash()).blockhash

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(keypair.publicKey),
            toPubkey: new PublicKey(publicKey),
            lamports: 1 * LAMPORTS_PER_SOL,
            
        })
    )

    // const createTransaction = await buildTra

    // transaction.recentBlockhash = blockHash
    // transaction.feePayer = new PublicKey(keypair.publicKey)
    // transaction.sign()
    // transaction.

    // const signature = await CONNECTION.sendTransaction(transaction, [])
    
    // console.log(signature)
   }catch(error){
    console.log("Error: ", error)
   }
}