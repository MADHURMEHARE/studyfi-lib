'use client';

interface SeatMapProps {
  students: any[];
  onSeatClick: (seatNumber: number) => void;
}

export default function SeatMap({ students = [], onSeatClick }: SeatMapProps) {
  const totalSeats = 40;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  
  const isSeatOccupied = (seatNumber: number) => {
    return students && students.length > 0 ? students.some(student => student.seatNumber === seatNumber) : false;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Seat Map (40 Seats)</h2>
      <div className="grid grid-cols-8 gap-3">
        {seats.map((seatNumber) => {
          const isOccupied = isSeatOccupied(seatNumber);
          return (
            <button
              key={seatNumber}
              onClick={() => onSeatClick(seatNumber)}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                isOccupied
                  ? 'bg-red-500 border-red-600 text-white hover:bg-red-600'
                  : 'bg-green-500 border-green-600 text-white hover:bg-green-600'
              }`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
      </div>
    </div>
  );
}
