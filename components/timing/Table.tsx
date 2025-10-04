export default function table() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Timing</h1>
      <p className="text-lg text-gray-700 mb-8">
        here you can see the timing of the library as per the subscription type
      </p>

      {/* Example schedule table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-orange-100">
            <th className="border border-gray-300 p-3">subscription</th>
            <th className="border border-gray-300 p-3">Opening Time</th>
            <th className="border border-gray-300 p-3">Closing Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3">fulltiming/mon-sunday</td>
            <td className="border border-gray-300 p-3">7:00 AM</td>
            <td className="border border-gray-300 p-3">10:00 PM</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">halftiming/mon-sun</td>
            <td className="border border-gray-300 p-3">7:00 AM</td>
            <td className="border border-gray-300 p-3">12:00 PM</td>
          </tr> <tr>
            <td className="border border-gray-300 p-3">halftiming/mon-sun</td>
            <td className="border border-gray-300 p-3">12:00 AM</td>
            <td className="border border-gray-300 p-3">5:00 PM</td>
          </tr> <tr>
            <td className="border border-gray-300 p-3">halftiming/mon-sun</td>
            <td className="border border-gray-300 p-3">5:00 AM</td>
            <td className="border border-gray-300 p-3">10:00 PM</td>
          </tr>
          {/* Add more days as needed */}
        </tbody>
      </table>
    </main>
  );
}