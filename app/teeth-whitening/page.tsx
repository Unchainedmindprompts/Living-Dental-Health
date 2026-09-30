import CosmeticServicePage from "@/components/CosmeticServicePage";
import { cosmeticServices } from "@/lib/cosmetic-services";
import { serviceMetadata } from "@/lib/metadata";
const service = cosmeticServices.whitening;
export const metadata = serviceMetadata(
  service.path,
  `${service.title} | Living Dental Health`,
  service.description,
  service.image,
);
export default function Page() {
  return <CosmeticServicePage kind="whitening" />;
}
