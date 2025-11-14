"use client";
import { useState } from "react";

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = [
    { id: 1, src: "/videos/Heroo.mp4", title: "Room 1" },
    { id: 2, src: "/videos/Heroo.mp4", title: "Room 2" },
    { id: 3, src: "/videos/Heroo.mp4", title: "Room 3" },
    { id: 4, src: "/videos/Heroo.mp4", title: "Room 4" },
  ];

  return (
    <section className="relative w-full h-screen py-20 px-6 bg-black text-white rounded-3xl">
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-xl">
          lab interior videos
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:shadow-orange-500/30 transition duration-300"
          >
            <video
              src={video.src}
              controls
              className="w-full h-56 object-cover"
              onPlay={() => setActiveVideo(video.id)}
              onPause={() => setActiveVideo(null)}
            />

            <div className="p-4 text-center bg-black/60 backdrop-blur-md">
              <h3 className="text-lg font-semibold">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
