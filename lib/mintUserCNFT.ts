import { fetchMerkleTree, fetchTreeConfigFromSeeds, mintToCollectionV1, mintV1 } from "@metaplex-foundation/mpl-bubblegum"
import { publicKey, PublicKey, Umi } from "@metaplex-foundation/umi"
import { WalletContextState } from "@solana/wallet-adapter-react";

export const mintUserCnft = async (
    umi: Umi, 
    merkleTreePubKey: string, 
    name: string, 
    wallet: WalletContextState,
    uri: string,
    { userPublicKey, collectionMintPublicKey, collectionPublickey } 

    ) => {



    const merkleTree = await fetchMerkleTree(umi, publicKey(merkleTreePubKey))

    // const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree: publicKey })

    if(!wallet.publicKey){
        return
    }

    const nft = await mintToCollectionV1(umi, {
        leafOwner: publicKey(userPublicKey), // for story tellers pass the public key collected from form
        merkleTree: merkleTree.publicKey,
        collectionMint: publicKey(collectionMintPublicKey), // for story tellers pass the collectMint.pubKey 
        metadata: {
            name: name,
            uri: uri,
            sellerFeeBasisPoints: 500, // 5%
            collection: { key: 
                publicKey(collectionPublickey), // for story tellers pass the collection.pubKey 
                verified: false 
            },
            creators: [
                { address: umi.identity.publicKey, verified: false, share: 100 },
            ],
        },
    }).sendAndConfirm(umi)

    console.log(nft)
    return nft
}