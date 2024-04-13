class LandmarkMap {

	constructor(parentElement, officialLandmarks, bonusLandmarks, yourLandmarks, coord) {
		this.parentElement = parentElement;
		this.officialLandmarks = officialLandmarks;
		this.bonusLandmarks = bonusLandmarks;
		this.yourLandmarks = yourLandmarks;
		this.coord = coord;
		this.markers = [];

		console.log("bonus: ", this.bonusLandmarks);

		this.initVis();
	}



	initVis() {
		let vis = this;

		// define map
		vis.map = L.map(vis.parentElement, {
			center: vis.coord,
			zoom: 13,
			zoomControl: false
		});

		let southWest = L.latLng(41.579061, -71.940924),
			northEast = L.latLng(43.533192, -70.177619),
			bounds = L.latLngBounds(southWest, northEast);

		vis.map.setMaxBounds(bounds);

		L.tileLayer('https://api.mapbox.com/styles/v1/chryslee/cluvukbjc005i01p64vdcawqd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2hyeXNsZWUiLCJhIjoiY2x1MnRjOWl0MHNvNjJxbnZ3bmF3MWMzbyJ9.SlEk5odFwq2SeUxLZps3SQ', {
			minZoom: 12,
			attribution: '© <a href=\'https://www.mapbox.com/about/maps/\'>Mapbox</a> © <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a>'
		}).addTo(vis.map);

		// define icons
		vis.approvedIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-blue.png' />" });
		vis.pendingIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-yellow.png' />" });
		vis.deniedIcon = L.divIcon({ className: 'emoji-icon-1', html: "<img src='img/icon-red.png' />" });

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
				<div class="title">
					<h5 class="card-title"><b>MARKING MEMORY:</b></h5>
					<h6 class="card-subtitle"><b>BOSTON’S LANDMARKS IN THE MAKING</b></h6>
				</div>
				<div class="accordion" id="accordionExample">
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<b>How to Apply</b>
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
								<b>Who Decides</b>
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
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
								<b>What Criteria</b>
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
				<div class="title">
					<h5 class="card-title"><b>MARKING MEMORY:</b></h5>
					<h6 class="card-subtitle"><b>BOSTON’S LANDMARKS IN THE MAKING</b></h6>
				</div>
				<div class="accordion" id="accordionExample">
				  	<div class="accordion-item">
						<h2 class="accordion-header">
							<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<b>How to Apply</b>
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
								<b>Who Decides</b>
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
								<b>What Criteria</b>
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
						let isBonusLandmark = vis.bonusLandmarks.some(bonus => bonus.PID === landmark["pid_long"] || bonus.PID === landmark["PID"]);

						let finalIcon = L.divIcon({
							className: icon.options.className + (isBonusLandmark ? ' bounce' : ''),
							html: icon.options.html,
							iconSize: icon.options.iconSize
						});

						let marker = L.marker(coordinate, {icon: finalIcon})
							.addTo(vis.map)
							.on("mouseover", function (event) {
								vis.tooltip.style("opacity", 1)
									.html(() => {
										let tooltipContent, encodedAddress, fullLocation, encodedLocation, streetViewImageUrl;

										switch (status) {
											case "approved":
												encodedAddress = encodeURIComponent(landmark.full_address);
												streetViewImageUrl = `https://maps.googleapis.com/maps/api/streetview?source=outdoor&size=300x200&fov=120&location=${encodedAddress}&key=AIzaSyAZds2BIz-J0WNouMON5c25WPfO498vjk0`;

												tooltipContent = isBonusLandmark ?
													`<i>Click to Catch Me and Know More!</i>`:
													`<img src="${streetViewImageUrl}" alt="Street View Image"><br/>
                                                    <b>${landmark.assessor_description.toUpperCase()}</b><br/>
													${landmark.full_address}<br/>
                                                    ${status.charAt(0).toUpperCase()}${status.slice(1)}, Built in ${Math.floor(landmark.yr_built)}</div>`;
												break;
											case "pending":
											case "denied":
												fullLocation = `${landmark["NAME OF PROPERTY"]}, ${landmark.full_address}`;
												encodedLocation = encodeURIComponent(fullLocation);
												streetViewImageUrl = `https://maps.googleapis.com/maps/api/streetview?source=outdoor&size=300x200&fov=120&location=${encodedLocation}&key=AIzaSyAZds2BIz-J0WNouMON5c25WPfO498vjk0`;

												tooltipContent = isBonusLandmark ?
													`<i>Click to Catch Me and Know More!</i>`:
													`<img src="${streetViewImageUrl}" alt="Street View Image"></br>
                                                    <b>${landmark["NAME OF PROPERTY"].toUpperCase()}</b><br/>
                                                    ${landmark.full_address}<br/>
                                                    ${status.charAt(0).toUpperCase()}${status.slice(1)}, ${landmark.DETAILS}</div>`;
												break;
											default:
												tooltipContent = ``
										}
										return tooltipContent;
									})
									.style("left", (event.originalEvent.pageX + 10) + "px")
									.style("top", (event.originalEvent.pageY + 10) + "px")
									.style("visibility", "visible");
							})
							.on("mouseout", function () {
								vis.tooltip.style("opacity", 0)
									.style("visibility", "hidden");
							})
							.on('click', function () {
								if (isBonusLandmark) {
									let bonusLandmark = vis.bonusLandmarks.find(bonus => bonus.PID === landmark["pid_long"] || bonus.PID === landmark["PID"]);

									let modalTitle =
										`<b>${bonusLandmark["NAME OF PROPERTY"]}</b> <span class="badge text-bg-secondary">${status.charAt(0).toUpperCase()}${status.slice(1)}</span></br>
										${bonusLandmark.full_address}`;

									let modalBodyContent =
										`<img src="${bonusLandmark.image}" alt="Photos"></br>
										${bonusLandmark.story}</div>`;

									document.getElementById("modalTitle").innerHTML = modalTitle;
									document.getElementById("modalBody").innerHTML = modalBodyContent;

									let modalElement = document.getElementById("staticBackdrop");
									let modalInstance = new bootstrap.Modal(modalElement);
									modalInstance.show();
								}
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
					    let streetViewImageUrl = `https://maps.googleapis.com/maps/api/streetview?source=outdoor&size=300x200&fov=120&location=${coordinate.join(',')}&key=AIzaSyAZds2BIz-J0WNouMON5c25WPfO498vjk0`;

						let dynamicIcon = L.divIcon({ className: 'emoji-icon-2', html: landmark.emoji, iconSize: [20, 20] });
						let marker = L.marker(coordinate, {icon: dynamicIcon}).addTo(vis.map)

						marker.on("mouseover", function (event) {
							vis.tooltip.style("opacity", 1)
								.html(() => {
									let tooltipContent;
									if (landmark.name || landmark.story) {
								    		tooltipContent = `<img src="${streetViewImageUrl}" alt="Street View Image"></br>
                        									 <b>${landmark.name.toUpperCase()}</b><br/>
                        									 ${landmark.story}<br/>`;
									} else {
								    		tooltipContent = "<i>The New Proposal is Under Reviewed!</i>";
									}
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
		    radius: 30,
		    // gradient: {0.2: '#101c56', 0.4: '#2e4d9d', 0.6: '#4d99bd', 0.8: '#8ec8bc', 1: '#e2f1b8'}
		}).addTo(vis.map);

		if (vis.heatLayer) {
			let canvas = vis.heatLayer._canvas;
				if (canvas) {
					canvas.style.opacity = 0.7;
				}
		}

		document.getElementById('refresh').addEventListener('click', () => {
			window.location.reload();
		});

	}

}
