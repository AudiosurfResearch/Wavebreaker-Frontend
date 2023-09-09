<script lang="ts">
	import { characterList } from '$lib/characterUtils';
	import type { Score } from '$lib/models/ScoreData';
	import Modal from '../common/Modal.svelte';
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import { DateTime } from 'luxon';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	ChartJS.defaults.font.family = 'Inter, sans-serif';
	ChartJS.defaults.color = '#C8D3F5';
	ChartJS.defaults.borderColor = '#2f334d';
	ChartJS.defaults.backgroundColor = '#009EFF';

	export let targetScore: Score;
	export let showModal: boolean;

	let formatter = Intl.NumberFormat('en');
	const timeSet = DateTime.fromISO(targetScore.rideTime);

	function updateTrackShape() {
		trackShapeNumbers = targetScore.trackShape.split('x').map(function (item) {
			return Math.abs(parseInt(item) - 103);
		});
		trackShapeData = {
			labels: new Array(trackShapeNumbers.length - 1).fill(''),
			datasets: [
				{
					label: 'Height',
					data: trackShapeNumbers,
					borderColor: '#009EFF'
				}
			]
		};
	}

	let trackShapeNumbers;
	let trackShapeData;
	$: targetScore, updateTrackShape();
</script>

<Modal bind:showModal>
	<h2 class="font-bold text-xl mb-3">Score details</h2>
	<Line
		data={trackShapeData}
		options={{
			responsive: true,
			animation: false,
			scales: {
				x: {
					border: {
						display: true
					},
					ticks: {
						stepSize: 5,
						maxTicksLimit: 51
					},
					max: 256
				},
				y: {
					border: {
						display: true
					},
					ticks: {
						display: false,
						maxTicksLimit: 9,
						stepSize: 13
					},
					max: 103
				}
			},
			elements: {
				point: {
					radius: 0
				}
			},
			plugins: {
				legend: { display: false }
			}
		}}
	/>
	<p>
		<b>Time submitted:</b>
		{timeSet.toLocaleString(DateTime.DATETIME_SHORT)} <br />
		<b>Skill Points:</b>
		{targetScore.skillPoints} <br />
		<b>Character:</b>
		{characterList[targetScore.vehicleId]} <br />
		<b>Feats:</b>
		{targetScore.feats} <br />
		<b>Density:</b>
		{targetScore.density} <br />
		<b>Gold threshold:</b>
		{formatter.format(targetScore.goldThreshold)} <br />
		<b>Total times played:</b>
		{targetScore.playCount} <br />
	</p>
</Modal>
