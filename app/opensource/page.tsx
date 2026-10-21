import { OpenSourceContributions } from "@/components/openSourceContributions";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata = { title: "Open-source contributions | Sahil Khan" };

export default function Page() {
  return <CollectionPage title="Open-source contributions"><OpenSourceContributions /></CollectionPage>;
}
