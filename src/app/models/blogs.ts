export interface Blogs{
    id: number;
    title: string;
    description: string;
    tags: string;
    created_at: string;
    blog_photo: string;
}


export interface BlogById{
  data: {
    id: number;
    title: string;
    description: string;
    tags: string;
    created_at: string;
    blog_photo: string;
  }


}
