from dotenv import load_dotenv
import lyricsgenius
import os

def get_songs(singer, write_to_file = False):
    load_dotenv()
    CLIENT_ACCESS_TOKEN = os.getenv('CLIENT_ACCESS_TOKEN')

    genius = lyricsgenius.Genius(CLIENT_ACCESS_TOKEN)
    genius.skip_non_songs = True
    genius.remove_section_headers = True
    genius.excluded_terms = ["(Remix)", "(Live)", "(Speech)"]
    artist = genius.search_artist(singer, max_songs=500)
    
    if write_to_file:
        with open('Taylor_Swift_2.txt', 'x') as text:
            for song in artist.songs:
                text.write(song.lyrics)
                text.write(
                    '\n-----------------------------------------------------------\n')
    else:
        return artist.songs
