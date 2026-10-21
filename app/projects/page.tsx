import { Projects } from "@/components/Projects";
import { CollectionPage } from "@/components/CollectionPage";

export const metadata = { title: "Projects | Sahil Khan" };

export default function Page() {
  return <CollectionPage title="Projects"><Projects /></CollectionPage>;
}
