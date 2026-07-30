export interface Database {
  public: {
    Tables: {
      courses: {
        Row: CourseRow;
        Insert: Omit<CourseRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseRow, "id">>;
        Relationships: [];
      };
      lessons: {
        Row: LessonRow;
        Insert: Omit<LessonRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<LessonRow, "id">>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<ProfileRow, "id">>;
        Relationships: [];
      };
      purchases: {
        Row: PurchaseRow;
        Insert: Omit<PurchaseRow, "id" | "created_at">;
        Update: Partial<Omit<PurchaseRow, "id">>;
        Relationships: [];
      };
      reading_progress: {
        Row: ReadingProgressRow;
        Insert: Omit<ReadingProgressRow, "id" | "created_at">;
        Update: Partial<Omit<ReadingProgressRow, "id">>;
        Relationships: [];
      };
      bookmarks: {
        Row: BookmarkRow;
        Insert: Omit<BookmarkRow, "id" | "created_at">;
        Update: Partial<Omit<BookmarkRow, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

export interface CourseRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price_cents: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonRow {
  id: string;
  course_id: string;
  chapter: number;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  reading_time: string | null;
  estimated_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PurchaseRow {
  id: string;
  user_id: string;
  course_id: string;
  payment_provider: string;
  payment_id: string | null;
  status: "pending" | "completed" | "refunded" | "cancelled";
  created_at: string;
}

export interface ReadingProgressRow {
  id: string;
  user_id: string;
  lesson_id: string;
  progress: number;
  completed: boolean;
  scroll_position: number;
  last_read_at: string;
  created_at: string;
}

export interface BookmarkRow {
  id: string;
  user_id: string;
  lesson_id: string;
  excerpt: string | null;
  created_at: string;
}
