'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

interface Batch {
  _id: string;
  name: string;
  description: string;
  subject: string;
  students: any[];
  resources: any[];
  isActive: boolean;
  createdAt: string;
  teacherId: {
    name: string;
    university: string;
  };
}

export default function ExploreBatches() {
  const { userId } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailableBatches();
  }, []);

  const fetchAvailableBatches = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/student/batches/explore');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch batches: ${response.status}`);
      }
      
      const data = await response.json();
      setBatches(data.batches || []);
    } catch (error) {
      console.error('Error fetching batches:', error);
      setError('Failed to load batches. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinBatch = async (batchId: string) => {
    setJoining(batchId);
    try {
      const response = await fetch(`/api/student/batches/${batchId}/join`, {
        method: 'POST',
      });

      if (response.ok) {
        // Remove the joined batch from the list
        setBatches(prev => prev.filter(batch => batch._id !== batchId));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to join batch');
      }
    } catch (error) {
      console.error('Error joining batch:', error);
      alert('Error joining batch. Please try again.');
    } finally {
      setJoining(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading available batches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Batches</h1>
              <p className="text-gray-600 mt-2">
                Discover and join batches taught by university students
              </p>
            </div>
            <Link
              href="/dashboard/student"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {batches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No batches available</h3>
            <p className="mt-2 text-gray-500">
              There are no batches available to join at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div key={batch._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{batch.name}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{batch.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Subject:</span>
                      <span className="font-medium">{batch.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Teacher:</span>
                      <span className="font-medium">{batch.teacherId?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>University:</span>
                      <span className="font-medium">{batch.teacherId?.university}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium">{batch.students.length} enrolled</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleJoinBatch(batch._id)}
                    disabled={joining === batch._id}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {joining === batch._id ? 'Joining...' : 'Join Batch'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}