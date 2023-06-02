export type Song = {
    id: number;
    title: string;
    artist: string;
    mbid?: string;
    musicbrainzTitle?: string;
    musicbrainzArtist?: string;
    musicbrainzLength?: number;
    coverUrl?: string;
    smallCoverUrl?: string;
}