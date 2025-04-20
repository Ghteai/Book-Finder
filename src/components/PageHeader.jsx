import React from 'react';
import { Box, Flex, Text, IconButton, Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageHeader = () => {
  return (
    <Box
      bg="#091039"
      py={4}
      px={6}
      boxShadow="sm"
      borderBottom="1px solid #eee"
      width="full"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Text fontSize="24" fontWeight="bold" color="white">
          Book Finder
        </Text>
        <Flex align="center" gap={4} ml="auto">
          <Button
            as={Link}
            to="/read-list"
            variant="ghost"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Read List
          </Button>
          <IconButton
            as="a"
            href="https://github.com/Ghteai/Book-Finder"
            icon={<FaGithub size="24" />}
            variant="ghost"
            aria-label="GitHub"
            color="white"
          />
          <Button
            variant="outline"
            size="sm"
            colorScheme="whiteAlpha"
            borderColor="whiteAlpha.400"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            colorScheme="whiteAlpha"
            borderColor="whiteAlpha.400"
            _hover={{ bg: 'whiteAlpha.200' }}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PageHeader;
