import React, { useEffect, useRef, useState } from 'react';
import { Form, Dropdown, Spinner } from 'react-bootstrap';

const Pmcsearch = () => {
  // State for input query
  const [query, setQuery] = useState('');
  // State to store fetched articles
  const [results, setResults] = useState([]);
  // Controls dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  // Loading spinner state
  const [loading, setLoading] = useState(false);

  // Ref to detect clicks outside the component
  const wrapperRef = useRef(null);

  // Hook to handle click outside the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch article data from PMC using E-Utilities API
  const fetchArticles = async (query) => {
    if (!query) return;

    setLoading(true);
    try {
      // Step 1: Search for article IDs
      const searchRes = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${encodeURIComponent(
          query
        )}&retmax=5&retmode=json`
      );
      const searchData = await searchRes.json();
      const pmcIds = searchData?.esearchresult?.idlist || [];

      if (pmcIds.length === 0) {
        setResults([]);
        setShowDropdown(false);
        setLoading(false);
        return;
      }

      // Step 2: Fetch article summaries by IDs
      const summaryRes = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${pmcIds.join(',')}&retmode=json`
      );
      const summaryData = await summaryRes.json();

      // Map ID to article title
      const articles = pmcIds.map((id) => ({
        pmcid: id,
        title: summaryData.result[id]?.title || 'No Title',
      }));

      setResults(articles);
      setShowDropdown(true);
    } catch (err) {
      console.error('Error fetching:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle user input changes
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim() !== '') {
      fetchArticles(val);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  // On article select, open link in new tab
  const handleSelect = (pmcid) => {
    window.open(`https://www.ncbi.nlm.nih.gov/pmc/articles/PMC${pmcid}/`, '_blank');
    setShowDropdown(false);
  };

  return (
    <div
      className="position-relative"
      style={{ maxWidth: '500px', margin: '40px auto' }}
      ref={wrapperRef}
    >
      {/* Search input box */}
      <Form.Control
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          if (results.length > 0) setShowDropdown(true);
        }}
      />

      {/* Loading spinner */}
      {loading && (
        <Spinner animation="border" size="sm" className="position-absolute end-0 top-0 mt-2 me-2" />
      )}

      {/* Dropdown showing search results */}
      {showDropdown && results.length > 0 && (
        <Dropdown.Menu show style={{ width: '100%', marginTop: '0.25rem' }}>
          {results.map(({ title, pmcid }) => (
            <Dropdown.Item
              key={pmcid}
              onClick={() => handleSelect(pmcid)}
              style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              {title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default Pmcsearch;
