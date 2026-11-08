import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip";
import { modelBenchmarks } from "@/data/profile";

/** R² of the three Sirn forecasters on 84,314 held-out rows. */
export default function ModelChart() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <p className="label">Held-out R² · 84,314 rows</p>
      <BarChart
        data={modelBenchmarks}
        xDataKey="model"
        aspectRatio="16 / 10"
        barGap={0.35}
        margin={{ top: 24, right: 8, bottom: 36, left: 8 }}
      >
        <Grid horizontal />
        <Bar
          dataKey="r2"
          fill="var(--signal)"
          lineCap={4}
          showValue
          valueLabelPosition="top"
          valueLabelColor="#0a0a09"
          valueLabelFormatter={(v) => `${v.toFixed(2)}%`}
        />
        <BarXAxis />
        <ChartTooltip />
      </BarChart>
      <p className="font-mono text-[0.8rem] text-ink-soft">
        Shipped LightGBM: <span className="text-ink">0.29 MB</span> vs Random Forest&apos;s{" "}
        <span className="text-ink">2.92 GB</span>.
      </p>
    </div>
  );
}
