import Reveal from "@/components/Reveal";
import ClientLogoWall from "@/components/ClientLogoWall";
import { CLIENTS } from "@/data/clients";

export default function SelectedClients() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl font-black text-ink md:text-3xl">SELECTED CLIENTS</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            공공기관부터 기업, 의료·교육·문화기관까지 다양한 파트너와 함께해왔습니다.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <ClientLogoWall clients={CLIENTS} />
        </Reveal>
      </div>
    </section>
  );
}
