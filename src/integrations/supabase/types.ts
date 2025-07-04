export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      berita: {
        Row: {
          created_at: string | null
          gambar_url: string | null
          id: string
          is_published: boolean | null
          judul: string
          konten: string
          penulis_id: string
          tanggal_publikasi: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gambar_url?: string | null
          id?: string
          is_published?: boolean | null
          judul: string
          konten: string
          penulis_id: string
          tanggal_publikasi?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gambar_url?: string | null
          id?: string
          is_published?: boolean | null
          judul?: string
          konten?: string
          penulis_id?: string
          tanggal_publikasi?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "berita_penulis_id_fkey"
            columns: ["penulis_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guru: {
        Row: {
          alamat: string | null
          created_at: string | null
          id: string
          is_guru_bk: boolean | null
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          mata_pelajaran: string | null
          nama_lengkap: string
          nip: string
          no_hp: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          is_guru_bk?: boolean | null
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          mata_pelajaran?: string | null
          nama_lengkap: string
          nip: string
          no_hp?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          is_guru_bk?: boolean | null
          jenis_kelamin?: Database["public"]["Enums"]["jenis_kelamin"]
          mata_pelajaran?: string | null
          nama_lengkap?: string
          nip?: string
          no_hp?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guru_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jenis_pelanggaran_ref: {
        Row: {
          created_at: string | null
          deskripsi: string | null
          id: string
          kategori: Database["public"]["Enums"]["jenis_pelanggaran"]
          nama_pelanggaran: string
          poin: number
        }
        Insert: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kategori: Database["public"]["Enums"]["jenis_pelanggaran"]
          nama_pelanggaran: string
          poin: number
        }
        Update: {
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          kategori?: Database["public"]["Enums"]["jenis_pelanggaran"]
          nama_pelanggaran?: string
          poin?: number
        }
        Relationships: []
      }
      kehadiran_konseling: {
        Row: {
          catatan: string | null
          created_at: string | null
          id: string
          konsultasi_id: string
          siswa_id: string
          status_kehadiran: Database["public"]["Enums"]["status_kehadiran"]
          tanggal_kehadiran: string
        }
        Insert: {
          catatan?: string | null
          created_at?: string | null
          id?: string
          konsultasi_id: string
          siswa_id: string
          status_kehadiran: Database["public"]["Enums"]["status_kehadiran"]
          tanggal_kehadiran: string
        }
        Update: {
          catatan?: string | null
          created_at?: string | null
          id?: string
          konsultasi_id?: string
          siswa_id?: string
          status_kehadiran?: Database["public"]["Enums"]["status_kehadiran"]
          tanggal_kehadiran?: string
        }
        Relationships: [
          {
            foreignKeyName: "kehadiran_konseling_konsultasi_id_fkey"
            columns: ["konsultasi_id"]
            isOneToOne: false
            referencedRelation: "konsultasi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kehadiran_konseling_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      kelas: {
        Row: {
          created_at: string | null
          id: string
          jurusan: string | null
          nama_kelas: string
          tahun_ajaran: string
          tingkat: number
          updated_at: string | null
          wali_kelas_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          jurusan?: string | null
          nama_kelas: string
          tahun_ajaran: string
          tingkat: number
          updated_at?: string | null
          wali_kelas_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          jurusan?: string | null
          nama_kelas?: string
          tahun_ajaran?: string
          tingkat?: number
          updated_at?: string | null
          wali_kelas_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kelas_wali_kelas_id_fkey"
            columns: ["wali_kelas_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      konsultasi: {
        Row: {
          catatan_guru: string | null
          created_at: string | null
          deskripsi: string
          guru_bk_id: string | null
          id: string
          judul: string
          kategori: string | null
          lokasi: string | null
          siswa_id: string
          status: Database["public"]["Enums"]["status_konsultasi"] | null
          tanggal_jadwal: string | null
          tanggal_pengajuan: string | null
          tindak_lanjut: string | null
          updated_at: string | null
        }
        Insert: {
          catatan_guru?: string | null
          created_at?: string | null
          deskripsi: string
          guru_bk_id?: string | null
          id?: string
          judul: string
          kategori?: string | null
          lokasi?: string | null
          siswa_id: string
          status?: Database["public"]["Enums"]["status_konsultasi"] | null
          tanggal_jadwal?: string | null
          tanggal_pengajuan?: string | null
          tindak_lanjut?: string | null
          updated_at?: string | null
        }
        Update: {
          catatan_guru?: string | null
          created_at?: string | null
          deskripsi?: string
          guru_bk_id?: string | null
          id?: string
          judul?: string
          kategori?: string | null
          lokasi?: string | null
          siswa_id?: string
          status?: Database["public"]["Enums"]["status_konsultasi"] | null
          tanggal_jadwal?: string | null
          tanggal_pengajuan?: string | null
          tindak_lanjut?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "konsultasi_guru_bk_id_fkey"
            columns: ["guru_bk_id"]
            isOneToOne: false
            referencedRelation: "guru"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "konsultasi_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      pelanggaran_siswa: {
        Row: {
          created_at: string | null
          guru_pelapor_id: string | null
          id: string
          jenis_pelanggaran_id: string
          keterangan: string | null
          poin: number
          siswa_id: string
          status: string | null
          tanggal_pelanggaran: string
          tindak_lanjut: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          guru_pelapor_id?: string | null
          id?: string
          jenis_pelanggaran_id: string
          keterangan?: string | null
          poin: number
          siswa_id: string
          status?: string | null
          tanggal_pelanggaran?: string
          tindak_lanjut?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          guru_pelapor_id?: string | null
          id?: string
          jenis_pelanggaran_id?: string
          keterangan?: string | null
          poin?: number
          siswa_id?: string
          status?: string | null
          tanggal_pelanggaran?: string
          tindak_lanjut?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pelanggaran_siswa_guru_pelapor_id_fkey"
            columns: ["guru_pelapor_id"]
            isOneToOne: false
            referencedRelation: "guru"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pelanggaran_siswa_jenis_pelanggaran_id_fkey"
            columns: ["jenis_pelanggaran_id"]
            isOneToOne: false
            referencedRelation: "jenis_pelanggaran_ref"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pelanggaran_siswa_siswa_id_fkey"
            columns: ["siswa_id"]
            isOneToOne: false
            referencedRelation: "siswa"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          nama_lengkap: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          nama_lengkap: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          nama_lengkap?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      siswa: {
        Row: {
          alamat: string | null
          created_at: string | null
          id: string
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          kelas_id: string | null
          nama_lengkap: string
          nama_orang_tua: string | null
          nis: string
          nisn: string
          no_hp: string | null
          no_hp_orang_tua: string | null
          tanggal_lahir: string | null
          tempat_lahir: string | null
          total_poin_pelanggaran: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          jenis_kelamin: Database["public"]["Enums"]["jenis_kelamin"]
          kelas_id?: string | null
          nama_lengkap: string
          nama_orang_tua?: string | null
          nis: string
          nisn: string
          no_hp?: string | null
          no_hp_orang_tua?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          total_poin_pelanggaran?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          jenis_kelamin?: Database["public"]["Enums"]["jenis_kelamin"]
          kelas_id?: string | null
          nama_lengkap?: string
          nama_orang_tua?: string | null
          nis?: string
          nisn?: string
          no_hp?: string | null
          no_hp_orang_tua?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          total_poin_pelanggaran?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "siswa_kelas_id_fkey"
            columns: ["kelas_id"]
            isOneToOne: false
            referencedRelation: "kelas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "siswa_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_profile_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_guru_bk: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      jenis_kelamin: "L" | "P"
      jenis_pelanggaran: "ringan" | "sedang" | "berat"
      status_kehadiran: "hadir" | "tidak_hadir" | "izin"
      status_konsultasi: "pending" | "dijadwalkan" | "selesai" | "dibatalkan"
      user_role: "admin" | "guru_bk" | "wali_kelas" | "siswa"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      jenis_kelamin: ["L", "P"],
      jenis_pelanggaran: ["ringan", "sedang", "berat"],
      status_kehadiran: ["hadir", "tidak_hadir", "izin"],
      status_konsultasi: ["pending", "dijadwalkan", "selesai", "dibatalkan"],
      user_role: ["admin", "guru_bk", "wali_kelas", "siswa"],
    },
  },
} as const
