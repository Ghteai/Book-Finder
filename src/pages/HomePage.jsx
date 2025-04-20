import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import {
  FormControl,
  Input,
  Flex,
  Box,
  Skeleton,
  SkeletonText,
  Button,
  Text,
} from "@chakra-ui/react";
import BookCard from "../components/BookCard";

const RESULTS_PER_PAGE = 9;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); 
  const [defaultQuery] = useState("programming"); 
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);

  const fetchBooks = async (q = "", pageNum = page) => {
    setLoading(true);
    setError(null);
    try {
      const searchQuery = q || defaultQuery;
      const res = await axios.get(`https://openlibrary.org/search.json`, {
        params: { q: searchQuery, page: pageNum, limit: RESULTS_PER_PAGE },
      });
      setBooks(res.data.docs);
      setNumFound(res.data.numFound);
    } catch (err) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(defaultQuery, 1); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setPage(1);
      fetchBooks(query, 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(numFound / RESULTS_PER_PAGE);

  return (
    <div className="bg-white p-6 md:p-10 flex-1 min-w-screen">
      <div className="w-full">
        <div className="text-center font-bold text-xl md:text-4xl mt-3 pb-10">
          Find Your Book!
        </div>

        <form onSubmit={handleSearch}>
          <FormControl>
            <Flex
              as="label"
              align="center"
              justify="center"
              width={["90%", "80%", "35%"]} // Adjust width for responsiveness
              mx="auto"
              gap={2}
              boxShadow="md"
              borderRadius="md"
              px={4}
              py={2}
              bg="white"
              marginBottom="5"
            >
              <IoIosSearch size={24} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search by Author, Title or ISBN"
                fontSize={["sm", "md"]}
                border="none"
                _focus={{ boxShadow: "none" }}
              />
            </Flex>
          </FormControl>
        </form>

        <p className="text-slate-500 font-semibold ml-1 mt-10 text-xl">
          {query ? "Search Results:" : "Featured Books:"}
        </p>

        {error && (
          <Box color="red.500" mt={4}>
            {error}
          </Box>
        )}

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {loading
            ? Array.from({ length: RESULTS_PER_PAGE }).map((_, i) => (
                <Box key={i} p={4} boxShadow="md" borderRadius="md" bg="white">
                  <Skeleton height="200px" mb={4} />
                  <SkeletonText mt="4" noOfLines={2} spacing="2" />
                  <Skeleton height="10px" mt={2} width="50%" />
                </Box>
              ))
            : books.map((book) => (
                <BookCard
                  key={book.key}
                  id={book.key.split("/").pop()}
                  title={book.title}
                  author={book.author_name?.[0]}
                  coverId={book.cover_i}
                />
              ))}
        </div>

        {books.length > 0 && (
          <Flex justify="center" mt={10} gap={4} align="center">
            <Button
              onClick={() => {
                const newPage = Math.max(page - 1, 1);
                setPage(newPage);
                fetchBooks(query || defaultQuery, newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              isDisabled={page === 1}
              colorScheme="gray"
              variant="outline"
            >
              Previous
            </Button>
            <Text>
              Page {page} {totalPages > 0 && `of ${totalPages}`}
            </Text>
            <Button
              onClick={() => {
                const newPage = page + 1;
                setPage(newPage);
                fetchBooks(query || defaultQuery, newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              isDisabled={page === totalPages}
              colorScheme="gray"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default HomePage;
