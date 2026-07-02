export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  isOpen: boolean;
  description?: string | undefined;
  createdAt: string | Date;
}