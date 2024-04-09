class LandmarkMap {

	constructor(parentElement, officialLandmarks, yourLandmarks, coord) {
		this.parentElement = parentElement;
		this.officialLandmarks = officialLandmarks;
		this.yourLandmarks = yourLandmarks;
		this.coord = coord;
		this.markers = [];

		this.initVis();
	}



	initVis() {
		let vis = this;

		// define map
		vis.map = L.map(vis.parentElement, {
			center: vis.coord,
			zoom: 12,
			zoomControl: false
		});

		let southWest = L.latLng(41.579061, -71.940924),
			northEast = L.latLng(43.533192, -70.177619),
			bounds = L.latLngBounds(southWest, northEast);

		vis.map.setMaxBounds(bounds);



		L.tileLayer('https://api.mapbox.com/styles/v1/chryslee/clur3p48l009d01p41tbdgzs6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2hyeXNsZWUiLCJhIjoiY2x1MnRjOWl0MHNvNjJxbnZ3bmF3MWMzbyJ9.SlEk5odFwq2SeUxLZps3SQ', {
			minZoom: 12,
			attribution: '© <a href=\'https://www.mapbox.com/about/maps/\'>Mapbox</a> © <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a>'
		}).addTo(vis.map);

		// define icons
		vis.approvedIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-approved.png' />" });
		vis.pendingIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-pending.png' />" });
		vis.deniedIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-denied.png' />" });

		// define tooltip
		vis.tooltip = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

		vis.wrangleData();
	}



	wrangleData() {
		let vis = this;

		vis.updateVis("official-landmarks");
	}



	updateVis(selectedCategory = "official-landmarks") {
		let vis = this;

		// display writeup
		if (selectedCategory === "official-landmarks") {
			document.getElementById("sidebar").innerHTML = `
				<div class="accordion" id="accordionExample">
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<b>STEP 1</b>
							</button>
						</h2>
						<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
				  	</div>
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								<b>STEP 2</b>
							</button>
						</h2>
						<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
				    </div>
				    <div class="accordion-item">
				        <h2 class="accordion-header">
						  	<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								<b>STEP 3</b>
						  	</button>
					    </h2>
					    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
					  	  	<div class="accordion-body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					  	  	</div>
					    </div>
				    </div>
				</div>
            `;
		} else if (selectedCategory === "your-landmarks") {
			document.getElementById("sidebar").innerHTML = `
				<div class="accordion" id="accordionExample">
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<b>STEP 1</b>
							</button>
						</h2>
						<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								<img src="img/qr-code.jpg" alt="QR Code">
							</div>
						</div>
				  	</div>
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								<b>STEP 2</b>
							</button>
						</h2>
						<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
				    </div>
				    <div class="accordion-item">
				        <h2 class="accordion-header">
						  	<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								<b>STEP 3</b>
						  	</button>
					    </h2>
					    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
					  	  	<div class="accordion-body">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					  	  	</div>
					    </div>
				    </div>
				</div>
            `;
		}

		// display data points
		vis.markers.forEach(marker => vis.map.removeLayer(marker));
		vis.markers = [];

		if (selectedCategory === "official-landmarks") {
			const createMarkers = (landmarks, icon, status) => {
				landmarks.forEach(landmark => {
					if (landmark.coordinate) {
						let coordinate = landmark.coordinate.split(",").map(d => parseFloat(d.trim()));
						let marker = L.marker(coordinate, {icon: icon})
							.addTo(vis.map)
							.on("mouseover", function (event) {
								vis.tooltip.style("opacity", 0.9)
									.html(() => {
										let tooltipContent = ""
										switch (status) {
											case "approved":
												tooltipContent = `<b>${landmark.assessor_description}</b><br/>Approved<br/>
																	${landmark.full_address}<br/>
																	Year Built: ${Math.floor(landmark.yr_built)}`;
												break;
											case "pending":
												tooltipContent = `<b>${landmark["NAME OF PROPERTY"]}</b><br/>Pending, ${landmark.DETAILS}<br/>
																	${landmark.full_address}`;
												break;
											case "denied":
												tooltipContent = `<b>${landmark["NAME OF PROPERTY"]}</b><br/>${landmark.DETAILS}<br/>
																	${landmark.full_address}`;
												break;
											default:
												tooltipContent = ``
										}
										// Object.keys(landmark).forEach(key => {
										// 	tooltipContent += `${key}: ${landmark[key]}<br/>`;
										// });
										return tooltipContent;
									})
									.style("left", (event.originalEvent.pageX + 10) + "px")
									.style("top", (event.originalEvent.pageY + 10) + "px")
									.style("visibility", "visible");
							})
							.on("mouseout", function () {
								vis.tooltip.style("opacity", 0)
									.style("visibility", "hidden");
							});

						vis.markers.push(marker);
					}
				});
			};

			createMarkers(vis.officialLandmarks.approvedLandmarks, vis.approvedIcon, "approved");
			createMarkers(vis.officialLandmarks.pendingLandmarks, vis.pendingIcon, "pending");
			createMarkers(vis.officialLandmarks.deniedLandmarks, vis.deniedIcon, "denied");
		} else if (selectedCategory === "your-landmarks") {
			const createMarkers = (landmarks) => {
				landmarks.forEach(landmark => {
					if (landmark.lat && landmark.lon) {
						let coordinate = [parseFloat(landmark.lat), parseFloat(landmark.lon)];
						let dynamicIcon = L.divIcon({ className: 'emoji-icon-2', html: landmark.emoji, iconSize: [20, 20] });
						let marker = L.marker(coordinate, {icon: dynamicIcon}).addTo(vis.map)
						if (landmark.name && landmark.story) {
							marker.on("mouseover", function (event) {
								vis.tooltip.style("opacity", 0.9)
									.html(() => {
										let tooltipContent = `<b>${landmark.name}</b><br/>${landmark.story}`;
										return tooltipContent;
									})
									.style("left", (event.originalEvent.pageX + 10) + "px")
									.style("top", (event.originalEvent.pageY + 10) + "px")
									.style("visibility", "visible");
							})
								.on("mouseout", function () {
									vis.tooltip.style("opacity", 0)
										.style("visibility", "hidden");
								});
						}

						vis.markers.push(marker);
					}
				});
			};
			createMarkers(vis.yourLandmarks);
		}

		// display heatmap
		if (vis.heatLayer) {
			vis.map.removeLayer(vis.heatLayer);
			vis.heatLayer = null;
		}

		const getCoord = (landmarks) => {
			return landmarks.map(landmark => [landmark.lat, landmark.lon]);
		};

		let landmarkCoord = [];

		if (selectedCategory === "official-landmarks") {
			landmarkCoord = getCoord(vis.officialLandmarks.approvedLandmarks)
				.concat(getCoord(vis.officialLandmarks.pendingLandmarks))
				.concat(getCoord(vis.officialLandmarks.deniedLandmarks));
		} else if (selectedCategory === "your-landmarks") {
			landmarkCoord = getCoord(vis.yourLandmarks);
		}

		vis.heatLayer = L.heatLayer(landmarkCoord, {
			radius: 50,
			// gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
		}).addTo(vis.map);

		if (vis.heatLayer) {
			let canvas = vis.heatLayer._canvas;
			if (canvas) {
				canvas.style.opacity = 0.8;
			}
		}

		document.getElementById('refresh').addEventListener('click', () => {
			window.location.reload();
		});

	}

}
