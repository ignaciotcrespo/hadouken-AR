var gui = new dat.GUI({ width: 250});

addHadoukenGui(gui);
addFluidsGUI(gui);

function addHadoukenGui(gui){
	var hadoukenFolder = gui;
	gui.addFolder("Hadouken AR: Settings");
	hadoukenFolder.add(hadouken, 'darkLayerOpacity', 0, 1.0).name('Video Darkness').onFinishChange(updateDarkLayer);
	hadoukenFolder.add(hadouken, 'drawHandBox', true, false).name('Hand boxes');
	hadoukenFolder.add(hadouken, 'drawFluids', true, false).name('Hands fluids');
	if(hadouken.handsDetectionEngine == 1){
	    hadoukenFolder.add(hadouken, 'drawFps', true, false).name('Draw FPS');
	}
//	hadoukenFolder.add(hadouken, 'rightMarginForControls', 0.1, 0.9).name('Margin').onFinishChange(resizeLayers);

	var github = hadoukenFolder.add({ fun : function () {
	    window.open('https://github.com/ignaciotcrespo/hadouken-AR');
	    ga('send', 'event', 'link button', 'github');
	} }, 'fun').name('Github');
	github.__li.className = 'cr function bigFont';
	github.__li.style.borderLeft = '3px solid #8C8C8C';
	var githubIcon = document.createElement('span');
	github.domElement.parentElement.appendChild(githubIcon);
	githubIcon.className = 'icon github';

	var twitter = hadoukenFolder.add({ fun : function () {
	    ga('send', 'event', 'link button', 'twitter');
	    window.open('https://twitter.com/itcrespo');
	} }, 'fun').name('Twitter');
	twitter.__li.className = 'cr function bigFont';
	twitter.__li.style.borderLeft = '3px solid #8C8C8C';
	var twitterIcon = document.createElement('span');
	twitter.domElement.parentElement.appendChild(twitterIcon);
	twitterIcon.className = 'icon twitter';
}

function addFluidsGUI (gui) {
    var fluidsFolder = gui.addFolder("WebGL fluids: Settings");
    fluidsFolder.add(config, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(initFramebuffers);
    fluidsFolder.add(config, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(initFramebuffers);
    fluidsFolder.add(config, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
    fluidsFolder.add(config, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
    fluidsFolder.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
    fluidsFolder.add(config, 'CURL', 0, 50).name('vorticity').step(1);
    fluidsFolder.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
    fluidsFolder.add(config, 'SHADING').name('shading').onFinishChange(updateKeywords);
    fluidsFolder.add(config, 'COLORFUL').name('colorful');
    fluidsFolder.add(config, 'PAUSED').name('paused').listen();

    fluidsFolder.add({ fun: function () {
        splatStack.push(parseInt(Math.random() * 20) + 5);
    } }, 'fun').name('Random splats');

    var bloomFolder = fluidsFolder.addFolder('Bloom');
    bloomFolder.add(config, 'BLOOM').name('enabled').onFinishChange(updateKeywords);
    bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
    bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

    var sunraysFolder = fluidsFolder.addFolder('Sunrays');
    sunraysFolder.add(config, 'SUNRAYS').name('enabled').onFinishChange(updateKeywords);
    sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

    var captureFolder = fluidsFolder.addFolder('Capture');
    captureFolder.addColor(config, 'BACK_COLOR').name('background color');
    captureFolder.add(config, 'TRANSPARENT').name('transparent');
    captureFolder.add({ fun: captureScreenshot }, 'fun').name('take screenshot');

    var github = fluidsFolder.add({ fun : function () {
        window.open('https://github.com/PavelDoGreat/WebGL-Fluid-Simulation');
        ga('send', 'event', 'link button', 'github');
    } }, 'fun').name('Github');
    github.__li.className = 'cr function bigFont';
    github.__li.style.borderLeft = '3px solid #8C8C8C';
    var githubIcon = document.createElement('span');
    github.domElement.parentElement.appendChild(githubIcon);
    githubIcon.className = 'icon github';

    var twitter = fluidsFolder.add({ fun : function () {
        ga('send', 'event', 'link button', 'twitter');
        window.open('https://twitter.com/PavelDoGreat');
    } }, 'fun').name('Twitter');
    twitter.__li.className = 'cr function bigFont';
    twitter.__li.style.borderLeft = '3px solid #8C8C8C';
    var twitterIcon = document.createElement('span');
    twitter.domElement.parentElement.appendChild(twitterIcon);
    twitterIcon.className = 'icon twitter';

    var discord = fluidsFolder.add({ fun : function () {
        ga('send', 'event', 'link button', 'discord');
        window.open('https://discordapp.com/invite/CeqZDDE');
    } }, 'fun').name('Discord');
    discord.__li.className = 'cr function bigFont';
    discord.__li.style.borderLeft = '3px solid #8C8C8C';
    var discordIcon = document.createElement('span');
    discord.domElement.parentElement.appendChild(discordIcon);
    discordIcon.className = 'icon discord';

    var app = fluidsFolder.add({ fun : function () {
        ga('send', 'event', 'link button', 'app');
        window.open('http://onelink.to/5b58bn');
    } }, 'fun').name('Check out mobile app');
    app.__li.className = 'cr function appBigFont';
    app.__li.style.borderLeft = '3px solid #00FF7F';
    var appIcon = document.createElement('span');
    app.domElement.parentElement.appendChild(appIcon);
    appIcon.className = 'icon app';

    if (isMobile())
        { gui.close(); }
}
