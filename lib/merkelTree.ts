import { generateSigner, signerIdentity, createSignerFromKeypair, publicKey, Keypair, Umi, } from '@metaplex-foundation/umi'
import { createTree } from '@metaplex-foundation/mpl-bubblegum'
import { getKeypair } from './data'

export const createMerkleTree = async (umi: Umi) => {
    try {
        const keypair = await getKeypair()

        const signer = await createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(signer));

        const merkleTree = generateSigner(umi)
        console.log(merkleTree.publicKey)

        const builder = await createTree(umi, {
            merkleTree,
            maxDepth: 14,
            maxBufferSize: 64,
        });
        console.log(builder)

        const tx = await builder.sendAndConfirm(umi);
        console.log("transz: ", tx)

        // return {
        //     signer,
        //     tx
        // }
    } catch (error) {
        console.log(error)
        return error
    }
}