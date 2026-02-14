"use client";
import error from "next/error";
import { useState } from "react";


export default function VenueBasicInfo() {
  const [formData, setFormData] = useState({
    venueName: "",
    description: "",
    primarySport: "",
    numberOfCourts: "",
  });

  const [loading, setLoading] = useState(false);

  // Input + textarea
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Select
  const handleSelect = (e:any) => {
    setFormData((prev) => ({
      ...prev,
      primarySport: e.target.value,
    }));
  };

  // Number
  const handleNumberChange = (e:any) => {
    setFormData((prev) => ({
      ...prev,
      numberOfCourts: e.target.value,
    }));
  };

  // 🔥 Submit Handler
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.venueName ||
      !formData.primarySport ||
      !formData.numberOfCourts
    ) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ Payload
    const payload = {
      venue_name: formData.venueName,
      description: formData.description,
      primary_sport: formData.primarySport,
      number_of_courts: Number(formData.numberOfCourts),
    };

    console.log("Payload:", payload);

    try {
      setLoading(true);

      const res = await fetch("/api/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Venue created successfully ✅");

      // Optional: reset form
      setFormData({
        venueName: "",
        description: "",
        primarySport: "",
        numberOfCourts: "",
      });
    } catch (error:any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-[#0f172a] rounded-lg text-white"
    >
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

      {/* Venue Name */}
      <div className="mb-4">
        <label className="block mb-1">Venue Name *</label>
        <input
          type="text"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#020617] border border-gray-700"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded bg-[#020617] border border-gray-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Primary Sport */}
        <div>
          <label className="block mb-1">Primary Sport *</label>
          <select
            value={formData.primarySport}
            onChange={handleSelect}
            className="w-full p-2 rounded bg-[#020617] border border-gray-700"
          >
            <option value="">Select</option>
            <option value="Padel">Padel</option>
            <option value="Tennis">Tennis</option>
            <option value="Badminton">Badminton</option>
          </select>
        </div>

        {/* Number of Courts */}
        <div>
          <label className="block mb-1">Number of Courts *</label>
          <input
            type="number"
            min={1}
            value={formData.numberOfCourts}
            onChange={handleNumberChange}
            className="w-full p-2 rounded bg-[#020617] border border-gray-700"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Create Venue"}
      </button>
    </form>
  );
}
