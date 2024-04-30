import './assets/pspdfkit.js';

// We need to inform PSPDFKit where to look for its library assets, i.e. the location of the `pspdfkit-lib` directory.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

PSPDFKit.load({
	baseUrl,
	licenseKey: 'KBfkvGnjghp1eLkWNhmj_RGTy-3iDPs0xkc4ZAIwQJcP2fYcnwpV4ZEmtXPqJkAy9RbQOh4Rb89PR3ZBYiqNDyPNFB6Ey_tnSVxl9tCDGkGwFoIfUYdYYRZ6fxuASQajb7oVefIUwnxFdY51cDRAo2eXH2bvmGRyGbq66UWleprFI3IsPxFVkgj50RgUDHbzfwdwKZW5qh7kfM8a',
	container: '#pspdfkit',
	document: './music_source/Sweden_Minecraft/Sweden_Minecraft.pdf',
})
	.then((instance) => {
		console.log('PSPDFKit loaded', instance);
	})
	.catch((error) => {
		console.error(error.message);
	});