"use client";
import React from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Badge,
  Button,
  VStack,
  HStack,
  Input,
  Select,
  Flex,
  Spacer,
  Tag,
} from "@chakra-ui/react";

const dummyDataNFTs = [
    {
      id: 1,
      title: "Quantum Mechanics Dataset",
      author: "Dr. Alice Smith",
      dataType: "Physics",
      size: "2.5 GB",
      price: 1.2,
      leasePrice: 0.3,
    },
    {
      id: 2,
      title: "Genomic Data Analysis",
      author: "Prof. Bob Johnson",
      dataType: "Biology",
      size: "4.1 GB",
      price: 2.5,
      leasePrice: 0.5,
    },
    {
        id: 3,
        title: "Climate Change Research",
        author: "Dr. Emily White",
        dataType: "Environmental Science",
        size: "3.2 GB",
        price: 1.8,
        leasePrice: 0.4,
    },
    {
        id: 4,
        title: "Artificial Intelligence Dataset",
        author: "Dr. Michael Brown",
        dataType: "Computer Science",
        size: "5.0 GB",
        price: 3.0,
        leasePrice: 0.6,
    },
    {
        id: 5,
        title: "Economic Trends Analysis",
        author: "Prof. Linda Green",
        dataType: "Economics",
        size: "2.8 GB",
        price: 1.5,
        leasePrice: 0.35,
    },
    {
        id: 6,
        title: "Neuroscience Imaging Data",
        author: "Dr. James Harris",
        dataType: "Medical Research",
        size: "6.0 GB",
        price: 2.8,
        leasePrice: 0.7,
    },
  ];

const DataNFTCard = ({ title, author, dataType, size, price, leasePrice }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
    <VStack align="start" spacing={3}>
      <Badge colorScheme="brand">{dataType}</Badge>
      <Text fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Text>Author: {author}</Text>
      <Text>Size: {size}</Text>
      <Flex width="100%">
        <Tag colorScheme="brand">Buy: {price} ETH</Tag>
        <Spacer />
        <Tag colorScheme="brand" variant="outline">Lease: {leasePrice} ETH/month</Tag>
      </Flex>
      <HStack width="100%" spacing={4}>
        <Button colorScheme="brand" size="sm" flex={1}>
          Buy
        </Button>
        <Button colorScheme="brand" variant="outline" size="sm" flex={1}>
          Lease
        </Button>
        <Button colorScheme="gray" size="sm" flex={1}>
          Share
        </Button>
      </HStack>
    </VStack>
  </Box>
);

const Marketplace = () => {
  return (
    <Box p={5}>
      <Text fontSize="3xl" fontWeight="bold" mb={6} color="brand.500">
        Research Data NFT Marketplace
      </Text>

      <HStack spacing={4} mb={8}>
        <Input placeholder="Search research data..." />
        <Select placeholder="Filter by field">
          <option value="env-science">Environmental Science</option>
          <option value="medical">Medical Research</option>
          <option value="physics">Physics</option>
          <option value="comp-science">Computer Science</option>
          <option value="biology">Biology</option>
          <option value="economics">Economics</option>
        </Select>
        <Button colorScheme="brand">Search</Button>
      </HStack>

      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {dummyDataNFTs.map((nft) => (
          <DataNFTCard key={nft.id} {...nft} />
        ))}
      </SimpleGrid>

      <VStack mt={10} spacing={4}>
        <Text fontSize="xl">Have valuable research data to share?</Text>
        <Button colorScheme="brand" size="lg">
          Mint Your Research Data NFT
        </Button>
      </VStack>
    </Box>
  );
};

export default Marketplace;