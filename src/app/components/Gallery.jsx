"use client";
import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Button,
  Text,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import NFTCard from "./NFTCard";
import { useAmoy } from "../contexts/AmoyContext";
import { ethers } from "ethers";  // Correct import for ethers
import contractABI from "../../abis/contractABI.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function Gallery() {
  const {
    isMetaMaskInstalled,
    currentChainId,
    checkIsOnAmoyNetwork,
    toggleNetworkModal,
    connectWallet,
    walletConnected,
  } = useAmoy();

  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletConnected && checkIsOnAmoyNetwork()) {
      loadNFTs();
    } else if (isMetaMaskInstalled && !checkIsOnAmoyNetwork()) {
      toggleNetworkModal();
    }
    setIsLoading(false);
  }, [walletConnected, isMetaMaskInstalled, checkIsOnAmoyNetwork, toggleNetworkModal]);

  const loadNFTs = async () => {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          provider
        );

        console.log("contract address", contractAddress);
        console.log("contract ABI", contractABI.abi);
        console.log("Contract address: ", contractAddress);
        console.log("Contract: ", contract);
        const totalSupply = await contract.totalSupply();
        console.log("Total supply: ", totalSupply);

        let nfts = [];
        for (let i = ethers.BigNumber.from(1); i.lte(totalSupply); i = i.add(1)) {
          const tokenURI = await contract.tokenURI(i);
          const tokenName = await contract.getTokenName(i);
          const tokenLabel = await contract.getTokenLabel(i);

          nfts.push({
            src: tokenURI,
            owner: tokenName,
            label: tokenLabel,
          });
        }

        setNFTs(nfts);
      } catch (error) {
        console.error("Failed to load NFTs:", error);
      }
    }
    setIsLoading(false);
  };

  const refreshGallery = () => {
    if (isMetaMaskInstalled && checkIsOnAmoyNetwork()) {
      loadNFTs();
    } else {
      toggleNetworkModal();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!walletConnected) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        p={20}
      >
        <Text mb={4}>
          {isMetaMaskInstalled
            ? "Connect your MetaMask wallet to view the gallery."
            : "MetaMask is required to view the gallery."}
        </Text>
        <Button onClick={connectWallet}>
          {isMetaMaskInstalled ? "Connect Wallet" : "Download MetaMask"}
        </Button>
        <IconButton
          m={4}
          icon={<FiRefreshCw />}
          aria-label="Refresh Gallery"
          size="sm"
          onClick={refreshGallery}
        />
      </Flex>
    );
  }

  return (
    <Box position="relative" p={20}>
      <IconButton
        icon={<FiRefreshCw />}
        aria-label="Refresh Gallery"
        position="absolute"
        top={4}
        left={4}
        size="sm"
        onClick={refreshGallery}
      />

      <SimpleGrid columns={3} spacing={4}>
        {NFTs.map((nft, index) => (
          <NFTCard
            key={index}
            src={nft.src}
            index={index + 1}
            owner={nft.owner}
            label={nft.label}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
