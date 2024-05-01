import './assets/pspdfkit.js';

const songAssets = {
	"canonind": {
		title: "Canon in D",
		artist: "Johann Pachelbel",
		audioSrc: "./music_source/cannon/Cannon_in_D.mp3",
		pdfsrc: "./music_source/cannon/Cannon_in_D.pdf",
	},
	"carolofthebells": {
		title: "Carol of the Bells",
		artist: "William J. Rose",
		audioSrc: "./music_source/Carol_of_the_Bells/Carol_of_the_Bells.mp3",
		pdfsrc: "./music_source/Carol_of_the_Bells/Carol_of_the_Bells.pdf",
	},
	"funeralmarch": {
		title: "Sonate Op. 35 - Funeral March",
		artist: "Frederic Chopin",
		audioSrc: "./music_source/Chopin-Funeral_March/Chopin_-_Funeral_March.mp3",
		pdfsrc: "./music_source/Chopin-Funeral_March/Chopin_-_Funeral_March.pdf",
	},
	"sweden": {
		title: "Sweden",
		artist: "C418",
		audioSrc: "./music_source/Sweden_Minecraft/Sweden_Minecraft.mp3",
		pdfsrc: "./music_source/Sweden_Minecraft/Sweden_Minecraft.pdf",
	},
	"clocks": {
		title: "Clocks",
		artist: "Coldplay",
		audioSrc: "./music_source/Clocks–Coldplay/Clocks__Coldplay.mp3",
		pdfsrc: "./music_source/Clocks–Coldplay/Clocks__Coldplay.pdf",
	},
	"wethands": {
		title: "Wet Hands",
		artist: "C418",
		audioSrc: "./music_source/wet_hands_minecraft/Wet_Hands_Minecraft.mp3",
		pdfsrc: "./music_source/wet_hands_minecraft/Wet_Hands_Minecraft.pdf",
	},
};

window.galleryinit = () => {

	const urlparams = new URLSearchParams(window.location.search);
	const songId = urlparams.get('songId');

	const songData = songAssets[songId];

	const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

	PSPDFKit.load({
		baseUrl,
		licenseKey: 'KBfkvGnjghp1eLkWNhmj_RGTy-3iDPs0xkc4ZAIwQJcP2fYcnwpV4ZEmtXPqJkAy9RbQOh4Rb89PR3ZBYiqNDyPNFB6Ey_tnSVxl9tCDGkGwFoIfUYdYYRZ6fxuASQajb7oVefIUwnxFdY51cDRAo2eXH2bvmGRyGbq66UWleprFI3IsPxFVkgj50RgUDHbzfwdwKZW5qh7kfM8a',
		container: '#pspdfkit',
		document: songData.pdfsrc,
	})
		.then((instance) => {
			console.log('PSPDFKit loaded', instance);
		})
		.catch((error) => {
			console.error(error.message);
		});
}


const songItems = document.querySelectorAll('.song-item');

// Add click event listener to each song item
songItems.forEach(songItem => {
	songItem.addEventListener('click', () => {
		// Get the song ID from the data attribute
		const songId = songItem.dataset.songId;

		// Redirect to the viewing page with the song ID as a query parameter
		window.location.href = `/gallery.html?songId=${songId}`;
	});
});