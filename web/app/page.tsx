import { Layout } from "@/components/layout";
import { Hero } from "@/components/Home";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <Layout>
      <Navbar />
      <Hero />
    </Layout>
  );
}
