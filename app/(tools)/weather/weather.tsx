"use client";

import { useState } from "react";
import { getWeatherInfo } from "@/app/api/mastra/action";

export function Weather() {
  const [weatherData, setWeatherData] = useState<any>(null);

  async function handleSubmit(formData: FormData) {
    const city = formData.get("city") as string;
    const result = await getWeatherInfo(city);
    setWeatherData(result);
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="city" placeholder="Enter city name" />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
