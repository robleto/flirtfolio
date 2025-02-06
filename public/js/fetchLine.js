async function fetchPickupLine() {
	const lineContainer = document.getElementById("pickup-line");

	// Show loading text while fetching
	lineContainer.textContent = "Thinking of something smooth...";

	try {
		const response = await fetch("/api/pickup-line", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		const data = await response.json();
		const pickupLine = data.pickupLine || "Oops, the flirty Chad Cattle ran out of pick-up lines!";

		lineContainer.textContent = pickupLine;
	} catch (error) {
		console.error("Error fetching pickup line:", error);
		lineContainer.textContent =
			"Oh no, the flirty Chad Cattle ran out of pick-up lines!";
	}
}

// Attach event listener
document.addEventListener("DOMContentLoaded", () => {
	fetchPickupLine(); // Load a line on page load
	document
		.getElementById("new-line-btn")
		.addEventListener("click", fetchPickupLine);
});
