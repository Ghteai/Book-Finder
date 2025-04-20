import React from 'react';
import {
  LinkBox,
  LinkOverlay,
  Image,
  Heading,
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const BookCard = ({ id, title, author, coverId }) => {
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s';

  return (
    <LinkBox
      bg="white"
      maxW="full"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="10"
      p="4"
      mt="5"
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <Flex
        direction={["column", "row"]}
        align="center"
        gap={4}
      >
        <Box
          width={["100%", "150px"]}
          height={["auto", "220px"]}
          overflow="hidden"
          borderRadius="md"
          flexShrink={0}
        >
          <Image
            objectFit="cover"
            width="100%"
            height="100%"
            src={imageUrl}
            alt={title}
          />
        </Box>
        <Box
          w="full"
          textAlign={["center", "left"]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={3}
        >
          <LinkOverlay as={RouterLink} to={`/book/${id}`}>
            <Heading size="md" noOfLines={2}>
              {title}
            </Heading>
          </LinkOverlay>
          <Text color="gray.600" fontSize="sm" noOfLines={2}>
            {author || "Unknown Author"}
          </Text>
          <Button
            as={RouterLink}
            to={`/book/${id}`}
            alignSelf={["center", "flex-start"]}
            mt={[2, 5]}
          >
            View Details
          </Button>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default BookCard;
