export type Home = {
  metadata: {
    description: string;
    pill: string;
  };
};

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
