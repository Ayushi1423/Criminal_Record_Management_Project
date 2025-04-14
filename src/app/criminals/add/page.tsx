'use client';

// Tell Next.js not to statically render this page

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea, Select, Flex, Heading, Text } from '@/once-ui/components';
import CriminalsLayout from '../../components/CriminalsLayout';

// Define the structure for form data
interface CriminalFormData {
  name: string;
  age: string;
  gender: string;
  crime_type: string;
  crime_severity: string;
  arrest_date: string;
  arrest_location: string;
  officer_in_charge: string;
  case_status: string;
  description: string;
  prison_name: string;
  release_date: string;
  photo?: File | null;
}

// Define options for Select components
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const severityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Under Investigation', label: 'Under Investigation' },
  { value: 'Charged', label: 'Charged' },
  { value: 'Convicted', label: 'Convicted' },
  { value: 'Acquitted', label: 'Acquitted' },
  { value: 'Closed', label: 'Closed' },
];

export default function AddCriminalPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CriminalFormData>({
    name: '',
    age: '',
    gender: '', // Default to empty, let placeholder show
    crime_type: '',
    crime_severity: 'Medium',
    arrest_date: '',
    arrest_location: '',
    officer_in_charge: '',
    case_status: 'Pending',
    description: '',
    prison_name: '',
    release_date: '',
    photo: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler specifically for the Select component's onSelect prop
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const data = new FormData();
    // Append all fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
         if (key === 'photo' && value instanceof File) {
           data.append(key, value, value.name);
         } else if (typeof value === 'string' && value.trim() !== '') {
           data.append(key, value);
         }
      }
    });

    try {
      const response = await fetch('/api/criminals/add', {
        method: 'POST',
        body: data, // Send FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add criminal record');
      }

      setSuccessMessage(`Criminal record added successfully! ID: ${result.id}`);
      // Reset form or redirect
      setFormData({ // Reset form
        name: '', age: '', gender: '', crime_type: '', crime_severity: 'Medium',
        arrest_date: '', arrest_location: '', officer_in_charge: '', case_status: 'Pending',
        description: '', prison_name: '', release_date: '', photo: null
      });
      // Optional: Redirect after a delay
      // setTimeout(() => router.push('/criminals'), 2000);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CriminalsLayout title="Add Criminal Record">
      <Heading as="h2" align="center" style={{ marginBottom: '1.5rem' }}>Add New Criminal Record</Heading>

      {error && <Text color="danger" align="center" style={{ marginBottom: '1rem' }}>Error: {error}</Text>}
      {successMessage && <Text color="success" align="center" style={{ marginBottom: '1rem' }}>
        {successMessage}
      </Text>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Flex direction="column" gap="16">
          <Input
            id="name"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            required
            style={{ width: '100%' }}
          />
          <Flex gap="16" style={{ width: '100%' }} wrap={true}>
            <Input
              id="age"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              required
              style={{ flex: '1 1 120px', minWidth: '120px' }}
            />
            <Select
              id="gender"
              label="Gender"
              name="gender"
              value={formData.gender}
              options={genderOptions}
              onSelect={(value) => handleSelectChange(value, 'gender')}
              placeholder="Select gender"
              required
              style={{ flex: '1 1 180px', minWidth: '180px' }}
            />
          </Flex>
          <Input
            id="crime_type"
            label="Crime Type"
            name="crime_type"
            value={formData.crime_type}
            onChange={handleInputChange}
            placeholder="e.g., Theft, Assault"
            required
            style={{ width: '100%' }}
          />
          <Select
            id="crime_severity"
            label="Crime Severity"
            name="crime_severity"
            value={formData.crime_severity}
            options={severityOptions}
            onSelect={(value) => handleSelectChange(value, 'crime_severity')}
            required
            style={{ width: '100%' }}
          />
          <Input
            id="arrest_date"
            label="Arrest Date"
            name="arrest_date"
            type="date"
            value={formData.arrest_date}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          />
          <Input
            id="arrest_location"
            label="Arrest Location"
            name="arrest_location"
            value={formData.arrest_location}
            onChange={handleInputChange}
            placeholder="City, State, Address"
            required
            style={{ width: '100%' }}
          />
          <Input
            id="officer_in_charge"
            label="Officer in Charge"
            name="officer_in_charge"
            value={formData.officer_in_charge}
            onChange={handleInputChange}
            placeholder="Officer's name or ID"
            required
            style={{ width: '100%' }}
          />
          <Select
            id="case_status"
            label="Case Status"
            name="case_status"
            value={formData.case_status}
            options={statusOptions}
            onSelect={(value) => handleSelectChange(value, 'case_status')}
            required
            style={{ width: '100%' }}
          />
          <Textarea
            id="description"
            label="Description of Incident"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide details about the crime..."
            rows={4}
            required
            style={{ width: '100%' }}
          />
          <Input
            id="prison_name"
            label="Prison Name (Optional)"
            name="prison_name"
            value={formData.prison_name}
            onChange={handleInputChange}
            placeholder="Enter prison name if applicable"
            style={{ width: '100%' }}
          />
          <Input
            id="release_date"
            label="Release Date (Optional)"
            name="release_date"
            type="date"
            value={formData.release_date}
            onChange={handleInputChange}
            style={{ width: '100%' }}
          />
          <Input
            id="photo"
            label="Photo (Optional)"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: '100%' }}
          />

          <Button 
            label={isLoading ? "Saving..." : "Add Record"}
            type="submit" 
            loading={isLoading} 
            disabled={isLoading}
            style={{ marginTop: '1.5rem', width: '100%', maxWidth: '300px', alignSelf: 'center' }}
          />
        </Flex>
      </form>
    </CriminalsLayout>
  );
} 