export interface TemplateType {
  id: number;
  name: string;
  description: string;
  imgUrl: string | null;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  fields: any;
}
