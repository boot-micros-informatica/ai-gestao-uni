-- Criar enum para os departamentos
CREATE TYPE public.department_type AS ENUM ('sempog', 'semad', 'semfaz');

-- Criar enum para os níveis de acesso
CREATE TYPE public.app_role AS ENUM ('sempog_user', 'semad_user', 'semfaz_user', 'admin');

-- Criar enum para status das reclamações
CREATE TYPE public.complaint_status AS ENUM ('recebido', 'executando', 'finalizado');

-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar tabela de roles dos usuários
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  department department_type,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função para verificar se usuário tem uma role específica
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Função para obter o departamento do usuário
CREATE OR REPLACE FUNCTION public.get_user_department(_user_id UUID)
RETURNS department_type
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT department
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Criar tabela de reclamações
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department department_type NOT NULL,
  complaint_text TEXT NOT NULL,
  audio_transcript TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  location_address TEXT,
  status complaint_status DEFAULT 'recebido' NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Criar tabela de fotos das reclamações
CREATE TABLE public.complaint_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.complaint_photos ENABLE ROW LEVEL SECURITY;

-- Trigger para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para user_roles
CREATE POLICY "Usuários podem ver suas próprias roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins podem ver todas as roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem inserir roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para complaints
CREATE POLICY "Usuários veem reclamações do seu departamento"
  ON public.complaints FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin') OR
    department = public.get_user_department(auth.uid())
  );

CREATE POLICY "Sistema pode inserir reclamações"
  ON public.complaints FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar status das reclamações do seu departamento"
  ON public.complaints FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin') OR
    department = public.get_user_department(auth.uid())
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR
    department = public.get_user_department(auth.uid())
  );

-- RLS Policies para complaint_photos
CREATE POLICY "Usuários veem fotos das reclamações do seu departamento"
  ON public.complaint_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_photos.complaint_id
      AND (
        public.has_role(auth.uid(), 'admin') OR
        complaints.department = public.get_user_department(auth.uid())
      )
    )
  );

CREATE POLICY "Sistema pode inserir fotos"
  ON public.complaint_photos FOR INSERT
  WITH CHECK (true);