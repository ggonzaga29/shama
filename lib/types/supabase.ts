export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      booking_files: {
        Row: {
          booking_id: string;
          created_at: string | null;
          file_name: string | null;
          file_url: string;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          booking_id: string;
          created_at?: string | null;
          file_name?: string | null;
          file_url: string;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          booking_id?: string;
          created_at?: string | null;
          file_name?: string | null;
          file_url?: string;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_client";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
        ];
      };
      booking_invoices: {
        Row: {
          amount: number | null;
          booking_id: string;
          created_at: string | null;
          deposit_amount: number | null;
          id: string;
          payment_deadline: string;
          payment_method: Database["public"]["Enums"]["mode_of_payment"] | null;
          status: Database["public"]["Enums"]["invoice_status"] | null;
          updated_at: string | null;
        };
        Insert: {
          amount?: number | null;
          booking_id: string;
          created_at?: string | null;
          deposit_amount?: number | null;
          id?: string;
          payment_deadline: string;
          payment_method?: Database["public"]["Enums"]["mode_of_payment"] | null;
          status?: Database["public"]["Enums"]["invoice_status"] | null;
          updated_at?: string | null;
        };
        Update: {
          amount?: number | null;
          booking_id?: string;
          created_at?: string | null;
          deposit_amount?: number | null;
          id?: string;
          payment_deadline?: string;
          payment_method?: Database["public"]["Enums"]["mode_of_payment"] | null;
          status?: Database["public"]["Enums"]["invoice_status"] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_booking";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
        ];
      };
      booking_vehicles: {
        Row: {
          booking_id: string;
          created_at: string;
          custom_driver_jsonb: Json | null;
          driver_id: string | null;
          driver_type: Database["public"]["Enums"]["booking_driver_type"];
          id: number;
          personal_client_driver_id: number | null;
          price: number;
          vehicle_id: string;
        };
        Insert: {
          booking_id: string;
          created_at?: string;
          custom_driver_jsonb?: Json | null;
          driver_id?: string | null;
          driver_type: Database["public"]["Enums"]["booking_driver_type"];
          id?: number;
          personal_client_driver_id?: number | null;
          price: number;
          vehicle_id: string;
        };
        Update: {
          booking_id?: string;
          created_at?: string;
          custom_driver_jsonb?: Json | null;
          driver_id?: string | null;
          driver_type?: Database["public"]["Enums"]["booking_driver_type"];
          id?: number;
          personal_client_driver_id?: number | null;
          price?: number;
          vehicle_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "booking_vehicles_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_vehicles_driver_id_fkey";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_vehicles_personal_client_driver_id_fkey";
            columns: ["personal_client_driver_id"];
            isOneToOne: false;
            referencedRelation: "personal_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_vehicles_vehicle_id_fkey";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: {
          client_id: string | null;
          client_json: Json | null;
          client_type: Database["public"]["Enums"]["client_type"];
          created_at: string | null;
          custom_user_json: Json | null;
          discount: number | null;
          driver_id: string | null;
          dropoff_datetime: string;
          dropoff_location: string | null;
          id: string;
          notes: string | null;
          pickup_datetime: string;
          pickup_location: string | null;
          rental_type: Database["public"]["Enums"]["rental_type"] | null;
          status: Database["public"]["Enums"]["booking_status"] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          client_id?: string | null;
          client_json?: Json | null;
          client_type?: Database["public"]["Enums"]["client_type"];
          created_at?: string | null;
          custom_user_json?: Json | null;
          discount?: number | null;
          driver_id?: string | null;
          dropoff_datetime: string;
          dropoff_location?: string | null;
          id?: string;
          notes?: string | null;
          pickup_datetime: string;
          pickup_location?: string | null;
          rental_type?: Database["public"]["Enums"]["rental_type"] | null;
          status?: Database["public"]["Enums"]["booking_status"] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          client_id?: string | null;
          client_json?: Json | null;
          client_type?: Database["public"]["Enums"]["client_type"];
          created_at?: string | null;
          custom_user_json?: Json | null;
          discount?: number | null;
          driver_id?: string | null;
          dropoff_datetime?: string;
          dropoff_location?: string | null;
          id?: string;
          notes?: string | null;
          pickup_datetime?: string;
          pickup_location?: string | null;
          rental_type?: Database["public"]["Enums"]["rental_type"] | null;
          status?: Database["public"]["Enums"]["booking_status"] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_client";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_driver";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      business_client_employee: {
        Row: {
          business_client_id: string;
          created_at: string;
          email: string | null;
          employee_name: string;
          employee_number: string | null;
          id: string;
          phone: string | null;
          role: string | null;
          updated_at: string;
        };
        Insert: {
          business_client_id: string;
          created_at?: string;
          email?: string | null;
          employee_name: string;
          employee_number?: string | null;
          id?: string;
          phone?: string | null;
          role?: string | null;
          updated_at?: string;
        };
        Update: {
          business_client_id?: string;
          created_at?: string;
          email?: string | null;
          employee_name?: string;
          employee_number?: string | null;
          id?: string;
          phone?: string | null;
          role?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_business_client";
            columns: ["business_client_id"];
            isOneToOne: false;
            referencedRelation: "business_clients";
            referencedColumns: ["id"];
          },
        ];
      };
      business_client_employee_files: {
        Row: {
          created_at: string;
          description: string | null;
          employee_id: string;
          id: string;
          path: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          employee_id: string;
          id?: string;
          path: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          employee_id?: string;
          id?: string;
          path?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_employee";
            columns: ["employee_id"];
            isOneToOne: false;
            referencedRelation: "business_client_employee";
            referencedColumns: ["id"];
          },
        ];
      };
      business_clients: {
        Row: {
          address: string | null;
          business_name: string;
          city: string | null;
          country: string | null;
          created_at: string;
          email: string | null;
          id: string;
          phone: string | null;
          postal_code: string | null;
          registration_number: string | null;
          state: string | null;
          updated_at: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          business_name: string;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          phone?: string | null;
          postal_code?: string | null;
          registration_number?: string | null;
          state?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          business_name?: string;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          phone?: string | null;
          postal_code?: string | null;
          registration_number?: string | null;
          state?: string | null;
          updated_at?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      client_files: {
        Row: {
          client_id: string;
          created_at: string | null;
          file_name: string | null;
          file_url: string;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          client_id: string;
          created_at?: string | null;
          file_name?: string | null;
          file_url: string;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          client_id?: string;
          created_at?: string | null;
          file_name?: string | null;
          file_url?: string;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_client";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      clients: {
        Row: {
          business_name: string | null;
          created_at: string | null;
          customer_type: Database["public"]["Enums"]["customer_type"] | null;
          email: string | null;
          id: string;
          name: string;
          notes: string | null;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database["public"]["Enums"]["customer_type"] | null;
          email?: string | null;
          id?: string;
          name: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database["public"]["Enums"]["customer_type"] | null;
          email?: string | null;
          id?: string;
          name?: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      crud_logs: {
        Row: {
          action: Database["public"]["Enums"]["crud_action"] | null;
          created_at: string;
          id: number;
          metadata: Json | null;
          record_id: string | null;
          table_name: string | null;
          timestamp: string | null;
          user_id: string | null;
        };
        Insert: {
          action?: Database["public"]["Enums"]["crud_action"] | null;
          created_at?: string;
          id?: number;
          metadata?: Json | null;
          record_id?: string | null;
          table_name?: string | null;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: Database["public"]["Enums"]["crud_action"] | null;
          created_at?: string;
          id?: number;
          metadata?: Json | null;
          record_id?: string | null;
          table_name?: string | null;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      driver_files: {
        Row: {
          created_at: string | null;
          driver_id: string;
          file_name: string | null;
          file_url: string;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          driver_id: string;
          file_name?: string | null;
          file_url: string;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          driver_id?: string;
          file_name?: string | null;
          file_url?: string;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_client";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
        ];
      };
      driver_queue: {
        Row: {
          created_at: string | null;
          driver_id: string;
          id: string;
          position: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          driver_id: string;
          id?: string;
          position?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          driver_id?: string;
          id?: string;
          position?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_driver";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
        ];
      };
      driver_queue_declinations: {
        Row: {
          created_at: string | null;
          driver_id: string;
          id: string;
          position_at: number | null;
          reason: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          driver_id: string;
          id?: string;
          position_at?: number | null;
          reason?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          driver_id?: string;
          id?: string;
          position_at?: number | null;
          reason?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_driver_declination";
            columns: ["driver_id"];
            isOneToOne: false;
            referencedRelation: "drivers";
            referencedColumns: ["id"];
          },
        ];
      };
      drivers: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          birth_date: string | null;
          created_at: string | null;
          email: string | null;
          employee_id: string | null;
          first_name: string;
          id: string;
          last_name: string;
          license_expiry_date: string | null;
          license_number: string | null;
          middle_name: string | null;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          birth_date?: string | null;
          created_at?: string | null;
          email?: string | null;
          employee_id?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          license_expiry_date?: string | null;
          license_number?: string | null;
          middle_name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          birth_date?: string | null;
          created_at?: string | null;
          email?: string | null;
          employee_id?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          license_expiry_date?: string | null;
          license_number?: string | null;
          middle_name?: string | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string | null;
          id: string;
          message: string;
          status: Database["public"]["Enums"]["notification_status"] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          message: string;
          status?: Database["public"]["Enums"]["notification_status"] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          message?: string;
          status?: Database["public"]["Enums"]["notification_status"] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      personal_client_files: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          path: string | null;
          personal_client_id: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          path?: string | null;
          personal_client_id?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          path?: string | null;
          personal_client_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "personal_client_files_personal_client_id_fkey";
            columns: ["personal_client_id"];
            isOneToOne: false;
            referencedRelation: "personal_clients";
            referencedColumns: ["id"];
          },
        ];
      };
      personal_clients: {
        Row: {
          address: string | null;
          created_at: string;
          date_of_birth: string | null;
          driver_license_number: string;
          email: string | null;
          emergency_contact_email: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          emergency_contact_relationship: string | null;
          first_name: string;
          gender: string | null;
          id: number;
          last_name: string;
          middle_name: string | null;
          phone: string | null;
          zip_code: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          driver_license_number: string;
          email?: string | null;
          emergency_contact_email?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          first_name: string;
          gender?: string | null;
          id?: number;
          last_name: string;
          middle_name?: string | null;
          phone?: string | null;
          zip_code?: string | null;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          driver_license_number?: string;
          email?: string | null;
          emergency_contact_email?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          first_name?: string;
          gender?: string | null;
          id?: number;
          last_name?: string;
          middle_name?: string | null;
          phone?: string | null;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      profile_avatars: {
        Row: {
          id: string;
          is_selected: boolean | null;
          path: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          is_selected?: boolean | null;
          path?: string | null;
          user_id: string;
        };
        Update: {
          id?: string;
          is_selected?: boolean | null;
          path?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          address: string | null;
          avatar: Json | null;
          bio: string | null;
          first_name: string | null;
          gender: string | null;
          id: string;
          is_first_login: boolean | null;
          last_name: string | null;
          phone: string | null;
        };
        Insert: {
          address?: string | null;
          avatar?: Json | null;
          bio?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id: string;
          is_first_login?: boolean | null;
          last_name?: string | null;
          phone?: string | null;
        };
        Update: {
          address?: string | null;
          avatar?: Json | null;
          bio?: string | null;
          first_name?: string | null;
          gender?: string | null;
          id?: string;
          is_first_login?: boolean | null;
          last_name?: string | null;
          phone?: string | null;
        };
        Relationships: [];
      };
      vehicle_files: {
        Row: {
          created_at: string | null;
          file_name: string | null;
          file_url: string;
          id: string;
          updated_at: string | null;
          vehicle_id: string;
        };
        Insert: {
          created_at?: string | null;
          file_name?: string | null;
          file_url: string;
          id?: string;
          updated_at?: string | null;
          vehicle_id: string;
        };
        Update: {
          created_at?: string | null;
          file_name?: string | null;
          file_url?: string;
          id?: string;
          updated_at?: string | null;
          vehicle_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_client";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle_maintenance: {
        Row: {
          created_at: string | null;
          end_datetime: string;
          id: string;
          maintenance_type: string | null;
          notes: string | null;
          start_datetime: string;
          status: Database["public"]["Enums"]["maintenance_status"] | null;
          updated_at: string | null;
          vehicle_id: string;
        };
        Insert: {
          created_at?: string | null;
          end_datetime: string;
          id?: string;
          maintenance_type?: string | null;
          notes?: string | null;
          start_datetime: string;
          status?: Database["public"]["Enums"]["maintenance_status"] | null;
          updated_at?: string | null;
          vehicle_id: string;
        };
        Update: {
          created_at?: string | null;
          end_datetime?: string;
          id?: string;
          maintenance_type?: string | null;
          notes?: string | null;
          start_datetime?: string;
          status?: Database["public"]["Enums"]["maintenance_status"] | null;
          updated_at?: string | null;
          vehicle_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_vehicle_id";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicles";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle_variant_images: {
        Row: {
          alt: string | null;
          id: string;
          url: string | null;
          variant_metadata_id: string | null;
        };
        Insert: {
          alt?: string | null;
          id?: string;
          url?: string | null;
          variant_metadata_id?: string | null;
        };
        Update: {
          alt?: string | null;
          id?: string;
          url?: string | null;
          variant_metadata_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_variant_metadata";
            columns: ["variant_metadata_id"];
            isOneToOne: false;
            referencedRelation: "vehicle_variant_metadata";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle_variant_metadata: {
        Row: {
          code: string | null;
          displacement: string | null;
          front_rear_brake: string | null;
          fuel_capacity: string | null;
          fuel_type: string | null;
          id: string;
          model: string | null;
          name: string | null;
          power_transmission: string | null;
          seating_capacity: number | null;
          tires: string | null;
          transmission: string | null;
          type: string | null;
          variant_id: number | null;
          vehicle_id: string | null;
          wheels: string | null;
        };
        Insert: {
          code?: string | null;
          displacement?: string | null;
          front_rear_brake?: string | null;
          fuel_capacity?: string | null;
          fuel_type?: string | null;
          id?: string;
          model?: string | null;
          name?: string | null;
          power_transmission?: string | null;
          seating_capacity?: number | null;
          tires?: string | null;
          transmission?: string | null;
          type?: string | null;
          variant_id?: number | null;
          vehicle_id?: string | null;
          wheels?: string | null;
        };
        Update: {
          code?: string | null;
          displacement?: string | null;
          front_rear_brake?: string | null;
          fuel_capacity?: string | null;
          fuel_type?: string | null;
          id?: string;
          model?: string | null;
          name?: string | null;
          power_transmission?: string | null;
          seating_capacity?: number | null;
          tires?: string | null;
          transmission?: string | null;
          type?: string | null;
          variant_id?: number | null;
          vehicle_id?: string | null;
          wheels?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_vehicle_variant";
            columns: ["vehicle_id"];
            isOneToOne: false;
            referencedRelation: "vehicle_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle_variants: {
        Row: {
          id: string;
          metadata_url: string | null;
          name: string | null;
          url: string | null;
        };
        Insert: {
          id?: string;
          metadata_url?: string | null;
          name?: string | null;
          url?: string | null;
        };
        Update: {
          id?: string;
          metadata_url?: string | null;
          name?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      vehicles: {
        Row: {
          created_at: string | null;
          default_price: number | null;
          displacement: string | null;
          front_rear_brake: string | null;
          fuel_capacity: string | null;
          fuel_type: string | null;
          id: string;
          image_url: string | null;
          license_plate: string | null;
          model: string | null;
          name: string | null;
          power_transmission: string | null;
          seating_capacity: number | null;
          status: Database["public"]["Enums"]["status"] | null;
          tires: string | null;
          transmission: string | null;
          type: string | null;
          updated_at: string | null;
          wheels: string | null;
        };
        Insert: {
          created_at?: string | null;
          default_price?: number | null;
          displacement?: string | null;
          front_rear_brake?: string | null;
          fuel_capacity?: string | null;
          fuel_type?: string | null;
          id?: string;
          image_url?: string | null;
          license_plate?: string | null;
          model?: string | null;
          name?: string | null;
          power_transmission?: string | null;
          seating_capacity?: number | null;
          status?: Database["public"]["Enums"]["status"] | null;
          tires?: string | null;
          transmission?: string | null;
          type?: string | null;
          updated_at?: string | null;
          wheels?: string | null;
        };
        Update: {
          created_at?: string | null;
          default_price?: number | null;
          displacement?: string | null;
          front_rear_brake?: string | null;
          fuel_capacity?: string | null;
          fuel_type?: string | null;
          id?: string;
          image_url?: string | null;
          license_plate?: string | null;
          model?: string | null;
          name?: string | null;
          power_transmission?: string | null;
          seating_capacity?: number | null;
          status?: Database["public"]["Enums"]["status"] | null;
          tires?: string | null;
          transmission?: string | null;
          type?: string | null;
          updated_at?: string | null;
          wheels?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      enable_row_level_security: {
        Args: {
          table_name: string;
        };
        Returns: undefined;
      };
      search_similar_rows: {
        Args: {
          table_name: string;
          search_value: string;
        };
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      availability_status: "available" | "under maintenance" | "rented";
      booking_driver_type: "personal_client" | "business_client" | "driver" | "custom";
      booking_status: "booked" | "payment_pending" | "completed";
      booking_type: "self_drive" | "flexible_driving" | "pick_up_drop_off";
      client_type: "personal" | "business" | "custom";
      crud_action: "CREATE" | "READ" | "UPDATE" | "DELETE";
      customer_type: "personal" | "hotel" | "travel_agency" | "other";
      invoice_status: "pending" | "paid";
      maintenance_status: "scheduled" | "in_progress" | "completed";
      mode_of_payment: "cash" | "card" | "e-wallet" | "bank";
      notification_status: "unread" | "read";
      rental_type: "self-drive" | "with-driver";
      status: "available" | "under maintenance" | "rented";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
