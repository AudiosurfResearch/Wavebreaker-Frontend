export type Song = {
    id: number;
    title: string;
    artist: string;
    mbid?: string;
    musicbrainzTitle?: string;
    musicbrainzArtist?: string;
    musicbrainzLength?: number;
    mistagLock: boolean;
    coverUrl?: string;
    smallCoverUrl?: string;
}