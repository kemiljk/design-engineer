import {
  Link,
  OpenNewWindow,
  Book,
  MediaVideo,
  Page,
  Globe,
  Github,
  Youtube,
  Xmark as Twitter,
  Bookmark,
  JournalPage,
  GraduationCap,
  LightBulb,
  Code,
  Palette,
  PlaySolid,
  Headset,
  Microphone,
  RssFeed,
  Mail,
  ChatBubble,
  Group,
  Suitcase,
  Folder,
  MediaImage,
  Figma,
} from "iconoir-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Link,
  OpenNewWindow: OpenNewWindow,
  Book,
  MediaVideo: MediaVideo,
  Page: Page,
  Globe,
  Github: Github,
  Youtube: Youtube,
  Twitter,
  Bookmark,
  JournalPage,
  GraduationCap,
  LightBulb: LightBulb,
  Code,
  Palette,
  PlaySolid: PlaySolid,
  Headset,
  Mic: Microphone,
  RssFeed,
  Mail,
  ChatBubble: ChatBubble,
  Users: Group,
  Briefcase: Suitcase,
  Folder,
  MediaImage: MediaImage,
  Figma,
};

export function ResourceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
