<?php 
	session_start(); 

	if (!isset($_SESSION['username'])) {
		$_SESSION['msg'] = "You must log in first";
		header('location: login.php');
	}

	if (isset($_GET['logout'])) {
		session_destroy();
		unset($_SESSION['username']);
		header("location: login.php");
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="UTF-8">
  <title>Green Screen</title>
  <link rel="stylesheet" href="./index_style.css">
  <link rel="stylesheet" href="./navstyle.css">
  
  
  
</head>
<body>
<!-- partial:index.partial.html -->
<script src="https://www.dukelearntoprogram.com/course1/common/js/image/SimpleImage.js">
</script>

	</div>
	<div class="content">

		<!-- logged in user information -->
		<?php  if (isset($_SESSION['username'])) : ?>
		
					<div class="topnav">
			  <div class="logout">
				<a href="index.php?logout='1'">
          <button type="submit">Logout</button>
        </a>
			  </div>
			</div>
			<p style="font-size:2vw">Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
		<?php endif ?>
	</div>

<h1 class="head">Green Screen!</h1>
<h3 class="head">Upload two images for the foreground and background for your greenscreen. When you click the Create Composite button, a new image will appear, with the green in your foreground replaced with your background.</h3>

<canvas id="fgcan">
</canvas>
<canvas id="bgcan">
</canvas>

<p>Foreground: 
  <input type="file" multiple="false" accept="image/*" id="fginput" onchange="loadForeground()">
</p>
<p>Background:
  <input type="file" multiple="false" accept="image/*" id="bginput" onchange="loadBackground()">
</p>
<p>
  <input type="button" value="Create Composite" onclick="doGreenScreen()">
  <input type="button" value="Clear Canvases" onclick="clearCanvases()">
</p>

<canvas id="outputcan">
</canvas>
<!-- partial -->
  <script  src="./script.js"></script>

</body>
</html>



		