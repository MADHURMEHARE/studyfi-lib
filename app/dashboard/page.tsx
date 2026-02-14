'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LogOut, Plus, Mail, Users, MapPin, Home } from 'lucide-react';
// import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import SeatMap from '@/components/dashboard/SeatMap';
import StudentTable from '@/components/dashboard/StudentTable';
import StudentForm from '@/components/dashboard/StudentForm';
import PendingApprovals from '@/components/dashboard/PendingApprovals';
import SubscriptionManager from '@/components/dashboard/SubscriptionManager';
import NotificationSystem from '@/components/dashboard/NotificationSystem';



interface Student {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo: string;
  seatNumber: number;
  feeStatus: 'Paid' | 'Unpaid';
  joinDate: string;
  subscriptionEndDate?: string;
}

interface Seat {
  _id: string;
  seatNumber: number;
  isAvailable: boolean;
  studentId?: {
    _id: string;
    name: string;
    email: string;
    feeStatus: string;
  };
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'students' | 'approvals' | 'subscriptions'>('students');
  const { logout } = useAuth();
  
  // Demo data - in a real app, this would come from an API
  const [students, setStudents] = useState<Student[]>([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Main Street, New York, NY 10001',
      photo: '/uploads/sample-1.jpg',
      seatNumber: 1,
      feeStatus: 'Paid',
      joinDate: '2024-01-15',
      subscriptionEndDate: '2025-02-15' // 30 days from now
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phoneNumber: '+1 (555) 234-5678',
      address: '456 Oak Avenue, Los Angeles, CA 90210',
      photo: '/uploads/sample-2.jpg',
      seatNumber: 5,
      feeStatus: 'Unpaid',
      joinDate: '2024-01-20',
      subscriptionEndDate: '2025-01-20' // Expires in 3 days
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phoneNumber: '+1 (555) 345-6789',
      address: '789 Pine Street, Chicago, IL 60601',
      photo: '/uploads/sample-3.jpg',
      seatNumber: 12,
      feeStatus: 'Paid',
      joinDate: '2024-01-25',
      subscriptionEndDate: '2024-12-25' // Expired
    }
  ]);

  // Demo seats data - in a real app, this would come from an API
  const [seats, setSeats] = useState<Seat[]>(() => {
    const allSeats: Seat[] = [];
    for (let i = 1; i <= 40; i++) {
      const student = students.find(s => s.seatNumber === i);
      allSeats.push({
        _id: `seat-${i}`,
        seatNumber: i,
        isAvailable: !student,
        studentId: student ? {
          _id: student._id,
          name: student.name,
          email: student.email,
          feeStatus: student.feeStatus
        } : undefined
      });
    }
    return allSeats;
  });

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [sendingReminders, setSendingReminders] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleSubmitStudent = async (studentData: any) => {
    // Demo functionality - in a real app, this would make an API call
    const newStudent = {
      ...studentData,
      _id: editingStudent ? editingStudent._id : Date.now().toString(),
      joinDate: editingStudent ? editingStudent.joinDate : new Date().toISOString().split('T')[0]
    };

    if (editingStudent) {
      setStudents(prev => prev.map(s => s._id === editingStudent._id ? newStudent : s));
      toast.success('Student updated successfully');
    } else {
      setStudents(prev => [...prev, newStudent]);
      toast.success('Student added successfully');
    }

    // Update seats
    setSeats(prev => prev.map(seat => {
      if (seat.seatNumber === studentData.seatNumber) {
        return {
          ...seat,
          isAvailable: false,
          studentId: {
            _id: newStudent._id,
            name: newStudent.name,
            email: newStudent.email,
            feeStatus: newStudent.feeStatus
          }
        };
      }
      return seat;
    }));

    setShowStudentForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    const student = students.find(s => s._id === studentId);
    if (student) {
      // Free up the seat
      setSeats(prev => prev.map(seat => {
        if (seat.seatNumber === student.seatNumber) {
          return { ...seat, isAvailable: true, studentId: undefined };
        }
        return seat;
      }));
    }

    setStudents(prev => prev.filter(s => s._id !== studentId));
    toast.success('Student deleted successfully');
  };

  const handleSendReminder = async (student: Student) => {
    if (!confirm(`Send reminder email to ${student.name}?`)) return;

    // Demo functionality - in a real app, this would make an API call
    toast.success(`Reminder sent to ${student.name}`);
  };

  const handleSendAllReminders = async () => {
    const unpaidStudents = students.filter(s => s.feeStatus === 'Unpaid');
    if (unpaidStudents.length === 0) {
      toast.error('No students with unpaid fees found');
      return;
    }

    if (!confirm(`Send reminder emails to ${unpaidStudents.length} students with unpaid fees?`)) return;

    setSendingReminders(true);
    
    // Demo functionality - simulate sending emails
    setTimeout(() => {
      toast.success(`Reminders sent to ${unpaidStudents.length} students`);
      setSendingReminders(false);
    }, 2000);
  };

  const availableSeats = seats
    .filter(seat => seat.isAvailable)
    .map(seat => seat.seatNumber)
    .sort((a, b) => a - b);

  const occupiedSeats = seats.filter(seat => !seat.isAvailable).length;
  const unpaidStudents = students.filter(student => student.feeStatus === 'Unpaid').length;



  return ( 
  <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
  
  {/* SIDEBAR */}
  <aside className="hidden md:flex w-64 flex-col bg-white/90 backdrop-blur-md border-r border-orange-200 fixed inset-y-0 left-0 z-30">
    <div className="p-6 font-bold text-xl text-orange-600">
      StudyFi Admin
    </div>

    <nav className="flex-1 px-4 space-y-2">
      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-orange-50">
        Dashboard
      </button>
      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-orange-50">
        Students
      </button>
      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-orange-50">
        Subscriptions
      </button>
    </nav>

    <div className="p-4 border-t">
      <button
        onClick={handleLogout}
        className="w-full text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  </aside>

  {/* MAIN CONTENT */}
  <div className="flex-1 md:ml-64 w-full">

    {/* Mobile Top Bar */}
    <div className="md:hidden bg-white shadow px-4 py-3 sticky top-0 z-20">
      <h1 className="font-bold text-orange-600">StudyFi Dashboard</h1>
    </div>

    {/* CONTENT WRAPPER */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* 🔥 KEEP ALL YOUR EXISTING CONTENT HERE 🔥 */}
      <NotificationSystem />

      {/* Stats Cards */}
      {/* (your existing code continues unchanged) */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-orange-600">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Seats</p>
                <p className="text-3xl font-bold text-green-600">{40 - occupiedSeats}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unpaid Fees</p>
                <p className="text-3xl font-bold text-red-600">{unpaidStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleAddStudent}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={availableSeats.length === 0}
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
          
          <button
            onClick={handleSendAllReminders}
            disabled={unpaidStudents === 0 || sendingReminders}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="w-5 h-5" />
            <span>{sendingReminders ? 'Sending...' : `Send Reminders (${unpaidStudents})`}</span>
          </button>
        </div>

        {/* Demo Notice */}
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-orange-800">Frontend Demo Mode</h3>
              <p className="text-orange-700 font-medium">
                This is a demo version with sample data. All changes are temporary and will reset on page refresh.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-orange-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('students')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === 'students'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                Student Management
              </button>
              <button
                onClick={() => setActiveTab('approvals')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === 'approvals'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                Pending Approvals
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  activeTab === 'subscriptions'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                Subscription Manager
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'students' ? (
          <>
            {/* Seat Map */}
            <div className="mb-8">
          <SeatMap 
            students={students}
            onSeatClick={(seatNumber) => {
              if (seats.find(s => s.seatNumber === seatNumber)?.isAvailable) {
                setEditingStudent(null);
                setShowStudentForm(true);
              }
            }}
          />
        </div>

        {/* Student Table */}
        <StudentTable
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          onSendReminder={handleSendReminder}
        />

        {/* Student Form Modal */}
        <StudentForm
          student={editingStudent}
          isOpen={showStudentForm}
          onClose={() => {
            setShowStudentForm(false);
            setEditingStudent(null);
          }}
          onSubmit={handleSubmitStudent}
          availableSeats={availableSeats}
        />
          </>
        ) : activeTab === 'approvals' ? (
          <PendingApprovals />
        ) : (
          <SubscriptionManager />
        )}
      </main>

    </main>
  </div>
</div>
  );
}