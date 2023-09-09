import type { Song } from './SongData';
import type { UserInfo } from './UserData';

export interface Score {
	id: number;
	userId: number;
	leagueId: number;
	trackShape: string;
	xstats: string;
	density: number;
	vehicleId: number;
	score: number;
	rideTime: string;
	feats: string;
	songLength: number;
	goldThreshold: number;
	skillPoints: number;
	iss: number;
	isj: number;
	playCount: number;
	songId: number;
}

export interface ExtendedScoreInfo extends Score {
	song?: Song;
	player?: UserInfo;
}

export interface GetScoresResponse {
	scores: ExtendedScoreInfo[];
	totalCount: number;
}
