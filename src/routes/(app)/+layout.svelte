<script>
	let src = 'logo_notext.png';
</script>

<div class="sidenav center" style="text-align: center;">
	<div style="width: 100%; height: 113px;">
		<img style="height:100%" {src} alt="Logo" />
	</div>
	<div />
</div>
<div style="margin-left: 140px;">
	<slot />
</div>

<style>
	:root {
		background-color: rgb(196, 220, 243);
	}
	.sidenav {
		height: 100%;
		position: fixed;
		padding: 20px;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: #130f42;
	}
	.center {
		text-align: center;
	}
	div {
		border: 3px solid black;
	}
	div.figure {
		border: 3px solid blue;
		display: inline-block;
	}
</style>
