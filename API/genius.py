from dotenv import load_dotenv
import lyricsgenius
import os


def get_songs(singer, songs, write_to_file=False):
    load_dotenv()
    CLIENT_ACCESS_TOKEN = os.getenv('CLIENT_ACCESS_TOKEN')

    genius = lyricsgenius.Genius(CLIENT_ACCESS_TOKEN)
    genius.skip_non_songs = True
    genius.remove_section_headers = True
    genius.excluded_terms = ["(Remix)", "(Live)", "(Speech)"]
    artist = genius.search_artist(singer, max_songs=int(songs))

    if write_to_file:
        with open(singer+'.txt', 'x') as text:
            for song in artist.songs:
                text.write(song.lyrics)
                text.write(
                    '\n-----------------------------------------------------------\n')
    else:
        song_lyrics = [song.lyrics for song in artist.songs]
        return " ".join(song_lyrics)
