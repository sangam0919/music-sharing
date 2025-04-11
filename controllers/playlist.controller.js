const { Playlist } = require('../models/config')
const { Music } = require('../models/config')


const playlistController = {
    async createPlaylist(playlistName, music_id, user_id) {
        try {
            const playlist = await Playlist.create({
                playlistName,
                music_id,
                user_id
            });
            console.log('Playlist created:', playlist);
            return playlist;
        } catch (error) {
            console.error('Error creating playlist:', error);
            throw error;
        }
    },

    async getPlaylistByName(playlistName) {
        try {
            const playlist = await Playlist.findAll({
                where: { playlistName },
                include: [{ model: Music, attributes: ['id', 'songName', 'artist'] }]
            });
            return playlist;
        } catch (error) {
            console.error('Error fetching playlist:', error);
            throw error;
        }
    },

    async getAllPlaylists(user_id) {
        try {
            const playlists = await Playlist.findAll({
                where: { user_id },
                include: [{ model: Music, attributes: ['id', 'songName', 'artist'] }]
            });
            const playlistData = playlists.map(playlist => {
                return {
                    id: playlist.id,
                    playlistName: playlist.playlistName,
                    music_id: playlist.music_id,
                    createdAt: playlist.createdAt,
                    user_id: playlist.user_id,
                    Music: {
                        id: playlist.Music.id,
                        songName: playlist.Music.songName,
                        artist: playlist.Music.artist
                    }
                };
            });
            return playlistData;

        } catch (error) {
            console.error('Error fetching playlists:', error);
            throw error;
        }
    },

    async deletePlaylist(playlistId) {
        try {
            const result = await Playlist.destroy({
                where: { playlistName: playlistId }
            })
            if (result === 0) {
                throw new Error('Playlist not found');
            }
            console.log('Playlist deleted:', result);
        }
        catch (error) {
            console.error('Error deleting playlist:', error);
            throw error;
        }
    },

    async deleteSongFromPlaylist(playlistName, music_id) {
        try {
            const result = await Playlist.destroy({
                where: { playlistName, music_id }
            })
            if (result === 0) {
                throw new Error('Song not found in playlist');
            }
            console.log('Song deleted from playlist:', result);
        } catch (error) {
            console.error('Error deleting song from playlist:', error);
            throw error;
        }
    }
}




module.exports = playlistController;