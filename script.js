window.onload = function() {
    const savedPoints = localStorage.getItem('drawingPoints');
    if (savedPoints) {
        document.getElementById("points").innerText = savedPoints;
    }
};

//hi