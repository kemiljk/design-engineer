export type Config = {
  metadata: {
    site_name: string;
    site_description: string;
    meta_image: {
      imgix_url: string;
    };
    site_url: string;
  };
};

export type Home = {
  metadata: {
    description: string;
    pill: string;
  };
};

export type Sponsor = {
  id: string;
  title: string;
  metadata: {
    logo: {
      imgix_url: string;
    };
    url: string;
  };
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  modified_at: string;
  metadata: {
    image: {
      imgix_url: string;
    };
    video_url: string;
    content: string;
    snippet: string;
    is_external_link: boolean;
    url: string;
    categories: Category[];
    author: {
      title: string;
      metadata: {
        image: {
          imgix_url: string;
        };
      };
    };
    published_date: string;
  };
};

interface Category {
  title: string;
  metadata: {
    color: string;
  };
}

export type Stats = {
  total: number;
};

export type Stat = {
  title: string;
  created_at: string;
};

export type Prompt = {
  id: string;
  title: string;
};

export type Spec = {
  id: string;
  title: string;
  metadata: {
    completion: string;
    prompt: Prompt;
  };
  creation_date: string;
};

export type TaskBuilderSuggestion = {
  id: string;
  title: string;
};

export type About = {
  title: string;
  metadata: {
    content: string;
  };
};

export type Privacy = {
  title: string;
  metadata: {
    content: string;
  };
};

export type Terms = {
  title: string;
  metadata: {
    content: string;
  };
};

export type Job = {
  id: string;
  title: string;
  metadata: {
    company: Company;
    location: Location[];
    industry: Industry[];
    description: string;
    url: string;
    posted: string;
  };
};

type Company = {
  id: string;
  slug: string;
  title: string;
  type: string;
  metadata: CompanyMetadata | null;
};

type CompanyMetadata = {
  logo: Logo;
};

type Logo = {
  url: string;
  imgix_url: string | null;
};

export type Location = {
  id: string;
  slug: string;
  title: string;
};

export type Industry = {
  id: string;
  slug: string;
  title: string;
  metadata: IndustryMetadata;
};

type IndustryMetadata = {
  colour: string;
};

export type Story = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    is_available: boolean;
    is_pending: boolean;
    snippet: string;
    video_url?: string;
    categories: Category[];
    summary: string;
    qna: {
      id: string;
      metadata: {
        qna: {
          person: Person;
          content: string;
        }[];
      };
    };
    design_engineer: {
      title: string;
      metadata: {
        image: {
          imgix_url: string;
        };
        role: string;
        company: {
          metadata: { logo: { imgix_url: string } };
        };
        twitter: string;
        website: string;
      };
    };
    published_date: string;
  };
};

interface Person {
  title: string;
  metadata: {
    image: {
      imgix_url: string;
    };
  };
}

interface Category {
  title: string;
  metadata: {
    color: string;
  };
}

export interface Resource {
  slug: string;
  title: string;
  metadata: Metadata;
}

interface Metadata {
  description: string;
  links: Link[];
}

interface Link {
  icon_name: string;
  text: string;
  url: string;
}

// Course Types

export type CourseNote = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  modified_at: string;
  metadata: {
    user_id: string;
    lesson_path: string;
    note_type: "general" | "exercise" | "highlight";
    content: string;
    is_pinned?: boolean;
  };
};

// Individual lesson progress within the user's progress object
export type LessonProgress = {
  status: "not_started" | "in_progress" | "completed";
  time_spent_seconds: number;
  completed_at?: string;
  started_at?: string;
};

// Single progress object per user containing all their lesson progress
export type CourseProgress = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  modified_at?: string;
  metadata: {
    user_id: string;
    // JSON object: { "lesson/path": LessonProgress }
    lessons: Record<string, LessonProgress>;
    total_time_spent_seconds: number;
    last_lesson_path?: string;
    last_activity_at?: string;
  };
};

export type CourseEnrollment = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    user_id: string;
    lemon_squeezy_customer_id?: string;
    lemon_squeezy_order_id?: string;
    product_id: string;
    access_level:
      | "free"
      | "design_web"
      | "design_ios"
      | "design_android"
      | "design_full"
      | "engineering_web"
      | "engineering_ios"
      | "engineering_android"
      | "engineering_full"
      | "full";
    purchased_at?: string;
    expires_at?: string;
    email_domain?: string; // For company logos feature
    status: "active" | "expired" | "refunded";
  };
};

export type AccessLevel = CourseEnrollment["metadata"]["access_level"];

export type CourseLesson = {
  slug: string;
  path: string;
  title: string;
  track: "design" | "engineering" | "convergence" | "introduction";
  platform: "web" | "ios" | "android" | "all";
  module: string;
  order: number;
  content: string;
  isFree: boolean;
};

// Certificate Types

export type CertificatePlatform = 'web' | 'ios' | 'android';
export type CertificateTrack = 'design' | 'engineering' | 'convergence';

// Track Certificate - awarded for completing a single track
export type TrackCertificate = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    user_id: string;
    user_name: string;
    user_email: string;
    platform: CertificatePlatform;
    track: CertificateTrack;
    issued_at: string;
    certificate_number: string;
    completed_at: string;
    total_time_spent_seconds: number;
  };
};

// Master Certificate - awarded for completing all three tracks
export type Certificate = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    user_id: string;
    user_name: string;
    user_email: string;
    platform: CertificatePlatform;
    issued_at: string;
    certificate_number: string;
    design_completed_at: string;
    engineering_completed_at: string;
    convergence_completed_at: string;
    total_time_spent_seconds: number;
  };
};

export type TrackCertificateEligibility = {
  platform: CertificatePlatform;
  track: CertificateTrack;
  eligible: boolean;
  progress: { completed: number; total: number };
  certificate?: TrackCertificate;
};

export type CertificateEligibility = {
  platform: CertificatePlatform;
  eligible: boolean;
  designComplete: boolean;
  engineeringComplete: boolean;
  convergenceComplete: boolean;
  designProgress: { completed: number; total: number };
  engineeringProgress: { completed: number; total: number };
  convergenceProgress: { completed: number; total: number };
  certificate?: Certificate;
  // Track certificates
  designCertificate?: TrackCertificate;
  engineeringCertificate?: TrackCertificate;
  convergenceCertificate?: TrackCertificate;
};

// LemonSqueezy Product Types

export type ProductKey =
  | "design_web"
  | "design_ios"
  | "design_android"
  | "design_full"
  | "engineering_web"
  | "engineering_ios"
  | "engineering_android"
  | "engineering_full"
  | "full";

export type ProductWithPrice = {
  key: ProductKey;
  name: string;
  description: string;
  features: readonly string[];
  variantId: string | undefined;
  price: number;
  formattedPrice: string;
  popular?: boolean;
};
