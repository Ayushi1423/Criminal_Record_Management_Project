'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { Flex, Heading, Text, Table, Spinner, Avatar } from '@/once-ui/components';
import CriminalsLayout from '../components/CriminalsLayout';

// Define the structure for a criminal record (matching API response)
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

// Define headers for the Table component
const tableHeaders = [
    { key: 'photo', content: 'Photo' },
    { key: 'name', content: 'Name' },
    { key: 'age', content: 'Age' },
    { key: 'gender', content: 'Gender' },
    { key: 'crime_type', content: 'Crime Type' },
    { key: 'case_status', content: 'Status' },
    { key: 'arrest_date', content: 'Arrest Date' },
];

export default function ListCriminalsPage() {
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCriminals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/criminals');
        const data: Criminal[] | { error: string } = await response.json();

        if (!response.ok || 'error' in data) {
          throw new Error((data as { error: string }).error || 'Failed to fetch criminals');
        }

        setCriminals(data as Criminal[]);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setCriminals([]); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCriminals();
  }, []); // Empty dependency array ensures this runs once on mount

  // Transform criminals data into the format required by Table
  const tableData = {
      headers: tableHeaders,
      rows: criminals.map((criminal) => [
          // Order must match tableHeaders
          <Avatar 
              key={`${criminal.id}-photo`}
              src={criminal.photo_path || '/images/default-avatar.png'}
              size="s" // Use valid size
          />,
          criminal.name,
          criminal.age,
          criminal.gender,
          criminal.crime_type,
          criminal.case_status,
          new Date(criminal.arrest_date).toLocaleDateString(),
          // Add other data points corresponding to headers if needed
      ])
  }

  return (
    <CriminalsLayout title="Criminal Records">
      <Heading as="h2" align="center">Criminal Records</Heading>

      {isLoading && (
        <Flex horizontal="center" style={{ padding: '2rem' }}>
          <Spinner size="l" />
        </Flex>
      )}

      {error && <Text color="danger" align="center">Error: {error}</Text>}

      {!isLoading && !error && (
        <>
          {criminals.length === 0 ? (
            <Text align="center" style={{ marginTop: '2rem' }}>No criminal records found.</Text>
          ) : (
            <Table data={tableData} />
          )}
        </>
      )}
    </CriminalsLayout>
  );
} 