
-- First, let's check if the user_role enum exists and recreate it if needed
DO $$ 
BEGIN
    -- Drop the existing trigger and function if they exist
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP FUNCTION IF EXISTS public.handle_new_user();
    
    -- Recreate the handle_new_user function with better error handling
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    DECLARE
        profile_id UUID;
    BEGIN
        -- Insert into profiles table with proper error handling
        INSERT INTO public.profiles (user_id, email, username, nama_lengkap, role)
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
            COALESCE(NEW.raw_user_meta_data->>'nama_lengkap', NEW.email),
            COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'siswa')
        )
        RETURNING id INTO profile_id;
        
        -- Log successful profile creation
        RAISE NOTICE 'Profile created with ID: %', profile_id;
        
        RETURN NEW;
    EXCEPTION
        WHEN unique_violation THEN
            -- Handle duplicate username/email
            RAISE NOTICE 'Duplicate entry detected for user: %', NEW.email;
            -- Try with a modified username
            INSERT INTO public.profiles (user_id, email, username, nama_lengkap, role)
            VALUES (
                NEW.id,
                NEW.email,
                split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 8),
                COALESCE(NEW.raw_user_meta_data->>'nama_lengkap', NEW.email),
                COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'siswa')
            );
            RETURN NEW;
        WHEN OTHERS THEN
            -- Log the error but don't fail the signup
            RAISE NOTICE 'Error creating profile for user %: %', NEW.email, SQLERRM;
            RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Recreate the trigger
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Create admin user directly in the database
    INSERT INTO public.profiles (
        id,
        user_id, 
        email, 
        username, 
        nama_lengkap, 
        role,
        is_active,
        created_at
    ) VALUES (
        gen_random_uuid(),
        gen_random_uuid(),
        'andikabgs@gmail.com',
        'afrils',
        'Admin BK System',
        'admin',
        true,
        now()
    ) ON CONFLICT (username) DO NOTHING;

    -- Also create the auth user (this would normally be handled by Supabase Auth)
    -- Note: This is just for the profile, actual auth user creation should be done through Supabase Auth UI

END $$;
