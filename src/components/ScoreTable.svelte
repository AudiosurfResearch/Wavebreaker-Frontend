<script lang="ts">
	import type { ExtendedScoreInfo } from '$lib/models/ScoreData';
	import { format } from 'timeago.js';
	import { characterList } from '$lib/characterUtils';
	import { Duration } from 'luxon';

	export let targetScores: ExtendedScoreInfo[];
</script>

<div class="overflow-x-auto rounded-3xl bg-neutral shadow">
	<table class="table w-full bg-neutral">
		<thead>
			<tr>
				<th />
				{#if targetScores[0].player}
					<th>Player</th>
				{/if}
				<th>Song</th>
				<th>Score</th>
				<th>Time</th>
				<th>Character</th>
				<th>Duration</th>
			</tr>
		</thead>
		<tbody>
			<!--I'm going to hell for this-->
			{#each targetScores as score, i}
				<tr class="bg-neutral">
					<th class="bg-neutral">{i + 1} </th>
					{#if score.player}
						<td class="bg-neutral">
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="w-12 h-12 rounded-xl">
										<img
											src={score.player.avatarUrlMedium}
											alt="Avatar of {score.player.username}"
										/>
									</div>
								</div>
								<div>
									<a href="/users/{score.player.id}" class="link link-hover font-bold"
										>{score.player.username}</a
									>
								</div>
							</div>
						</td>
					{/if}
					<td class="bg-neutral">{score.song.artist} - {score.song.title}</td>
					<td class="bg-neutral">{score.score}</td>
					<td class="bg-neutral">{format(score.rideTime)}</td>
					<td class="bg-neutral">{characterList[score.vehicleId]}</td>
					<td class="bg-neutral">{Duration.fromMillis(score.songLength * 10).toFormat('m:ss')}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
