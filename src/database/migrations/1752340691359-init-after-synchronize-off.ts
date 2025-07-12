import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Migration: InitAfterSynchronizeOff1752340691359
 * Generated after turning off synchronize. Contains full schema and initial data.
 */
export class InitAfterSynchronizeOff1752340691359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   CREATE TABLE IF NOT EXISTS "migrations" (
    //     "id" SERIAL PRIMARY KEY,
    //     "timestamp" BIGINT NOT NULL,
    //     "name" VARCHAR NOT NULL
    //   );
    // `);
    await queryRunner.query(`
      SET statement_timeout = 0;
      SET lock_timeout = 0;
      SET idle_in_transaction_session_timeout = 0;
      SET client_encoding = 'UTF8';
      SET standard_conforming_strings = on;
      SELECT pg_catalog.set_config('search_path', '', false);
      SET check_function_bodies = false;
      SET xmloption = content;
      SET client_min_messages = warning;
      SET row_security = off;

      CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

      COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

      CREATE TYPE public.notifications_type_enum AS ENUM (
        'new_product',
        'price_change'
      );

      ALTER TYPE public.notifications_type_enum OWNER TO postgres;

      CREATE TYPE public.users_role_enum AS ENUM (
        'customer',
        'supplier'
      );

      ALTER TYPE public.users_role_enum OWNER TO postgres;

      SET default_tablespace = '';
      SET default_table_access_method = heap;

      CREATE TABLE public.establishments (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        name character varying NOT NULL,
        address character varying NOT NULL,
        user_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL,
        place_types jsonb DEFAULT '[]'::jsonb
      );

      ALTER TABLE public.establishments OWNER TO postgres;

      CREATE TABLE public.favorites (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        user_id uuid NOT NULL,
        product_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.favorites OWNER TO postgres;

      CREATE TABLE public.notifications (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        user_id uuid NOT NULL,
        type public.notifications_type_enum NOT NULL,
        title character varying NOT NULL,
        data json,
        body text NOT NULL,
        is_read boolean DEFAULT false NOT NULL,
        date timestamp without time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.notifications OWNER TO postgres;

      CREATE TABLE public.product_categories (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        name character varying NOT NULL,
        type character varying,
        description text,
        parent_id character varying,
        subcategories json,
        active boolean DEFAULT true NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.product_categories OWNER TO postgres;

      CREATE TABLE public.products (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        name character varying NOT NULL,
        description text,
        price numeric(10,2) NOT NULL,
        supplier_id uuid NOT NULL,
        category_id uuid NOT NULL,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL,
        images text,
        subcategory jsonb,
        filters jsonb,
        measure character varying(2),
        special_conditions character varying,
        volume integer,
        in_stock boolean DEFAULT true NOT NULL,
        country character varying,
        gift_box boolean,
        region character varying,
        certificates text,
        is_manufacturer boolean,
        manufacturer character varying,
        brand character varying,
        abv numeric(4,2)
      );

      ALTER TABLE public.products OWNER TO postgres;

      CREATE TABLE public.users (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        email character varying NOT NULL,
        password character varying NOT NULL,
        tax_id character varying NOT NULL,
        short_name character varying,
        full_name character varying,
        payer_address character varying,
        role public.users_role_enum NOT NULL,
        is_email_verified boolean DEFAULT false NOT NULL,
        email_verification_code character varying,
        reset_password_token character varying,
        reset_password_expires timestamp without time zone,
        created_at timestamp without time zone DEFAULT now() NOT NULL,
        updated_at timestamp without time zone DEFAULT now() NOT NULL,
        manager_name character varying,
        manager_position character varying,
        manager_phone character varying
      );

      ALTER TABLE public.users OWNER TO postgres;

      ALTER TABLE ONLY public.products
        ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);

      ALTER TABLE ONLY public.notifications
        ADD CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY (id);

      ALTER TABLE ONLY public.product_categories
        ADD CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY (id);

      ALTER TABLE ONLY public.establishments
        ADD CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY (id);

      ALTER TABLE ONLY public.favorites
        ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY (id);

      ALTER TABLE ONLY public.users
        ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);

      ALTER TABLE ONLY public.users
        ADD CONSTRAINT "UQ_7dab1de21ce9d5ed6420fe86889" UNIQUE (tax_id);

      ALTER TABLE ONLY public.users
        ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);

      ALTER TABLE ONLY public.favorites
        ADD CONSTRAINT "FK_003e599a9fc0e8f154b6313639f" FOREIGN KEY (product_id) REFERENCES public.products(id);

      ALTER TABLE ONLY public.establishments
        ADD CONSTRAINT "FK_0477b8280db47eaa85ddb7f48e7" FOREIGN KEY (user_id) REFERENCES public.users(id);

      ALTER TABLE ONLY public.products
        ADD CONSTRAINT "FK_0ec433c1e1d444962d592d86c86" FOREIGN KEY (supplier_id) REFERENCES public.users(id);

      ALTER TABLE ONLY public.favorites
        ADD CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY (user_id) REFERENCES public.users(id);

      ALTER TABLE ONLY public.products
        ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY (category_id) REFERENCES public.product_categories(id);

      ALTER TABLE ONLY public.notifications
        ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY (user_id) REFERENCES public.users(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in order to avoid FK issues
    await queryRunner.query(`DROP TABLE IF EXISTS "favorites" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "notifications" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "products" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "product_categories" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "establishments" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE;`);

    // Drop enums
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."notifications_type_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_role_enum";`);

    // Drop extension
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
