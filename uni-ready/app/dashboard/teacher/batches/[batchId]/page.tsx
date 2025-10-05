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
}

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { userId } = useAuth();
  const batchId = params.batchId as string;
  
  const [batch, setBatch] = useState<Batch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // New resource form state
  const [newResource, setNewResource] = useState({
    type: 'link' as 'link' | 'file',
    title: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    if (batchId) {
      fetchBatch();
    }
  }, [batchId]);

  const fetchBatch = async () => {
    try {
      const response = await fetch(`/api/teachers/batches/${batchId}`);
      if (response.ok) {
        const data = await response.json();
        setBatch(data.batch);
      }
    } catch (error) {
      console.error('Error fetching batch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title.trim() || !newResource.url.trim()) {
      alert('Please fill in title and URL');
      return;
    }

    setUploading(true);
    try {
      const response = await fetch(`/api/teachers/batches/${batchId}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      if (response.ok) {
        // Reset form and refresh batch data
        setNewResource({
          type: 'link',
          title: '',
          url: '',
          description: ''
        });
        fetchBatch(); // Refresh to show new resource
      } else {
        alert('Failed to upload resource');
      }
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Error uploading resource');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResource(prev => ({
      ...prev,
      [name]: value
    }));
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
            onClick={() => router.push('/dashboard/teacher/batches')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to Batches
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{batch.name}</h1>
          <p className="text-gray-600 mt-2">{batch.description}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>Subject: {batch.subject}</span>
            <span>Students: {batch.students.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Resource Form - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Resource</h2>
              
              <form onSubmit={handleUploadResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={newResource.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="link">Link</option>
                    <option value="file">File</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newResource.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Calculus Notes, Practice Problems"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {newResource.type === 'link' ? 'URL *' : 'File URL *'}
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={newResource.url}
                    onChange={handleInputChange}
                    placeholder={newResource.type === 'link' ? 'https://...' : 'https://drive.google.com/...'}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newResource.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description of this resource..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Resource'}
                </button>
              </form>
            </div>
          </div>

          {/* Resources List - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Batch Resources</h2>
                <span className="text-sm text-gray-500">
                  {batch.resources.length} resources
                </span>
              </div>

              {batch.resources.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2">No resources uploaded yet</p>
                  <p className="text-sm">Add your first resource using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {batch.resources.map((resource) => (
                    <div key={resource._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              resource.type === 'link' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {resource.type}
                            </span>
                            <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          </div>
                          
                          {resource.description && (
                            <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                          )}
                          
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm break-all"
                          >
                            {resource.url}
                          </a>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            Added {new Date(resource.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}