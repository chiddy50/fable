import { Keypair, publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Connection } from "@solana/web3.js";
import axios from "axios";

const currencies = [
    {
        "id": "9b5f3f83-88b3-46e7-8f84-711834538038",
        "country_code": "AS",
        "name": "US Dollar",
        "code": "usd",
        "name_plural": "US dollars",
        "symbol": "$"
    },
    {
        "id": "9b5f3f84-7ebd-48db-bc8c-546467deee92",
        "country_code": "NG",
        "name": "Nigerian Naira",
        "code": "ngn",
        "name_plural": "Nigerian nairas",
        "symbol": "₦"
    },
    {
        "id": "9b5f3f83-ea52-4b7b-944b-404a6474cc25",
        "country_code": "GB",
        "name": "British Pound Sterling",
        "code": "gbp",
        "name_plural": "British pounds sterling",
        "symbol": "£"
    },
    {
        "id": "9b5f3f83-7cac-4d4a-8da2-a19f79328d73",
        "country_code": "AD",
        "name": "Euro",
        "code": "eur",
        "name_plural": "euros",
        "symbol": "€"
    },
    {
        "id": "9b5f3f83-c346-4409-a5cb-10ee1519bee9",
        "country_code": "CN",
        "name": "Chinese Yuan",
        "code": "cny",
        "name_plural": "Chinese yuan",
        "symbol": "CN¥"
    },

   
]

const CONNECTION = new Connection('https://devnet.helius-rpc.com/?api-key=dcbb39d0-c580-4530-8af2-36289b506520', 'confirmed');

const getKeypair = () => {
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const public_account = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS;

    if (!privateKey) {
        throw new Error("Private key not provided");
    }

    if (!public_account) {
        throw new Error("Public key not provided");
    }

    const secretKeyArray = JSON.parse(privateKey);
    const keypair: Keypair = {
        publicKey: publicKey(public_account),
        secretKey: new Uint8Array(secretKeyArray),
    };

    return keypair
}

const umi = createUmi("https://api.devnet.solana.com");


const createUnderdogProject = async (data: object) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
            },
        }

        const underdogApiEndpoint = process.env.NEXT_PUBLIC_UNDERDOG_API_URL
    
        const projectData = { 
            "name": data.name, 
            "symbol": data.symbol, 
            "image": data.image 
        };
          
        const response = await axios.post(`${underdogApiEndpoint}/v2/projects`, 
            projectData, 
            config,
        ); 
        console.log(response);
        
        return response;
        
    } catch (error) {
        console.log(error);   
        return null;     
    }
}

const createUnderdogNft = async (data, projectId, pubKey) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
            },
        }

        const underdogApiEndpoint = process.env.NEXT_PUBLIC_UNDERDOG_API_URL

        // const nftData: { name: string, image: string, attributes: ChallengePayload } = {
        const nftData = {
            name: data.title,
            image: data.image,
            attributes: data,
            receiver: {
                address: pubKey,
                namespace: "superteam",
                identifier: data.email
            },
            receiverAddress: publicKey(pubKey.toBase58()),
            delegated: true,
            upsert: true
        };
        
        const createNftResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${projectId}/nfts`, 
            nftData,
            config,
        ); 
        console.log(createNftResponse);
        
        
        return createNftResponse;
    } catch (error) {
        console.log(error);   
        return null; 
    }

}

const createUnderdogNftUsers = async (data, projectId, pubKey) => {
    console.log(typeof  data);
    // return
    
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
            },
        }

        const underdogApiEndpoint = process.env.NEXT_PUBLIC_UNDERDOG_API_URL

        const nftData = {
            name: "1st Place Story Teller",
            image: "https://img.freepik.com/free-psd/books-stacked-isolated-transparent-background_191095-17333.jpg?t=st=1709118646~exp=1709122246~hmac=e3c428c8030046b6f70930e0c93af4e287932cceae81f6c4c3bd7cba735df20c&w=1380",
            attributes: data,
            receiver: {
                address: pubKey,
                namespace: "superteam",
                identifier: data?.email
            },
            receiverAddress: pubKey,
            delegated: true,
            upsert: true
        };
        
        let project_id = Number(projectId);

        const createNftResponse = await axios.post(
            `${underdogApiEndpoint}/v2/projects/${project_id}/nfts`, 
            nftData,
            config,
        ); 
        console.log(createNftResponse);
        
        
        return createNftResponse;
    } catch (error) {
        console.log(error);   
        return null; 
    }

}

export { 
    currencies, 
    CONNECTION,
    getKeypair,
    createUnderdogProject,
    createUnderdogNft,
    createUnderdogNftUsers,
    umi,
}

