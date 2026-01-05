import React, { useState } from 'react';
import { Video, Play, Calendar, Eye, Upload, X } from 'lucide-react';

export default function AaryansCreations() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "My First Arduino Project",
      description: "In this video, I demonstrate my first Arduino project where I built an LED circuit with multiple patterns. The project helped me understand basic electronics and programming concepts.",
      videoUrl: "https://www.w3.org/2010/05/video/mediaevents.mp4",
      thumbnail: "",
      date: "2024-01-03",
      views: 0
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    videoUrl: ''
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now(),
      ...uploadForm,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      thumbnail: ''
    };
    setVideos([newVideo, ...videos]);
    setUploadForm({ title: '', description: '', videoUrl: '' });
    setIsUploading(false);
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
    setVideos(videos.map(v => 
      v.id === video.id ? { ...v, views: v.views + 1 } : v
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">
                Aaryan's Creations
              </h1>
              <p className="text-purple-200">Sharing my projects and experiments</p>
            </div>
            <button
              onClick={() => setIsUploading(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Upload size={20} />
              Share Video
            </button>
          </div>
        </div>
      </header>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Share Your Video</h2>
              <button
                onClick={() => setIsUploading(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-purple-200 font-semibold mb-2 text-lg">
                  Video Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="Give your video a title..."
                />
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-2 text-lg">
                  Video URL
                </label>
                <input
                  type="url"
                  required
                  value={uploadForm.videoUrl}
                  onChange={(e) => setUploadForm({ ...uploadForm, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="https://example.com/your-video.mp4"
                />
                <p className="text-purple-300/70 text-sm mt-2">
                  Paste a direct link to your video file (MP4, WebM, etc.)
                </p>
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-2 text-lg">
                  Description
                </label>
                <textarea
                  required
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="Tell viewers about your video... What did you create? What techniques did you use? What did you learn?"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Publish Video
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-6 py-4 rounded-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="bg-black rounded-xl overflow-hidden mb-4">
              <video
                controls
                autoPlay
                className="w-full max-h-[70vh]"
                src={selectedVideo.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4 text-purple-200">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{new Date(selectedVideo.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  <span>{selectedVideo.views} views</span>
                </div>
              </div>
              <p className="text-white leading-relaxed text-lg">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{videos.length}</div>
              <div className="text-purple-200">Videos</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">
                {videos.reduce((sum, v) => sum + v.views, 0)}
              </div>
              <div className="text-purple-200">Total Views</div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        {videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(video => (
              <div
                key={video.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] cursor-pointer group"
                onClick={() => openVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative bg-black aspect-video flex items-center justify-center">
                  <video
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    src={video.videoUrl}
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-purple-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Eye size={14} className="text-white" />
                    <span className="text-white text-sm font-semibold">{video.views}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-purple-100/80 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center text-purple-300 text-sm">
                    <Calendar size={14} className="mr-2" />
                    {new Date(video.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-md rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <Video size={64} className="text-purple-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">No videos yet</h3>
            <p className="text-purple-200 text-lg mb-6">Start sharing your amazing creations!</p>
            <button
              onClick={() => setIsUploading(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Share Your First Video
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-purple-200">
            © 2024 Aaryan's Creations • Showcasing creativity and innovation
          </p>
        </div>
      </footer>
    </div>
  );
}