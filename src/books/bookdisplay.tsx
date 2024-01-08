import React from 'react';
import { Book } from './book';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type BookDisplayProps = {
  book: Book;
};

const BookDisplay: React.FC<BookDisplayProps> = ({ book }) => {
  return (
    <List component="nav" aria-label="book details">
      <ListItem button>
        <ListItemText 
          primary={book.title}
          secondary={
            <>
              Author(s): {book.author_name}<br/>
              Year: {book.first_publish_year}<br/>
              ISBN: {book.isbn}<br/>
              Pages: {book.number_of_pages_median}
            </>
          } 
        />
      </ListItem>
    </List>
  );
};

export default BookDisplay;
