export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      github_integration: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
          team_id: string
          updated_at: string | null
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id?: string
          team_id: string
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
          team_id?: string
          updated_at?: string | null
        }
      }
      github_repositories: {
        Row: {
          created_at: string | null
          id: string
          installation_id: number
          is_active: boolean
          organization_id: string
          repository_id: number
          repository_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          installation_id: number
          is_active?: boolean
          organization_id: string
          repository_id: number
          repository_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          installation_id?: number
          is_active?: boolean
          organization_id?: string
          repository_id?: number
          repository_name?: string
          updated_at?: string | null
        }
      }
      organizations: {
        Row: {
          account_id: number
          account_name: string
          avatar_url: string
          created_at: string | null
          id: string
          installation_id: number
          organization_type:
            | Database["public"]["Enums"]["organization_type"]
            | null
          updated_at: string | null
        }
        Insert: {
          account_id: number
          account_name: string
          avatar_url: string
          created_at?: string | null
          id?: string
          installation_id: number
          organization_type?:
            | Database["public"]["Enums"]["organization_type"]
            | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          account_name?: string
          avatar_url?: string
          created_at?: string | null
          id?: string
          installation_id?: number
          organization_type?:
            | Database["public"]["Enums"]["organization_type"]
            | null
          updated_at?: string | null
        }
      }
      pull_requests: {
        Row: {
          created_at: string | null
          draft: boolean
          id: string
          organization_id: string | null
          pr_id: string
          thread_ts: string | null
        }
        Insert: {
          created_at?: string | null
          draft?: boolean
          id?: string
          organization_id?: string | null
          pr_id: string
          thread_ts?: string | null
        }
        Update: {
          created_at?: string | null
          draft?: boolean
          id?: string
          organization_id?: string | null
          pr_id?: string
          thread_ts?: string | null
        }
      }
      slack_integration: {
        Row: {
          access_token: string
          channel_id: string
          channel_name: string
          created_at: string
          id: string
          organization_id: string
          slack_team_id: string
          slack_team_name: string
          updated_at: string
        }
        Insert: {
          access_token: string
          channel_id: string
          channel_name: string
          created_at?: string
          id?: string
          organization_id: string
          slack_team_id: string
          slack_team_name: string
          updated_at?: string
        }
        Update: {
          access_token?: string
          channel_id?: string
          channel_name?: string
          created_at?: string
          id?: string
          organization_id?: string
          slack_team_id?: string
          slack_team_name?: string
          updated_at?: string
        }
      }
      username_mappings: {
        Row: {
          created_at: string | null
          github_username: string
          id: string
          organization_id: string | null
          slack_user_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          github_username: string
          id?: string
          organization_id?: string | null
          slack_user_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          github_username?: string
          id?: string
          organization_id?: string | null
          slack_user_id?: string
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          gh_access_token: string | null
          gh_refresh_token: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          gh_access_token?: string | null
          gh_refresh_token?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          gh_access_token?: string | null
          gh_refresh_token?: string | null
          id?: string
          updated_at?: string | null
        }
      }
      users_and_organizations: {
        Row: {
          created_at: string | null
          id: string
          org_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          org_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          org_id?: string
          updated_at?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      organization_type: "Organization" | "User"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

