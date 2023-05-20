export interface UserInfo {
	id: number;
	username: string;
	steamid64: string;
	steamid32: string;
	locationid: number;
	accountType: number;
	joinedAt: Date;
	avatarUrl: string;
}

export interface ExtendedUserInfo extends UserInfo {
	totalScore: number;
}

export interface UserTokenResponse {
	token: string;
}