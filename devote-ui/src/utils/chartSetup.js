/**
 * Chart.js Central Registration
 * 
 * This file registers all necessary Chart.js components globally.
 * It should be imported once at the application entry point (index.js or App.js).
 * 
 * Without proper registration, Chart.js will throw errors like:
 * "line is not a registered controller"
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController,
  PieController,
  Tooltip,
  Legend,
  Title,
  Filler
} from "chart.js";

// Register all Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController,
  PieController,
  Tooltip,
  Legend,
  Title,
  Filler
);

// Export for use in components if needed
export { ChartJS };