export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      call_logs: {
        Row: {
          callrail_call_id: string
          created_at: string
          direction: string
          duration: number
          id: string
          lead_id: string | null
          phone_number: string
          recording_url: string | null
        }
        Insert: {
          callrail_call_id: string
          created_at?: string
          direction?: string
          duration?: number
          id?: string
          lead_id?: string | null
          phone_number: string
          recording_url?: string | null
        }
        Update: {
          callrail_call_id?: string
          created_at?: string
          direction?: string
          duration?: number
          id?: string
          lead_id?: string | null
          phone_number?: string
          recording_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_cities: {
        Row: {
          county: string
          faqs: Json
          hero_headline: string
          hero_subheadline: string
          id: string
          lat: number
          lng: number
          local_content: Json
          meta_description: string
          meta_title: string
          name: string
          nearby_areas: Json
          population: string | null
          slug: string
          state: string
          updated_at: string
          zip: string
        }
        Insert: {
          county: string
          faqs?: Json
          hero_headline: string
          hero_subheadline: string
          id?: string
          lat: number
          lng: number
          local_content: Json
          meta_description: string
          meta_title: string
          name: string
          nearby_areas?: Json
          population?: string | null
          slug: string
          state?: string
          updated_at?: string
          zip: string
        }
        Update: {
          county?: string
          faqs?: Json
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          lat?: number
          lng?: number
          local_content?: Json
          meta_description?: string
          meta_title?: string
          name?: string
          nearby_areas?: Json
          population?: string | null
          slug?: string
          state?: string
          updated_at?: string
          zip?: string
        }
        Relationships: []
      }
      cms_financing: {
        Row: {
          calculator_defaults: Json
          faqs: Json
          hero_headline: string
          hero_subheadline: string
          id: string
          meta_description: string
          meta_title: string
          options: Json
          process_steps: Json
          updated_at: string
        }
        Insert: {
          calculator_defaults: Json
          faqs?: Json
          hero_headline: string
          hero_subheadline: string
          id?: string
          meta_description: string
          meta_title: string
          options: Json
          process_steps: Json
          updated_at?: string
        }
        Update: {
          calculator_defaults?: Json
          faqs?: Json
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          meta_description?: string
          meta_title?: string
          options?: Json
          process_steps?: Json
          updated_at?: string
        }
        Relationships: []
      }
      cms_homepage: {
        Row: {
          cta_headline: string
          cta_subtitle: string
          fallback_reviews: Json
          faqs: Json
          guarantee_headline: string
          guarantee_subtitle: string
          guarantees: Json
          hero_headline: string
          hero_subheadline: string
          id: string
          phone_number: string
          process_headline: string
          process_steps: Json
          process_subtitle: string
          rating_text: string
          trust_badges: Json
          updated_at: string
          why_benefits: Json
          why_headline: string
        }
        Insert: {
          cta_headline: string
          cta_subtitle: string
          fallback_reviews: Json
          faqs: Json
          guarantee_headline: string
          guarantee_subtitle: string
          guarantees: Json
          hero_headline: string
          hero_subheadline: string
          id?: string
          phone_number?: string
          process_headline: string
          process_steps: Json
          process_subtitle: string
          rating_text?: string
          trust_badges?: Json
          updated_at?: string
          why_benefits: Json
          why_headline: string
        }
        Update: {
          cta_headline?: string
          cta_subtitle?: string
          fallback_reviews?: Json
          faqs?: Json
          guarantee_headline?: string
          guarantee_subtitle?: string
          guarantees?: Json
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          phone_number?: string
          process_headline?: string
          process_steps?: Json
          process_subtitle?: string
          rating_text?: string
          trust_badges?: Json
          updated_at?: string
          why_benefits?: Json
          why_headline?: string
        }
        Relationships: []
      }
      cms_services: {
        Row: {
          description: Json
          faqs: Json
          hero_headline: string
          hero_subheadline: string
          icon_name: string
          id: string
          meta_description: string
          meta_title: string
          name: string
          pricing_factors: Json
          process_steps: Json
          quote_form_project_type: string
          related_services: Json
          short_name: string
          slug: string
          updated_at: string
        }
        Insert: {
          description: Json
          faqs?: Json
          hero_headline: string
          hero_subheadline: string
          icon_name: string
          id?: string
          meta_description: string
          meta_title: string
          name: string
          pricing_factors: Json
          process_steps: Json
          quote_form_project_type: string
          related_services?: Json
          short_name: string
          slug: string
          updated_at?: string
        }
        Update: {
          description?: Json
          faqs?: Json
          hero_headline?: string
          hero_subheadline?: string
          icon_name?: string
          id?: string
          meta_description?: string
          meta_title?: string
          name?: string
          pricing_factors?: Json
          process_steps?: Json
          quote_form_project_type?: string
          related_services?: Json
          short_name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      communications: {
        Row: {
          direction: string
          id: string
          lead_id: string
          message: string
          sent_at: string
          sent_by: string | null
          subject: string | null
          type: string
        }
        Insert: {
          direction?: string
          id?: string
          lead_id: string
          message: string
          sent_at?: string
          sent_by?: string | null
          subject?: string | null
          type?: string
        }
        Update: {
          direction?: string
          id?: string
          lead_id?: string
          message?: string
          sent_at?: string
          sent_by?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      estimates: {
        Row: {
          accepted_at: string | null
          amount: number
          created_at: string
          created_by: string | null
          estimate_number: string
          id: string
          lead_id: string
          notes: string | null
          sent_at: string | null
          service_type: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          amount?: number
          created_at?: string
          created_by?: string | null
          estimate_number: string
          id?: string
          lead_id: string
          notes?: string | null
          sent_at?: string | null
          service_type?: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          amount?: number
          created_at?: string
          created_by?: string | null
          estimate_number?: string
          id?: string
          lead_id?: string
          notes?: string | null
          sent_at?: string | null
          service_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimates_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_files: {
        Row: {
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          lead_id: string
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          file_name: string
          file_path: string
          file_size?: number
          file_type?: string
          id?: string
          lead_id: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          lead_id?: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_files_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_notes: {
        Row: {
          created_at: string
          created_by: string
          id: string
          lead_id: string
          note: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          lead_id: string
          note: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          lead_id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          due_at: string | null
          id: string
          lead_id: string
          status: string
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          lead_id: string
          status?: string
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          due_at?: string | null
          id?: string
          lead_id?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          gclid: string | null
          id: string
          landing_page: string | null
          last_contacted_at: string | null
          name: string
          owner_id: string | null
          phone: string
          referrer: string | null
          source: string | null
          status: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string
          email: string
          gclid?: string | null
          id?: string
          landing_page?: string | null
          last_contacted_at?: string | null
          name: string
          owner_id?: string | null
          phone: string
          referrer?: string | null
          source?: string | null
          status?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          gclid?: string | null
          id?: string
          landing_page?: string | null
          last_contacted_at?: string | null
          name?: string
          owner_id?: string | null
          phone?: string
          referrer?: string | null
          source?: string | null
          status?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          additional_details: string | null
          address: string
          approximate_sqft: string | null
          created_at: string
          email: string | null
          gclid: string | null
          id: string
          landing_page: string | null
          name: string
          phone: string
          project_type: string
          referrer: string | null
          roof_material: string | null
          roof_stories: string | null
          source: string | null
          status: string
          timeline: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          additional_details?: string | null
          address: string
          approximate_sqft?: string | null
          created_at?: string
          email?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          name: string
          phone: string
          project_type: string
          referrer?: string | null
          roof_material?: string | null
          roof_stories?: string | null
          source?: string | null
          status?: string
          timeline?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          additional_details?: string | null
          address?: string
          approximate_sqft?: string | null
          created_at?: string
          email?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          name?: string
          phone?: string
          project_type?: string
          referrer?: string | null
          roof_material?: string | null
          roof_stories?: string | null
          source?: string | null
          status?: string
          timeline?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role:
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
