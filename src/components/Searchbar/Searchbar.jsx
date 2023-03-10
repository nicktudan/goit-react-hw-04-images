import PropTypes from 'prop-types';
import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { 
    SearchHeader, 
    SearchForm, 
    SearchFormBtn, 
    SearchFormInput, 
} from './Searchbar.styled'


export class Searchbar extends Component {
    state = {
        query: '',
    };

    handleQueryChange = event => {
        this.setState({ query: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.query.trim() === '') {
            toast.error('Please, enter the search name!');
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }

        render() {
            return <SearchHeader >
            
                <SearchForm onSubmit={this.handleSubmit} >
                    <SearchFormBtn type="submit">
                        <FaSearch />
                    </SearchFormBtn>
    
                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleQueryChange}
                    />
                </SearchForm>
    
        </SearchHeader>
        }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}