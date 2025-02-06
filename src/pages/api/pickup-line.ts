import { OPENAI_API_KEY } from "../../utils/getEnv";

export const prerender = false; // Ensure server-side execution

export async function POST({ request }: { request: Request }) {
	const apiUrl = "https://api.openai.com/v1/chat/completions";

	const payload = {
		model: "gpt-3.5-turbo", // ✅ Use a model you have access to
		messages: [
			{
				role: "system",
				content:
					"You are Chad Cattle, a finance bro who delivers cheesy finance-themed pickup lines with confidence.",
			},
			{ role: "user", content: "Give me a cheesy finance pickup line." },
		],
		max_tokens: 50,
		temperature: 0.9,
	};

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_API_KEY}`,
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();
		console.log("OpenAI API Response:", JSON.stringify(data, null, 2));

		// Handle potential API errors or missing data
		if (!data.choices || !data.choices.length || !data.choices[0].message) {
			console.error("Invalid API response:", data);
			return new Response(
				JSON.stringify({
					error: "Oops, Chad ran out of lines! (Invalid API Response)",
				}),
				{ headers: { "Content-Type": "application/json" }, status: 500 }
			);
		}

		return new Response(
			JSON.stringify({
				pickupLine: data.choices[0].message.content.trim(),
			}),
			{ headers: { "Content-Type": "application/json" } }
		);
	} catch (error) {
		console.error("Error fetching from OpenAI:", error);
		return new Response(
			JSON.stringify({
				error: "Oops, Chad ran out of lines! (Server Error)",
			}),
			{ headers: { "Content-Type": "application/json" }, status: 500 }
		);
	}
}
