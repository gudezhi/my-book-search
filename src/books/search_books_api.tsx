import axios from 'axios';
import { Book } from './book';

export const searchBooks = async (bookName: string) => {
  // encode bookname with + instead of space
  bookName = bookName.replace(/ /g, "+");

  const response = await axios.get(
    `https://openlibrary.org/search.json?q=${bookName}&fields=key,title,author_name,first_publish_year,number_of_pages_median,editions,editions.key,editions.title,editions.language,editions.isbn,editions.number_of_pages&limit=10`
  );

  // from response.data.docs create a list of books
  const books: Book[] = response.data.docs.map((doc: any) => {
    const edition = doc.editions.docs[0];
    return {
      title: edition.title,
      author_name: doc.author_name,
      first_publish_year: doc.first_publish_year,
      isbn: (edition.isbn || []).join(", "),
      number_of_pages_median: doc.number_of_pages_median,
    };
  });

  return books;
};