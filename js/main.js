let landmarkMap;

Promise.all([
    d3.csv("data/blc_data_cleaned.csv").then(data => {
        let deniedLandmarks = data.filter(row => row.CATEGORY === "E = Unsuccessful Petition" || row.CATEGORY === "E = Unsuccessful Petition & Demolished");
        let pendingLandmarks = data.filter(row => row.CATEGORY === "C = Pending Landmark/District");
        return { deniedLandmarks, pendingLandmarks };
    }),
    d3.csv("data/building_data_cleaned.csv").then(data => {
        return { approvedLandmarks: data };
    }),
    fetch('https://lobs.boston/bostonlandmark/fetch_yourlandmark.php')
        .then(response => response.json())
        .then(data => {
            return { yourLandmarks: data };
        })
        .catch(error => {
            console.error('Error:', error);
            return { yourLandmarks: [] };
        })
]).then(results => {
    let officialLandmarks = {
        deniedLandmarks: results[0].deniedLandmarks,
        pendingLandmarks: results[0].pendingLandmarks,
        approvedLandmarks: results[1].approvedLandmarks
    };
    renderMap(officialLandmarks, results[2].yourLandmarks);
});

function renderMap(officialLandmarks, yourLandmarks) {
    landmarkMap = new LandmarkMap("landmark-map", officialLandmarks, yourLandmarks, [42.360082, -71.058880]);
}
