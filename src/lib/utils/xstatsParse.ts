import { CharacterClass, getCharacterClass } from './characterUtils';

type XStatsPointman = {
	collectedBlocks: number;
	collectedPowerups: number;
};

type XStatsMono = {
	collectedGreys: number;
	collectedColoredPercent: number; //UNSURE IF THIS IS TRUE
};

type XStatsGeneral = {
	overfills: number;
	longestChain: number;
	droppedChains: number;
	bestCluster: number;
	avgClusterSize: number; //divide by 10 when setting
	avgClusterColorCount: number; //divide by 10 when setting
	maxConsecutiveBlocksDodged: number;
	maxConsecutiveBlocksCollected: number;
	skillRating: number;
};

type XStatsBlocks = {
	collectedPurple: number;
	collectedPurplePercent: number;
	collectedPurpleTotal: number;
	collectedBlue: number;
	collectedBluePercent: number;
	collectedBlueTotal: number;
	collectedGreen: number;
	collectedGreenPercent: number;
	collectedGreenTotal: number;
	collectedYellow: number;
	collectedYellowPercent: number;
	collectedYellowTotal: number;
	collectedRed: number;
	collectedRedPercent: number;
	collectedRedTotal: number;
	collectedWhite: number;
	collectedWhitePercent: number;
	collectedWhiteTotal: number;
};

export function parseXStats(characterId: number, xStats: string) {
	const statArray: number[] = xStats.split(',').map(Number);

	let parsedStats: XStatsGeneral;
	parsedStats.overfills = statArray[2];
	parsedStats.longestChain = statArray[3];
	parsedStats.droppedChains = statArray[4];
	parsedStats.bestCluster = statArray[5];
	parsedStats.avgClusterSize = statArray[6];
	parsedStats.avgClusterColorCount = statArray[7];
	parsedStats.maxConsecutiveBlocksDodged = statArray[8];
	parsedStats.maxConsecutiveBlocksCollected = statArray[9];
	parsedStats.skillRating = statArray[10];

	let parsedBlockStats: XStatsBlocks;
	Object.entries(parsedBlockStats).forEach(([key], index) => {
		parsedBlockStats[key] = statArray[11 + index];
	});
	Object.assign(parsedStats, parsedBlockStats);

	const charClass = getCharacterClass(characterId);
	switch (charClass) {
		case CharacterClass.Pointman: {
			let charStats: XStatsPointman;
			charStats.collectedBlocks = statArray[0];
			charStats.collectedPowerups = statArray[1];
			return Object.assign(parsedStats, charStats);
		}
		case CharacterClass.Mono: {
			let charStats: XStatsMono;
			charStats.collectedGreys = statArray[0];
			charStats.collectedColoredPercent = statArray[1];
			return Object.assign(parsedStats, charStats);
		}
		default:
			return parsedStats;
	}
}
