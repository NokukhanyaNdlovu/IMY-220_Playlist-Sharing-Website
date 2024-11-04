import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";
import Navbar from "../components/Navbar"; 
import Fuse from 'fuse.js';

const Home = () => {
  const { songs, albums } = SongData();
  const [activeTab, setActiveTab] = useState("All"); // State to track active tab
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const options = {
      keys: ['title', 'singer', 'description'], // keys to search in songs
      threshold: 0.3, // Adjust threshold for fuzziness
    };

    
    const fuseSongs = new Fuse(songs, options);
    const fuseAlbums = new Fuse(albums, options);

    const songResults = fuseSongs.search(searchTerm).map(result => ({ ...result.item, type: 'song' }));
    const albumResults = fuseAlbums.search(searchTerm).map(result => ({ ...result.item, type: 'album' }));

    
    const results = [...songResults, ...albumResults];

    
    setSearchResults(results);
  }, [searchTerm, songs, albums]);

 
  const sortByDateDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

  
  const sortedSongs = [...songs].sort(sortByDateDesc);
  const sortedAlbums = [...albums].sort(sortByDateDesc);

  return (
    <Layout>
      <Navbar onTabChange={setActiveTab} onSearch={setSearchTerm} />

      {searchTerm ? (
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Search Results</h1>
          {searchResults.length > 0 ? (
            <div className="flex overflow-auto">
              {searchResults.map((item, index) => (
                item.type === 'song' ? (
                  <SongItem
                    key={index}
                    image={item.thumbnail.url}
                    name={item.title}
                    desc={item.description}
                    id={item._id}
                  />
                ) : (
                  <AlbumItem
                    key={index}
                    image={item.thumbnail.url}
                    name={item.title}
                    desc={item.description}
                    id={item._id}
                  />
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      ) : (
        // Displaying content based on active tab when not searching
        <>
          {activeTab === "All" && (
            <>
              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Trending Playlists</h1>
                <div className="flex overflow-auto">
                  {sortedAlbums.map((e, i) => (
                    <AlbumItem
                      key={i}
                      image={e.thumbnail.url}
                      name={e.title}
                      desc={e.description}
                      id={e._id}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                  {sortedSongs.map((e, i) => (
                    <SongItem
                      key={i}
                      image={e.thumbnail.url}
                      name={e.title}
                      desc={e.description}
                      id={e._id}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === "Songs" && (
            <div className="mb-4">
              <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
              <div className="flex overflow-auto">
                {sortedSongs.map((e, i) => (
                  <SongItem
                    key={i}
                    image={e.thumbnail.url}
                    name={e.title}
                    desc={e.description}
                    id={e._id}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "Playlists" && (
            <div className="mb-4">
              <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
              <div className="flex overflow-auto">
                {sortedAlbums.map((e, i) => (
                  <AlbumItem
                    key={i}
                    image={e.thumbnail.url}
                    name={e.title}
                    desc={e.description}
                    id={e._id}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Home;
