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
    content: string;
    url: string;
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
