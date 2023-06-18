export type Song = {
	id: number;
	title: string;
	artist: string;
	tags: string[];
	mbid?: string;
	musicbrainzTitle?: string;
	musicbrainzArtist?: string;
	musicbrainzLength?: number;
	mistagLock: boolean;
	coverUrl?: string;
	smallCoverUrl?: string;
};

export type SongWithExternalUrl = Song & {
	externalUrl: string;
};

export interface GetRadioSongsResponse {
	songs: SongWithExternalUrl[];
}
