import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Spinner,
  Tag,
  useToast,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLoading, setCoverLoading] = useState(true);

  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
      setBook(res.data);
    } catch (err) {
      console.error("Error fetching book:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = [...existing, { id, title: book.title }];
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast({
      title: "Saved to Reading List",
      description: `"${book.title}" was added successfully.`,
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col gap-6 px-10 py-12 bg-white">
        <Skeleton height="40px" width="120px" />
        <div className="flex flex-col md:flex-row gap-10">
          <Skeleton height="400px" width="300px" />
          <div className="flex-1 space-y-6">
            <Skeleton height="40px" width="80%" />
            <SkeletonText noOfLines={4} spacing="4" />
            <Skeleton height="40px" width="150px" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-gray-600">
        Book not found.
      </div>
    );
  }

  const coverImage = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s";

  const descriptionText =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  return (
    <div className="min-h-screen w-full bg-white px-4 sm:px-8 md:px-16 lg:px-32 py-10">
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        mb={6}
        variant="outline"
        colorScheme="blue"
      >
        Back
      </Button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-72 flex-shrink-0">
          <Skeleton isLoaded={!coverLoading} height="100%" rounded="xl">
            <img
              src={coverImage}
              alt={book.title}
              onLoad={() => setCoverLoading(false)}
              className="rounded-xl w-full object-cover shadow-lg"
            />
          </Skeleton>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{book.title}</h1>

          {book.authors?.[0] && (
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Author:</span>{" "}
              {book.authors[0].name || book.authors[0].author?.key.split("/").pop()}
            </p>
          )}

          {book.first_publish_date && (
            <p className="text-gray-700">
              <span className="font-semibold">First Published:</span>{" "}
              {book.first_publish_date}
            </p>
          )}

          {book.subjects?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-1">Subjects:</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {book.subjects.slice(0, 6).map((subject, idx) => (
                  <Tag key={idx} colorScheme="purple">
                    {subject}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-700 mb-1">Description:</p>
            <div className="max-h-52 overflow-y-auto p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-sm">
              {descriptionText}
            </div>
          </div>

          <p className="text-gray-700">
            <span className="font-semibold">Average Rating:</span> ⭐{" "}
            {Math.floor(Math.random() * 3 + 3)} / 5
          </p>

          <Button colorScheme="purple" marginTop="3" onClick={handleAddToFavorites}>
            Save to Reading List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
