export const characterList: string[] = [
	'Pointman Pro',
	'Double Vision Pro',
	'Vegas',
	'Pusher',
	'Eraser',
	'Invalid',
	'Invalid',
	'Invalid',
	'Invalid',
	'Double Vision',
	'Pointman Elite',
	'Mono Pro',
	'Eraser Elite',
	'Ninja Mono',
	'Double Vision Elite',
	'Pointman',
	'Pusher Elite',
	'Mono'
];

export enum CharacterClass {
	Mono,
	Pointman,
	DoubleVision,
	Vegas,
	Eraser,
	Pusher
}

export function getCharacterClass(characterId: number): CharacterClass {
	if ([11, 13, 17].includes(characterId)) return CharacterClass.Mono;
	if ([0, 10, 15].includes(characterId)) return CharacterClass.Pointman;
	if ([1, 9, 14].includes(characterId)) return CharacterClass.DoubleVision;
	if (characterId == 2) return CharacterClass.Vegas;
	if ([4, 12].includes(characterId)) return CharacterClass.Eraser;
	if ([3, 16].includes(characterId)) return CharacterClass.Pusher;
}
