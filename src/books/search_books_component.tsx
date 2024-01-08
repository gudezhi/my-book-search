import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";
import { Book } from "./book"; // Import the Book type
import { searchBooks } from "./search_books_api"; // Import the searchBooks function
import Button from "@material-ui/core/Button";
import BookDisplay from "./bookdisplay";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import SortIcon from "@material-ui/icons/Sort";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [sortCriteria, setSortCriteria] = useState("relevance");
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      if (searchTerm) {
        console.log("Searching for:", searchTerm);
        const results = await searchBooks(searchTerm);
        console.log("Search results:", results.length);
        setBooks(results);
        setSortCriteria("relevance");
      }
    }, 1000);

    debouncedSearch();

    // Cleanup function to cancel the debounce on component unmount
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  useEffect(() => {
    let sorted = [...books];
    if (sortCriteria === "year") {
      sorted.sort((a, b) => a.first_publish_year - b.first_publish_year);
    }
    console.log("Sort criteria:", sortCriteria);
    setSortedBooks(sorted);
    console.log("Sorted books:", sorted);
  }, [books, sortCriteria]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Box my={4} style={{ paddingTop: "20px" }}>
        <div>
          <TextField
            label="Search Books"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="flex-start" my={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SortIcon />}
              onClick={() => setSortCriteria("relevance")}
              style={{ marginRight: "10px" }}
            >
              Default Sort
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SortByAlphaIcon />}
              onClick={() => setSortCriteria("year")}
            >
              Sort by Year
            </Button>
          </Box>
          {sortedBooks.map((book) => (
            <BookDisplay key={String(book.isbn)+String(book.first_publish_year)} book={book} />
          ))}
        </div>
      </Box>
    </Container>
  );
};

export default SearchBooks;
