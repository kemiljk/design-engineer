import { getBanner } from "@/lib/cosmic";
import Banner from "./banner";

export async function BannerWrapper() {
  const banner = await getBanner();

  if (!banner?.metadata?.is_active) return null;

  return (
    <Banner
      link={banner.metadata.link}
      button_label={banner.metadata.button_label}
      message={banner.metadata.message}
      modified_at={banner.modified_at}
    />
  );
}
