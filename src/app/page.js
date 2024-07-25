"use client";
import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  useDisclosure,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Link,
  Container,
  VStack,
  HStack,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Image from 'next/image';
import { SearchIcon } from '@chakra-ui/icons';
import Gallery from "./components/Gallery";
import Minter from "./components/Minter";
import About from "./components/About";
import Marketplace from "./components/Marketplace";
import MyProfile from "./components/MyProfile";
import { AmoyProvider } from "./contexts/AmoyContext";
import theme from "./theme";
import { pinFileToIPFS } from "../utils/pinata";


const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [showAddNetworkModal, setShowAddNetworkModal] = useState(false);
  const navigate = useNavigate();

  const tutorialUrl =
    "https://kublockchain.notion.site/NFT-Gallery-dApp-tutorial-8ccbda66968b4b55b1808e8c2abe1272?pvs=4";

  const checkMetaMaskAndNetwork = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x13882") {
        setIsFileModalOpen(true);
      } else {
        setShowAddNetworkModal(true);
      }
    } else {
      setShowAddNetworkModal(true);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await pinFileToIPFS(file);
      console.log("File uploaded to IPFS:", response);
      // You can handle the response here (e.g., save the hash, etc.)
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsFileModalOpen(false); // Close the modal after uploading
  };

  const navigateToMarketplace = () => {
    navigate("/marketplace");
  };

  return (
    <Box bg="gray.900" minHeight="100vh" color="white">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex justify="center" align="center">
            <Image 
              src="/scichain-logo.png" 
              alt="SciChain Logo" 
              width={80} 
              height={80} 
            />
            <Heading as="h1" size="2xl" ml={4}>
              SciChain
            </Heading>
          </Flex>

          {/* About this project */}
          <Button colorScheme="gray" variant="outline" alignSelf="center" onClick={onOpen}>
            About SciChain
          </Button>

          {/* Search Bar */}
          <InputGroup size="lg" maxW="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search..." bg="gray.800" borderColor="gray.700" _hover={{ borderColor: "brand.500" }} />
          </InputGroup>

          {/* Action Buttons */}
          <HStack justify="center" spacing={4}>
            <Button colorScheme="teal" size="lg" onClick={checkMetaMaskAndNetwork}>
              Mint NFT
            </Button>
            <Button colorScheme="teal" size="lg" onClick={navigateToMarketplace}>
              Marketplace
            </Button>
            <Button colorScheme="teal" size="lg">
              My Profile
            </Button>
          </HStack>

          {/* Gallery */}
          <Box>
            <Gallery />
          </Box>

          {/* Footer */}
          <Flex as="footer" direction="column" align="center" mt={8}>
            <Text fontSize="sm" mb={2}>
              Made with 🔥 by the University of Kansas Blockchain Institute
            </Text>
            <Link href={tutorialUrl} isExternal>
              <Button colorScheme="blue" variant="outline" size="sm">
                View Tutorial
              </Button>
            </Link>
          </Flex>
        </VStack>
      </Container>

      {/* Modals */}
      <Minter isOpen={isOpen} onOpen={onOpen} onClose={onClose} uploadedFiles={[]} />
      <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Select a File to Mint NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={handleFileChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpload}>
              Upload and Mint
            </Button>
            <Button variant="ghost" onClick={() => setIsFileModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AmoyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<MyProfile />} /> 
          </Routes>
        </Router>
      </AmoyProvider>
    </ChakraProvider>
  );
};

export default App;
