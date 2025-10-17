'use client'
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Eye, Trash, Search, Filter, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastVisited: string;
};

const mockPatients: Patient[] = [
  { id: 1, name: 'Aditi Singh', age: 28, gender: 'Female', lastVisited: '2025-10-15' },
  { id: 2, name: 'Rahul Sharma', age: 45, gender: 'Male', lastVisited: '2025-10-14' },
  { id: 3, name: 'Sneha Patil', age: 32, gender: 'Female', lastVisited: '2025-10-13' },
  { id: 4, name: 'Vikram Desai', age: 55, gender: 'Male', lastVisited: '2025-10-12' },
  { id: 5, name: 'Priya Reddy', age: 38, gender: 'Female', lastVisited: '2025-10-11' },
  { id: 6, name: 'Arjun Mehta', age: 41, gender: 'Male', lastVisited: '2025-10-10' },
  { id: 7, name: 'Kavya Iyer', age: 26, gender: 'Female', lastVisited: '2025-10-09' },
  { id: 8, name: 'Rohan Kapoor', age: 52, gender: 'Male', lastVisited: '2025-10-08' },
  { id: 9, name: 'Meera Joshi', age: 35, gender: 'Female', lastVisited: '2025-10-07' },
  { id: 10, name: 'Amit Kumar', age: 48, gender: 'Male', lastVisited: '2025-10-06' },
  { id: 11, name: 'Neha Gupta', age: 29, gender: 'Female', lastVisited: '2025-10-05' },
  { id: 12, name: 'Sanjay Verma', age: 62, gender: 'Male', lastVisited: '2025-10-04' },
  { id: 13, name: 'Anjali Nair', age: 31, gender: 'Female', lastVisited: '2025-10-03' },
  { id: 14, name: 'Kiran Rao', age: 44, gender: 'Other', lastVisited: '2025-10-02' },
  { id: 15, name: 'Pooja Shah', age: 27, gender: 'Female', lastVisited: '2025-10-01' },
];

const GenderBadge = ({ gender }: { gender: Patient['gender'] }) => {
  const variants = {
    Male: 'bg-blue-100 text-blue-700 border-blue-200',
    Female: 'bg-pink-100 text-pink-700 border-pink-200',
    Other: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <Badge className={`${variants[gender]} border font-medium`}>
      {gender}
    </Badge>
  );
};

const PatientTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [ageSortOrder, setAgeSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const itemsPerPage = 10;

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = mockPatients;

    if (searchQuery) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (genderFilter !== 'all') {
      filtered = filtered.filter(patient => patient.gender === genderFilter);
    }

    if (ageSortOrder !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        return ageSortOrder === 'asc' ? a.age - b.age : b.age - a.age;
      });
    }

    return filtered;
  }, [searchQuery, genderFilter, ageSortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredAndSortedPatients.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const toggleAgeSort = () => {
    setAgeSortOrder(prev => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleGenderFilterChange = (value: string) => {
    setGenderFilter(value);
    setCurrentPage(1);
  };

  return (
    <CardContent className="p-0">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search patients by name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <div className="flex gap-3">
            <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
              <SelectTrigger className="w-[140px] bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={toggleAgeSort}
              className="bg-white gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              Age {ageSortOrder === 'asc' ? '↑' : ageSortOrder === 'desc' ? '↓' : ''}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">{filteredAndSortedPatients.length}</span>
          {searchQuery || genderFilter !== 'all' ? 'filtered' : 'total'} patients
          {(searchQuery || genderFilter !== 'all' || ageSortOrder !== 'none') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setGenderFilter('all');
                setAgeSortOrder('none');
                setCurrentPage(1);
              }}
              className="h-6 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700 w-12">#</TableHead>
              <TableHead className="font-semibold text-gray-700">Patient Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Age</TableHead>
              <TableHead className="font-semibold text-gray-700">Gender</TableHead>
              <TableHead className="font-semibold text-gray-700">Last Visited</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPatients.length > 0 ? (
              currentPatients.map((patient, index) => (
                <TableRow 
                  key={patient.id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-600">
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{patient.age}</TableCell>
                  <TableCell>
                    <GenderBadge gender={patient.gender} />
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {format(new Date(patient.lastVisited), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/patient/${patient.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        >
                        <Eye className="w-4 h-4" />
                      </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">No patients found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedPatients.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50/50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(endIndex, filteredAndSortedPatients.length)}</span> of{' '}
            <span className="font-semibold">{filteredAndSortedPatients.length}</span> patients
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={goToPreviousPage}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => goToPage(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={goToNextPage}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </CardContent>
  );
};

export default PatientTable;