import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BlobLeaseClient, BlobClient } from "@azure/storage-blob";

export async function acquireBlobLeaseAsync(blobClient: BlobClient) {
  
  const leaseClient: BlobLeaseClient = blobClient.getBlobLeaseClient();
  await leaseClient.acquireLease(15);
  return leaseClient;
}

export async function releaseBlobLeaseAsync(blobClient: BlobClient, leaseID: string) {
  
  const leaseClient: BlobLeaseClient = blobClient.getBlobLeaseClient(leaseID);
  await leaseClient.releaseLease();
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addThousandsSeparator(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberToPercentage(num: number) {
  return `${num * 100}%`;
}
