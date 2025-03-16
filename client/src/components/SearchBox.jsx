import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <>
      <Form
        className="search-form d-none d-lg-flex mx-auto"
        onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search products..."
          className="search-input"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="success" type="submit">
          <i className="fa fa-search"></i>
        </Button>
      </Form>

      <Form
        className="search-form d-flex d-lg-none mb-3"
        onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search products..."
          className="search-input"
          
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="success" type="submit">
          <i className="fa fa-search"></i>
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
