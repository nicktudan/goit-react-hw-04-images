import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { 
    SearchHeader, 
    SearchForm, 
    SearchFormBtn, 
    SearchFormInput, 
} from './Searchbar.styled'


export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please, enter the search name!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FaSearch />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchHeader>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}