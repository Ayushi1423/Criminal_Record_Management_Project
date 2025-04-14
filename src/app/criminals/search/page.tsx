'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent, ReactNode } from 'react';
import { Button, Input, Select, Flex, Heading, Text, Table, Spinner, Avatar } from '@/once-ui/components';
import Link from 'next/link';
import CriminalsLayout from '../../components/CriminalsLayout';

// Define the structure for a criminal record (matching DB schema + API response)
interface Criminal {
  id: number;
  name: string;
  age: number;
  gender: string;
  crime_type: string;
  crime_severity: string;
  arrest_date: string;
  arrest_location: string;
  officer_in_charge: string;
  case_status: string;
  description: string;
  prison_name?: string | null;
  release_date?: string | null;
  photo_path?: string | null;
}

// Define options for the status Select component
const statusOptions = [
  { value: '', label: 'All Statuses' }, // Added option for clearing filter
  { value: 'Pending', label: 'Pending' },
  { value: 'Under Investigation', label: 'Under Investigation' },
  { value: 'Charged', label: 'Charged' },
  { value: 'Convicted', label: 'Convicted' },
  { value: 'Acquitted', label: 'Acquitted' },
  { value: 'Closed', label: 'Closed' },
];

// Define headers for the Table component
const tableHeaders = [
    { key: 'photo', content: 'Photo' },
    { key: 'name', content: 'Name' },
    { key: 'age', content: 'Age' },
    { key: 'gender', content: 'Gender' },
    { key: 'crime_type', content: 'Crime Type' },
    { key: 'case_status', content: 'Status' },
    { key: 'arrest_date', content: 'Arrest Date' },
    // Add more headers corresponding to the keys below
  ];

export default function SearchCriminalsPage() {
  const [searchParams, setSearchParams] = useState({
    name: '',
    crime_type: '',
    status: '',
  });
  const [searchResults, setSearchResults] = useState<Criminal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false); // To show initial message or results

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    // Build query string
    const query = new URLSearchParams();
    if (searchParams.name) query.append('name', searchParams.name);
    if (searchParams.crime_type) query.append('crime_type', searchParams.crime_type);
    if (searchParams.status) query.append('status', searchParams.status);

    try {
      const response = await fetch(`/api/criminals/search?${query.toString()}`);
      const data: Criminal[] | { error: string } = await response.json();

      if (!response.ok || 'error' in data) {
        throw new Error((data as { error: string }).error || 'Failed to search criminals');
      }

      setSearchResults(data as Criminal[]);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setSearchResults([]); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  };

  // Transform search results into the format required by Table
  const tableData = {
      headers: tableHeaders,
      rows: searchResults.map((criminal) => [
          // Order must match tableHeaders
          <Avatar 
              key={`${criminal.id}-photo`}
              src={criminal.photo_path || '/images/default-avatar.png'}
              size="s" // Corrected size
          />,
          criminal.name,
          criminal.age,
          criminal.gender,
          criminal.crime_type,
          criminal.case_status,
          new Date(criminal.arrest_date).toLocaleDateString(),
          // Add other data points corresponding to headers
      ])
  }

  return (
    <CriminalsLayout title="Search Criminal Records">
      <Heading as="h2" align="center">Search Criminal Records</Heading>

      <form onSubmit={handleSearch}>
        <Flex gap="16" vertical="end" wrap={true}>
          <Input
            id="name-search"
            label="Name"
            name="name"
            value={searchParams.name}
            onChange={handleInputChange}
            placeholder="Search by name..."
            style={{ flexGrow: 1, minWidth: '150px' }}
          />
          <Input
            id="crime-type-search"
            label="Crime Type"
            name="crime_type"
            value={searchParams.crime_type}
            onChange={handleInputChange}
            placeholder="e.g., Theft"
             style={{ flexGrow: 1, minWidth: '150px' }}
          />
          <Select
            id="status-search"
            label="Case Status"
            name="status"
            value={searchParams.status}
            options={statusOptions}
            onSelect={(value) => handleSelectChange(value, 'status')}
            placeholder="Filter by status"
            style={{ flexGrow: 1, minWidth: '150px' }}
          />
          <Button 
            id="search-button"
            label="Search"
            type="submit" 
            loading={isLoading} 
            disabled={isLoading}
          />
        </Flex>
      </form>

      {isLoading && (
        <Flex horizontal="center" style={{ padding: '2rem' }}>
          <Spinner size="l" />
        </Flex>
      )}

      {error && <Text color="danger" align="center">Error: {error}</Text>}

      {!isLoading && !error && (
        <>
          {hasSearched && searchResults.length === 0 && (
            <Text align="center" style={{ marginTop: '2rem' }}>No matching records found.</Text>
          )}
          {hasSearched && searchResults.length > 0 && (
            <Table data={tableData} />
          )}
          {!hasSearched && (
             <Text align="center" style={{ marginTop: '2rem' }}>Enter search criteria and click Search.</Text>
          )}
        </>
      )}
    </CriminalsLayout>
  );
} 