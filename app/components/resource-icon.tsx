import {
  Link,
  OpenNewWindow as ExternalLink,
  Book,
  VideoCamera as Video,
  Page as FileText,
  Globe,
  Github,
  Youtube,
  X as Twitter,
  Bookmark,
  Page as Newspaper,
  GraduationCap,
  LightBulb as Lightbulb,
  Code,
  Palette,
  Play,
  Headset as Headphones,
  Microphone as Mic,
  RssFeed as Rss,
  Mail,
  MessageText as MessageCircle,
  Group as Users,
  Suitcase as Briefcase,
  Folder,
  MediaImage as Image,
  Figma,
} from "iconoir-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Link,
  ExternalLink,
  Book,
  Video,
  FileText,
  Globe,
  Github,
  Youtube,
  Twitter,
  Bookmark,
  Newspaper,
  GraduationCap,
  Lightbulb,
  Code,
  Palette,
  Play,
  Headphones,
  Mic,
  Rss,
  Mail,
  MessageCircle,
  Users,
  Briefcase,
  Folder,
  Image,
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
