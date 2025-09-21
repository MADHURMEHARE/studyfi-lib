'use client';

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

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onSendReminder: (student: Student) => Promise<void>;
}

export default function StudentTable({ students, onEdit, onDelete, onSendReminder }: StudentTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Student Records</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription End</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {student.photo ? (
                      <img 
                        src={student.photo} 
                        alt={student.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold" style={{ display: student.photo ? 'none' : 'flex' }}>
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={student.address}>
                  {student.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.seatNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.feeStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.feeStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.subscriptionEndDate ? (
                    <div className="flex flex-col">
                      <span>{new Date(student.subscriptionEndDate).toLocaleDateString()}</span>
                      {(() => {
                        const endDate = new Date(student.subscriptionEndDate);
                        const now = new Date();
                        const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                        
                        if (daysUntilExpiry < 0) {
                          return <span className="text-xs text-red-600 font-semibold">Expired</span>;
                        } else if (daysUntilExpiry <= 7) {
                          return <span className="text-xs text-orange-600 font-semibold">{daysUntilExpiry} days left</span>;
                        } else {
                          return <span className="text-xs text-green-600 font-semibold">Active</span>;
                        }
                      })()}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">No subscription</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    Edit
                  </button>
                  {student.feeStatus === 'Unpaid' && (
                    <button
                      onClick={() => onSendReminder(student)}
                      className="text-orange-600 hover:text-orange-900 transition-colors"
                    >
                      Remind
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(student._id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
