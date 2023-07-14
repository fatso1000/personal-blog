export interface IReminders {
  created_at: string;
  id: number;
  user_id: number;
  updated_at: string;
  reminder_info: IReminderInfo;
}

export interface IReminderInfo {
  active: boolean;
  id: number;
  info?: string;
  title: string;
  reminder_id: number;
}

export interface IBlog {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  author_name: string;
  verification: boolean;
  reading_time: number;
  updated_at: Date;
  created_at: Date;
  post_tag_id: null;
  post_tag: IPostTags[];
  details: IBlogDetails;
}

export interface IFieldsGeneric {
  content: string | string[];
  src?: string;
  caption?: string;
  alt?: string;
}

export enum FieldsEnum {
  title = "title",
  text = "text",
  code = "code",
  image = "image",
  subtitle = "subtitle",
  divider = "divider",
}

export interface IFields {
  id: string;
  type: FieldsEnum;
  values?: IFieldsGeneric;
}

export interface IPostTags {
  id: number;
  name: string;
}

export interface BlogCardProps {
  value: IBlog;
}

export interface IBlogDetails {
  id: number;
  post_id: number;
  content: any;
  updated_at: Date;
  created_at: Date;
}

export interface BlogListProps {
  blogs: IBlog[];
}
