import { FeatureCard } from "@/components/sections/feature-card";

export function Features() {
  return (
    <section className="py-24 px-4 bg-[#F8CBDE] bg-opacity-10">
      <div className="container font-nunito mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">
          A <span className="text-orange-300">new</span> era of
          <br />
          Mindful Living
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center items-center w-full">
          <FeatureCard
            title="No Personal Details Required"
            description="Your mindfulness journey starts without sign-ups or the need to share any personal information."
          />
          <FeatureCard
            title="Personalized 1:1 Mindfulness Tools"
            description="Experience self-care tailored to your unique preferences, enabling you to focus on what matters most without distractions or data collection."
          />
          <FeatureCard
            title="Completely Decentralized and Private"
            description="Built on Web3 technology, Heartly ensures your data stays with you—no centralized servers, no tracking, no compromises."
          />
        </div>
      </div>
    </section>
  );
}
