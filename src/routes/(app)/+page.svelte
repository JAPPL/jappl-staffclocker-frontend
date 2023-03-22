<script lang="ts">
</script>

<div class="grid-container">
	<div class="item1" id="rcorners1" style="margin: 30px;">
		<h>This will display Clocking time</h>
	</div>
	<div class="item2" id="rcorners1" style="margin: 30px 30px 30px 0px">
		<h>This will display profile</h>
	</div>
	<div class="item3" id="rcorners1" style="margin-left: 30px; margin-right: 30px;">
		<h>This will display profile</h>
	</div>
</div>

<style>
	#rcorners1 {
		border-radius: 20px;
		background: white;
		padding: 20px;
		height: 50vh;
	}
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto;
		height: 100%;
	}

	.grid-container > div {
		text-align: center;
	}

	.item1 {
		grid-row-start: 1;
		grid-row-end: 4;
		grid-column-start: 1;
		grid-column-end: 5;
	}
	.item2 {
		grid-row-start: 1;
		grid-row-end: 4;
		grid-column-start: 5;
		grid-column-end: 6;
	}
	.item3 {
		grid-column-start: 1;
		grid-column-end: 6;
	}
	div {
		/* border: 3px solid black; */
	}
	/*
#rcorners2 {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 200px;
  height: 150px;
}

#rcorners3 {
  border-radius: 25px;
  background: url(paper.gif);
  background-position: left top;
  background-repeat: repeat;
  padding: 20px;
  width: 200px;
  height: 150px;
} */
</style>
