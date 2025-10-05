'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface Resource {
  _id: string;
  type: 'link' | 'file';
  title: string;
  url: string;
  description?: string;
  uploadedAt: string;
}

interface Batch {
  _id: string;
  name: string;
  description: string;
  subject: string;
  students: any[];
  resources: Resource[];
  isActive: boolean;
  teacherInfo: {
    name: string;
    university: string;
    email?: string;
  };
}

export default function StudentBatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { userId } = useAuth();
  const batchId = params.batchId as string;
  
  const [batch, setBatch] = useState<Batch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (batchId) {
      fetchBatch();
    }
  }, [batchId]);

  const fetchBatch = async () => {
    try {
      const response = await fetch(`/api/student/batches/${batchId}`);
      if (response.ok) {
        const data = await response.json();
        setBatch(data.batch);
      } else {
        console.error('Failed to fetch batch');
      }
    } catch (error) {
      console.error('Error fetching batch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading batch...</div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Batch not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/dashboard/student')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{batch.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{batch.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Subject:</span>
                <p className="font-medium">{batch.subject}</p>
              </div>
              <div>
                <span className="text-gray-500">Teacher:</span>
                <p className="font-medium">{batch.teacherInfo.name}</p>
              </div>
              <div>
                <span className="text-gray-500">University:</span>
                <p className="font-medium">{batch.teacherInfo.university}</p>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  batch.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {batch.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Resources:</span>
                <p className="font-medium">{batch.resources.length} available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Learning Resources</h2>
            <span className="text-sm text-gray-500">
              {batch.resources.length} resource{batch.resources.length !== 1 ? 's' : ''}
            </span>
          </div>

          {batch.resources.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No resources yet</h3>
              <p className="mt-2 text-gray-500">Your teacher hasn't uploaded any resources yet.</p>
              <p className="text-sm mt-1">Check back later for learning materials.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {batch.resources.map((resource) => (
                <div key={resource._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        resource.type === 'link' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {resource.type === 'link' ? '🔗 Link' : '📁 File'}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                    </div>
                  </div>
                  
                  {resource.description && (
                    <p className="text-gray-600 mb-4 text-lg">{resource.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-lg font-medium break-all"
                    >
                      {resource.url}
                    </a>
                    
                    <button
                      onClick={() => window.open(resource.url, '_blank')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ml-4 whitespace-nowrap"
                    >
                      {resource.type === 'link' ? 'Visit Link' : 'Download'}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Uploaded on {formatDate(resource.uploadedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{batch.resources.length}</div>
            <div className="text-sm text-blue-800">Total Resources</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{batch.students.length}</div>
            <div className="text-sm text-green-800">Students Enrolled</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {batch.resources.filter(r => r.type === 'file').length}
            </div>
            <div className="text-sm text-purple-800">Files Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}