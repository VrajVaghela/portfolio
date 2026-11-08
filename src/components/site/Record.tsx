import { useMemo } from "react";
import { motion } from "motion/react";
import ActivityTerrain from "@/components/kokonutui/activity-terrain";
import { profile, record } from "@/data/profile";
import { useContributions } from "@/lib/use-contributions";
import SectionHead from "./SectionHead";

const WEEKS = 26;

export default function Record() {
  const contributions = useContributions(profile.githubUser);
  const recent = useMemo(() => contributions?.days.slice(-WEEKS * 7), [contributions]);

  return (
    <section id="record" className="relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHead index="04" label="Record" aside="Education · recognition · output" />

      <div className="shell mt-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display text-[clamp(3rem,7vw,7.5rem)]">The paper trail</h2>
          <ol className="mt-12">
            {record.map((r, i) => (
              <motion.li
                key={r.what}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-6"
              >
                <span className="label pt-1">{r.when}</span>
                <div>
                  <p className="text-lg leading-snug text-ink">{r.what}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {r.where} <span className="text-ink-faint">·</span> {r.note}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="flex items-baseline justify-between">
            <p className="label">GitHub activity · last {WEEKS} weeks · drag to turn</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="label link-underline text-ink">
              @{profile.githubUser}
            </a>
          </div>
          {recent && contributions ? (
            <ActivityTerrain
              data={recent}
              endDate={contributions.endDate}
              title="Contributions"
              className="max-w-none rounded-[clamp(1rem,2vw,1.75rem)] border-line bg-paper-raised [&_canvas]:h-[22rem] md:[&_canvas]:h-[26rem]
                dark:border-line dark:bg-paper-raised
                dark:[--terrain-0:#1c1c19] dark:[--terrain-1:#4a3226] dark:[--terrain-2:#8a4428] dark:[--terrain-3:#d1501f] dark:[--terrain-4:#ff5b24] dark:[--terrain-accent:#f2efe8] dark:[--terrain-text:#67645d]"
            />
          ) : (
            <div className="grid h-[28rem] place-items-center rounded-[clamp(1rem,2vw,1.75rem)] border border-line bg-paper-raised">
              <span className="label">Loading activity…</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
