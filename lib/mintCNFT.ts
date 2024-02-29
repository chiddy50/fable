import { fetchMerkleTree, fetchTreeConfigFromSeeds, mintToCollectionV1, mintV1 } from "@metaplex-foundation/mpl-bubblegum"
import { createSignerFromKeypair, publicKey, PublicKey, signerIdentity, Umi } from "@metaplex-foundation/umi"
import { WalletContextState } from "@solana/wallet-adapter-react";
import { getKeypair } from "./data";

export const mintCnft = async (
    umi: Umi, 
    merkleTreePubKey: string, 
    name: string, 
    wallet: WalletContextState,
    // uri: string
    ) => {

        const keypair = getKeypair()
        const signer = createSignerFromKeypair(umi, keypair)
        umi.use(signerIdentity(signer))
    const merkleTree = await fetchMerkleTree(umi, publicKey(merkleTreePubKey))
    console.log("merkle: ",merkleTree);

    // const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree: publicKey })

    if(!wallet.publicKey){
        return
    }

    const nft = await mintToCollectionV1(umi, {
        leafOwner: publicKey(wallet.publicKey.toBase58()), // for story tellers pass the public key collected from form
        merkleTree: merkleTree.publicKey,
        collectionMint: publicKey(wallet.publicKey.toBase58()), // for story tellers pass the collectMint.pubKey 
        metadata: {
            name: name,
            uri: "https://arweave.net/fUr62Y1Rn3Z-hGF1s0S1GiXsNMBtN3TEQDaYM4553n0",
            sellerFeeBasisPoints: 500, // 5%
            collection: { key: 
                publicKey(wallet.publicKey), // for story tellers pass the collection.pubKey 
                verified: false 
            },
            creators: [
                { address: umi.identity.publicKey, verified: false, share: 100 },
            ],
        },
    }).sendAndConfirm(umi)

    console.log("NFT: ",nft)
    return nft
}