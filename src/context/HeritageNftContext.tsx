import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface VerifiedItem {
  id: string;
  title: string;
  extractedText: string;
  language: string;
  tags: string[];
  confidence: number;
  verifiedAt: string;
}

export interface MintedNft {
  itemId: string;
  nftId: string;
  owner: string;
  blockchain: string;
  mintedAt: string;
  txHash: string;
}

interface HeritageNftContextType {
  verifiedItems: Map<string, VerifiedItem>;
  mintedNfts: Map<string, MintedNft>;
  verifyItem: (item: VerifiedItem) => void;
  mintNft: (itemId: string, owner: string) => MintedNft;
  isVerified: (id: string) => boolean;
  isMinted: (id: string) => boolean;
  getVerified: (id: string) => VerifiedItem | undefined;
  getMinted: (id: string) => MintedNft | undefined;
}

const HeritageNftContext = createContext<HeritageNftContextType | null>(null);

export function HeritageNftProvider({ children }: { children: ReactNode }) {
  const [verifiedItems, setVerifiedItems] = useState<Map<string, VerifiedItem>>(new Map());
  const [mintedNfts, setMintedNfts] = useState<Map<string, MintedNft>>(new Map());

  const verifyItem = useCallback((item: VerifiedItem) => {
    setVerifiedItems((prev) => new Map(prev).set(item.id, item));
  }, []);

  const mintNft = useCallback((itemId: string, owner: string): MintedNft => {
    const nft: MintedNft = {
      itemId,
      nftId: `VRS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      owner,
      blockchain: "Polygon (Demo)",
      mintedAt: new Date().toISOString(),
      txHash: "0x" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    };
    setMintedNfts((prev) => new Map(prev).set(itemId, nft));
    return nft;
  }, []);

  return (
    <HeritageNftContext.Provider
      value={{
        verifiedItems,
        mintedNfts,
        verifyItem,
        mintNft,
        isVerified: (id) => verifiedItems.has(id),
        isMinted: (id) => mintedNfts.has(id),
        getVerified: (id) => verifiedItems.get(id),
        getMinted: (id) => mintedNfts.get(id),
      }}
    >
      {children}
    </HeritageNftContext.Provider>
  );
}

export function useHeritageNft() {
  const ctx = useContext(HeritageNftContext);
  if (!ctx) throw new Error("useHeritageNft must be used within HeritageNftProvider");
  return ctx;
}
