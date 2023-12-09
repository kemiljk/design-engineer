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

export type Story = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    is_available: boolean;
    content: string;
    categories: Category[];
    design_engineer: {
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
