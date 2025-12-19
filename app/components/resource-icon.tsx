import {
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
} from "lucide-react";

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
