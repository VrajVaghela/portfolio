import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToTarget } from "@/lib/smooth-scroll";
import { useLocalTime } from "@/lib/use-local-time";
import FitText from "./FitText";

export default function Footer() {
  const time = useLocalTime(profile.timezone);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-10">
      <div className="shell grid gap-8 md:grid-cols-12">
        <p className="label md:col-span-4">
          Designed &amp; built by {profile.name}
          <br />
          React · GSAP · Three.js · anime.js
        </p>
        <p className="label tabular-nums md:col-span-3">
          {profile.location}
          <br />
          {time} IST
        </p>
        <div className="flex gap-6 label md:col-span-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-underline text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="link-underline text-ink">Email</a>
        </div>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group flex items-center gap-2 justify-self-start label text-ink md:col-span-2 md:justify-self-end"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-500 group-hover:-translate-y-1" />
        </button>
      </div>

      <div className="shell mt-16 translate-y-[18%]" aria-hidden="true">
        <FitText className="display leading-[0.78] text-ink/[0.07]">VAGHELA</FitText>
      </div>
    </footer>
  );
}
