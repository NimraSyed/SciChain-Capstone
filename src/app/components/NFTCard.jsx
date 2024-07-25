import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Document, Page } from 'react-pdf';

const NFTCard = ({ src, index, owner, label }) => {
  const isImage = src.match(/\.(jpeg|jpg|gif|png)$/) != null;
  const isPdf = src.match(/\.pdf$/) != null;

  return (
    <Box
      boxShadow="lg"
      borderRadius="md"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {isImage ? (
        <Image
          src={src}
          alt={`Gallery image ${index}`}
          objectFit="contain"
          maxH="300px"
          width="100%"
          alignSelf="center"
        />
      ) : isPdf ? (
        <Box height="300px" width="100%">
          <Document file={src}>
            <Page pageNumber={1} width={300} />
          </Document>
        </Box>
      ) : (
        <Text>Unsupported file type</Text>
      )}
      <Box p={2} textAlign="center">
        <Text color="gray.500" fontSize="sm">
          minted by {owner}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

export default NFTCard;
