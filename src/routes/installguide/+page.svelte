<script type="ts">
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<title>Wavebreaker | Install guide</title>
	<meta name="description" content="Guide to help you get set up and connected to Wavebreaker." />

	<meta content="Wavebreaker" property="og:site_name" />
	<meta content="Install guide" property="og:title" />
	<meta
		content="Guide to help you get set up and connected to Wavebreaker."
		property="og:description"
	/>

	<meta content={env.PUBLIC_FRONTEND_URL} property="og:url" />
	<meta content="#009EFF" name="theme-color" />
</svelte:head>

<div class="prose max-w-full">
	<h1>Install guide</h1>
	<p>
		Looking to get set up with Wavebreaker and start submitting your scores? Well, you're in the
		right place!
	</p>
	<h2>Method 1: Installer (Recommended)</h2>
	<p>
		This is probably the simplest method, you just have to click a few buttons and let the installer
		do all the work for you.
	</p>
	<h3>Prerequisites</h3>
	<ul>
		<li>
			A machine with <b>Windows 10 or newer</b> (Linux support coming, but for now, use method 2)
		</li>
		<li>
			<b>WebView2.</b> This should be included with Windows 11, and you might already have it even
			on Windows 10. <b>If the installer doesn't launch, you might be missing this, so</b>
			<a href="https://go.microsoft.com/fwlink/p/?LinkId=2124703">
				download it from Microsoft and install it.
			</a>
		</li>
	</ul>
	<h3>How to</h3>
	<ol>
		<li>
			<a
				href="https://github.com/AudiosurfResearch/Wavebreaker-Installer/releases/latest/download/wavebreaker-installer.exe"
				>Download the installer</a
			> and run it.
		</li>
		<li>
			If you get a warning from SmartScreen, click <b>"More info"</b> and then <b>"Run anyway"</b>.
			<b>The installer isn't a virus!</b> Signatures are expensive and it's not been downloaded
			often enough to be trusted automatically.
		</li>
		<li>The rest should be self-explanatory, let the installer guide you.</li>
		<li>Have fun!</li>
	</ol>

	<h2>Method 2: Manual</h2>
	<p>So, you want to get set up manually, for whatever reason? Sure thing!</p>
	<h3>Prerequisites</h3>
	<ul>
		<li>The ability to find Audiosurf's install location</li>
		<li>The ability to extract a .zip file</li>
	</ul>
	<h3>How to</h3>
	<ol>
		<li>
			<a
				href="https://github.com/AudiosurfResearch/Wavebreaker-Hook/releases/latest/download/Wavebreaker-Package.zip"
				>Download the client package.</a
			>
		</li>
		<li>Navigate to your Audiosurf install location.</li>
		<li>
			<b>(Only applicable if upgrading from v1)</b> Delete files from the older version of the hook,
			if present. These are:
			<ul>
				<li>engine\channels\Wavebreaker-Hook.dll</li>
				<li>engine\Wavebreaker-Hook.ini</li>
			</ul>
		</li>
		<li>
			Copy the contents of the previously downloaded .zip file into the game's "engine" folder. <b
				>If it asks you to replace RadioBrowser.cgr, confirm it. This is needed for Audiosurf Radio.</b
			>
		</li>
		<li>Launch the game and enjoy!</li>
	</ol>
</div>
