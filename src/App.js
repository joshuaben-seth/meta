import React, { useState } from 'react';
import { Button, Label } from './components';
import { Sun, Moon, Play, Pause, LayoutGrid, LayoutList, Disc3 } from 'lucide-react';

const songs = [
  {
    id: 1,
    avatar: 'https://picsum.photos/200/300',
    name: 'Song 1',
    artist: 'Artist 1',
    duration: '3:45',
  },
  {
    id: 2,
    avatar: 'https://picsum.photos/200/301',
    name: 'Song 2',
    artist: 'Artist 2',
    duration: '4:20',
  },
  {
    id: 3,
    avatar: 'https://picsum.photos/200/302',
    name: 'Song 3',
    artist: 'Artist 3',
    duration: '5:10',
  },
  // Add more songs here...
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleGridViewToggle = () => {
    setGridView(!gridView);
  };

  const handlePlaySong = (song) => {
    setCurrentlyPlaying(currentlyPlaying === song.id ? null : song.id);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <Label className="text-2xl font-bold">Music Playlist</Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleDarkModeToggle}
              className={`transition-colors hover:scale-105 text-foreground ${
                darkMode 
                  ? 'hover:bg-gray-700 hover:text-yellow-300' 
                  : 'hover:bg-gray-200 hover:text-orange-500'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGridViewToggle}
              className={`transition-colors text-foreground ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-200'
              }`}
            >
              {gridView ? <LayoutList size={20} /> : <LayoutGrid size={20} />}
            </Button>
          </div>
        </div>
        <div
          className={`grid gap-4 ${
            gridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}
        >
          {songs.map((song) => (
            <div
              key={song.id}
              className={`relative rounded-lg p-4 transition-all duration-200 ${
                currentlyPlaying === song.id
                  ? darkMode 
                    ? 'bg-green-600 text-white shadow-green-500/50' 
                    : 'bg-green-500 text-white shadow-green-600/50'
                  : darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50'
              } shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
              onClick={() => handlePlaySong(song)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={song.avatar} 
                    alt={song.name} 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  {currentlyPlaying === song.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                      <div className="animate-spin">
                        <Disc3 size={24} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <Label className="text-lg font-semibold">{song.name}</Label>
                  <Label className={`text-sm ${currentlyPlaying === song.id ? 'text-gray-100' : 'text-gray-500'}`}>
                    {song.artist}
                  </Label>
                  <Label className={`text-sm ${currentlyPlaying === song.id ? 'text-gray-100' : 'text-gray-500'}`}>
                    {song.duration}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  className={`ml-auto ${
                    currentlyPlaying === song.id 
                      ? 'text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  {currentlyPlaying === song.id ? <Pause size={20} /> : <Play size={20} />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;