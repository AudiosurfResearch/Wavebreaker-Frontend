import type { Song } from './SongData';

export interface UserInfo {
	id: number;
	username: string;
	steamid64: string;
	steamid32: string;
	locationid: number;
	accountType: number;
	joinedAt: string;
	avatarUrl: string;
	avatarUrlMedium: string;
	avatarUrlSmall: string;
}

export interface UserInfoWithRank extends UserInfo {
	rank: number;
	totalSkillPoints: number;
}

export interface ExtendedUserInfo extends UserInfoWithRank {
	totalScore: number;
	totalPlays: number;
	favoriteCharacter?: number;
	favoriteSong?: Song;
}

export interface UserTokenResponse {
	token: string;
}

export interface GetOwnRivalsResponse {
	rivals: UserInfo[];
	challengers: UserInfo[];
}

export interface IsRivalResponse {
	isRival: boolean;
}

export interface AddOrRemoveRivalResponse {
	success: boolean;
}