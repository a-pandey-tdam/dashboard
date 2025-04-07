import { acquireBlobLeaseAsync, releaseBlobLeaseAsync } from "@/lib/utils";
import { BlobServiceClient } from "@azure/storage-blob";

// fetches JSON from blob store
export async function fetchData<T>(filename: string): Promise<T> {
    const ACCOUNT_NAME = process.env.NEXT_PUBLIC_ACCOUNT_NAME;
    const SAS_TOKEN = process.env.NEXT_PUBLIC_SAS_TOKEN;
    const BLOB_NAME = process.env.NEXT_PUBLIC_BLOB_NAME;
    
    if (!ACCOUNT_NAME || !SAS_TOKEN || !BLOB_NAME) {
        throw new Error("Missing environment variables for account configuration.");
    }
    
    const accountURL: string = `https://${ACCOUNT_NAME}.blob.core.windows.net?${SAS_TOKEN}`;
    const blobServiceClient = new BlobServiceClient(accountURL);
    const containerClient = blobServiceClient.getContainerClient(BLOB_NAME);
    const blobClient = containerClient.getBlobClient(filename);
    
    let lease;
    const leaseRetryInterval = 1000; // 1 second
    const leaseTimeout = 15000; // 15 seconds
    const startTime = Date.now();
    
    try {
        // Retry acquiring lease for up to 15 seconds
        while (!lease && Date.now() - startTime < leaseTimeout) {
            try {
                lease = await acquireBlobLeaseAsync(blobClient);
            } catch (error) {
                if (Date.now() - startTime >= leaseTimeout) {
                    // console.error("Failed to acquire lease within 15 seconds.", error);
                    throw error;
                }
                // console.log("Lease acquisition failed, retrying...");
                await new Promise(resolve => setTimeout(resolve, leaseRetryInterval));
            }
        }
        
        if (!lease) {
            throw new Error("Unable to acquire lease after multiple attempts.");
        }

        const access = `https://${ACCOUNT_NAME}.blob.core.windows.net/${BLOB_NAME}/${filename}?${SAS_TOKEN}&cacheBuster=${Date.now()}`;
        const response = await fetch(access);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch "${filename}": ${response.statusText}`);
        }
        
        return (await response.json() as T); 
    } finally {
        if (lease) {
            try {
                await releaseBlobLeaseAsync(blobClient, lease.leaseId);
                // console.log("Lease released successfully.", filename);
            } catch (releaseError) {
                // console.error("Error releasing lease:", releaseError);
            }
        }
    }
}