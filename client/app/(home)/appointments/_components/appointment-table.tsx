"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash,
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Calendar,
  Edit,
  Save,
  User,
  Plus,
} from "lucide-react";
import { format, parse, parseISO } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AppointmentTableType } from "@/types/appointment";
import { appointmentsAPI } from "@/lib/apis/appointments/api";
import Link from "next/link";
import { toast } from "sonner";

type AppointmentStatus = "Pending" | "Missed" | "Completed";

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const variants = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Completed: "bg-green-100 text-green-700 border-green-200",
    Missed: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${variants[status]} border font-medium`}
    >
      {status}
    </Badge>
  );
};

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState<AppointmentTableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc" | "none">(
    "asc"
  );

  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await appointmentsAPI.getAll();

      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const [editStatus, setEditStatus] = useState<{
    [id: number]: AppointmentStatus | undefined;
  }>({});
  const itemsPerPage = 10;

  const handleSaveStatus = useCallback(
    async (id: number) => {
      const newStatus = editStatus[id];

      if (newStatus) {
        try {
          await appointmentsAPI.update(id, newStatus);
          setAppointments((prev) =>
            prev.map((app) =>
              app.id === id ? { ...app, status: newStatus } : app
            )
          );
          toast.success("Successfully changed status");
        } catch (error) {
          console.log(error);
        } finally {
          setEditStatus((prev) => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
          });
        }
      }
    },
    [editStatus]
  );

  const handleEditStatusChange = useCallback(
    (id: number, newStatus: string) => {
      setEditStatus((prev) => ({
        ...prev,
        [id]: newStatus as AppointmentStatus,
      }));
    },
    []
  );

  const handleDelete = useCallback((id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((app) => app.id !== id));
      setCurrentPage(1);
    }
  }, []);

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = appointments;

    if (searchQuery) {
      filtered = filtered.filter((app) =>
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (dateSortOrder !== "none") {
      filtered = [...filtered].sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);

        if (dateSortOrder === "asc") {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    }

    return filtered;
  }, [appointments, searchQuery, statusFilter, dateSortOrder]);

  const totalPages = Math.ceil(
    filteredAndSortedAppointments.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAndSortedAppointments.slice(
    startIndex,
    endIndex
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const toggleDateSort = () => {
    setDateSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading Appointments...</p>
        </div>
      </CardContent>
    );
  }

  if (error) {
    return (
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            onClick={fetchAppointments}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    );
  }
  return (
    <CardContent className="p-0">
      {/* HEADER/FILTER BAR */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search appointments by patient name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <div className="flex gap-3">
            <Link href="/appointments/add-appointment">
              <Button className="bg-blue-500 cursor-pointer text-white flex gap-2 items-center">
                <Plus />
                <span>Add appointment</span>
              </Button>
            </Link>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-[160px] bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={toggleDateSort}
              className="bg-white gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              Date{" "}
              {dateSortOrder === "asc"
                ? "↑"
                : dateSortOrder === "desc"
                ? "↓"
                : ""}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">
            {filteredAndSortedAppointments.length}
          </span>
          {searchQuery || statusFilter !== "all" ? "filtered" : "total"}{" "}
          appointments
          {(searchQuery ||
            statusFilter !== "all" ||
            dateSortOrder !== "asc") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateSortOrder("asc");
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
              <TableHead className="font-semibold text-gray-700 w-16">
                #
              </TableHead>
              <TableHead className="font-semibold text-gray-700 w-[140px]">
                <Calendar className="w-4 h-4 inline mr-1 text-gray-500" /> Date
              </TableHead>
              <TableHead className="font-semibold text-gray-700 w-[150px]">
                <Clock className="w-4 h-4 inline mr-1 text-gray-500" /> Time
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Patient Name
              </TableHead>
              <TableHead className="font-semibold w-[120px] text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold w-0px] text-gray-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((app, index) => {
                const isEditing =
                  editStatus[app.id] !== undefined &&
                  editStatus[app.id] !== app.status;
                const currentEditStatus = editStatus[app.id] || app.status;

                return (
                  <TableRow
                    key={app.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-600">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {format(parseISO(app.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-gray-700 font-medium">
                      {format(
                        parse(app.time, "HH:mm:ss", new Date()), // Simplified mask
                        "hh:mm a"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {app.patientName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">
                          {app.patientName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={
                          app.status as "Pending" | "Completed" | "Missed"
                        }
                      />
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Select
                          value={currentEditStatus}
                          onValueChange={(newStatus) =>
                            handleEditStatusChange(app.id, newStatus)
                          }
                        >
                          <SelectTrigger className="w px-5 border-none bg-white hover:bg-blue-100/50 hover:text-blue-600 transition-colors">
                            <Edit className="w- h-4 mx-auto text-gray-500 hover:text-blue-600" />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Missed">Missed</SelectItem>
                          </SelectContent>
                        </Select>

                        {isEditing && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSaveStatus(app.id)}
                            className="h-8 p-2 bg-blue-600 hover:bg-blue-700 text-white gap-1"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                        )}

                        {/* 3. Delete Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(app.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">
                      No appointments found
                    </p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedAppointments.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50/50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(endIndex, filteredAndSortedAppointments.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {filteredAndSortedAppointments.length}
            </span>{" "}
            appointments
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
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
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </CardContent>
  );
};

export default AppointmentTable;
