'use client'
import React, { useState } from 'react';
import { Search, UserPlus, CalendarPlus, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type Patient = {
  id: number;
  name: string;
  age: number;
  condition: string;
};

const mockPatients: Patient[] = [
  { id: 1, name: 'Aditi Singh', age: 28, condition: 'Diabetes' },
  { id: 2, name: 'Rahul Sharma', age: 45, condition: 'Hypertension' },
  { id: 3, name: 'Sneha Patil', age: 32, condition: 'Asthma' },
  { id: 4, name: 'Vikram Desai', age: 55, condition: 'Arthritis' },
  { id: 5, name: 'Priya Reddy', age: 38, condition: 'Allergy' },
];

const ActionButtons = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const results = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="fixed top-20 left-6 z-30">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all gap-2"
            size="lg"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search Patient</span>
          </Button>

          {showSearch && (
            <div className="absolute top-14 left-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Search Patients</h3>
                <button
                  onClick={closeSearch}
                  className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter patient name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {searchQuery && (
                  <div className="mt-4 max-h-64 overflow-y-auto">
                    {isSearching ? (
                      <div className="text-center py-4">
                      <Loader2 className='animate-spin bg-blue-600'/>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((patient) => (
                          <div
                            key={patient.id}
                            className="p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-800">{patient.name}</p>
                                <p className="text-sm text-gray-600">
                                  Age: {patient.age}
                                </p>
                              </div>
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {patient.name.charAt(0)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">No patients found</p>
                        <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Link href="/patient/add-patient">
          <Button
            className="bg-white text-black cursor-pointer hover:bg-gray-400 border-gray-500 shadow-lg hover:shadow-xl transition-all gap-2"
            size="lg"
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Patient</span>
          </Button>
        </Link>

        <Link href="/appointments/add-appointment">
          <Button
            className="bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all gap-2"
            size="lg"
          >
            <CalendarPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Appointment</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;