--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-13 10:29:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16757)
-- Name: bancas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bancas (
    banca_id integer NOT NULL,
    nome_banca character varying(255) NOT NULL
);


ALTER TABLE public.bancas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16756)
-- Name: bancas_banca_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bancas_banca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bancas_banca_id_seq OWNER TO postgres;

--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 221
-- Name: bancas_banca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bancas_banca_id_seq OWNED BY public.bancas.banca_id;


--
-- TOC entry 226 (class 1259 OID 16771)
-- Name: cargos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos (
    cargo_id integer NOT NULL,
    nome_cargo character varying(255) NOT NULL
);


ALTER TABLE public.cargos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16770)
-- Name: cargos_cargo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargos_cargo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargos_cargo_id_seq OWNER TO postgres;

--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 225
-- Name: cargos_cargo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_cargo_id_seq OWNED BY public.cargos.cargo_id;


--
-- TOC entry 224 (class 1259 OID 16764)
-- Name: disciplinas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disciplinas (
    disciplina_id integer NOT NULL,
    nome_disciplina character varying(255) NOT NULL
);


ALTER TABLE public.disciplinas OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16763)
-- Name: disciplinas_disciplina_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disciplinas_disciplina_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.disciplinas_disciplina_id_seq OWNER TO postgres;

--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 223
-- Name: disciplinas_disciplina_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disciplinas_disciplina_id_seq OWNED BY public.disciplinas.disciplina_id;


--
-- TOC entry 220 (class 1259 OID 16743)
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamentos (
    pagamento_id integer NOT NULL,
    usuario_id integer NOT NULL,
    valor numeric(10,2) NOT NULL,
    metodo_pagamento character varying(20) NOT NULL,
    data_pagamento timestamp without time zone DEFAULT now(),
    CONSTRAINT pagamentos_metodo_pagamento_check CHECK (((metodo_pagamento)::text = ANY ((ARRAY['bitcoin'::character varying, 'reais'::character varying])::text[])))
);


ALTER TABLE public.pagamentos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16742)
-- Name: pagamentos_pagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamentos_pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamentos_pagamento_id_seq OWNER TO postgres;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 219
-- Name: pagamentos_pagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamentos_pagamento_id_seq OWNED BY public.pagamentos.pagamento_id;


--
-- TOC entry 228 (class 1259 OID 16778)
-- Name: questoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questoes (
    questao_id integer NOT NULL,
    questao text NOT NULL,
    banca_id integer,
    disciplina_id integer,
    cargo_id integer,
    ano_prova integer NOT NULL,
    alternativa_correta character(1) NOT NULL,
    alternativa_a text,
    alternativa_b text,
    alternativa_c text,
    alternativa_d text,
    alternativa_e text,
    CONSTRAINT questoes_alternativa_correta_check CHECK ((alternativa_correta = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar, 'E'::bpchar])))
);


ALTER TABLE public.questoes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16777)
-- Name: questoes_questao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questoes_questao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questoes_questao_id_seq OWNER TO postgres;

--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 227
-- Name: questoes_questao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questoes_questao_id_seq OWNED BY public.questoes.questao_id;


--
-- TOC entry 230 (class 1259 OID 16803)
-- Name: respostas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respostas (
    resposta_id integer NOT NULL,
    usuario_id integer NOT NULL,
    questao_id integer NOT NULL,
    alternativa_escolhida character(1),
    correta boolean,
    data_resposta timestamp without time zone DEFAULT now(),
    ativa boolean DEFAULT true,
    CONSTRAINT respostas_alternativa_escolhida_check CHECK ((alternativa_escolhida = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar, 'E'::bpchar])))
);


ALTER TABLE public.respostas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16802)
-- Name: respostas_resposta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.respostas_resposta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.respostas_resposta_id_seq OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 229
-- Name: respostas_resposta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respostas_resposta_id_seq OWNED BY public.respostas.resposta_id;


--
-- TOC entry 218 (class 1259 OID 16730)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    usuario_id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo_usuario character varying(20) NOT NULL,
    criado_em timestamp without time zone DEFAULT now(),
    CONSTRAINT usuarios_tipo_usuario_check CHECK (((tipo_usuario)::text = ANY ((ARRAY['usuario'::character varying, 'administrador'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16729)
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_usuario_id_seq OWNED BY public.usuarios.usuario_id;


--
-- TOC entry 4675 (class 2604 OID 16760)
-- Name: bancas banca_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bancas ALTER COLUMN banca_id SET DEFAULT nextval('public.bancas_banca_id_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 16774)
-- Name: cargos cargo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN cargo_id SET DEFAULT nextval('public.cargos_cargo_id_seq'::regclass);


--
-- TOC entry 4676 (class 2604 OID 16767)
-- Name: disciplinas disciplina_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas ALTER COLUMN disciplina_id SET DEFAULT nextval('public.disciplinas_disciplina_id_seq'::regclass);


--
-- TOC entry 4673 (class 2604 OID 16746)
-- Name: pagamentos pagamento_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos ALTER COLUMN pagamento_id SET DEFAULT nextval('public.pagamentos_pagamento_id_seq'::regclass);


--
-- TOC entry 4678 (class 2604 OID 16781)
-- Name: questoes questao_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questoes ALTER COLUMN questao_id SET DEFAULT nextval('public.questoes_questao_id_seq'::regclass);


--
-- TOC entry 4679 (class 2604 OID 16806)
-- Name: respostas resposta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respostas ALTER COLUMN resposta_id SET DEFAULT nextval('public.respostas_resposta_id_seq'::regclass);


--
-- TOC entry 4671 (class 2604 OID 16733)
-- Name: usuarios usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuarios_usuario_id_seq'::regclass);


--
-- TOC entry 4858 (class 0 OID 16757)
-- Dependencies: 222
-- Data for Name: bancas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bancas (banca_id, nome_banca) FROM stdin;
6	Faepa
7	Teste
\.


--
-- TOC entry 4862 (class 0 OID 16771)
-- Dependencies: 226
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (cargo_id, nome_cargo) FROM stdin;
2	tecnico de informatica
\.


--
-- TOC entry 4860 (class 0 OID 16764)
-- Dependencies: 224
-- Data for Name: disciplinas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disciplinas (disciplina_id, nome_disciplina) FROM stdin;
1	Banco de dados
3	SQL
4	PL/SQL
5	ORACLE APEX
6	TESTE DE SOFTWARE
7	PYTHON
8	JAVASCRIPT
9	C++
10	C
11	C#
12	PHP
13	ITIL
14	COBIT
15	KAMBAN
16	LINUX
17	WINDOWS
18	OFFICE
19	REDES DE COMPUTADORES
20	PROTOCOLOS
\.


--
-- TOC entry 4856 (class 0 OID 16743)
-- Dependencies: 220
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamentos (pagamento_id, usuario_id, valor, metodo_pagamento, data_pagamento) FROM stdin;
\.


--
-- TOC entry 4864 (class 0 OID 16778)
-- Dependencies: 228
-- Data for Name: questoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questoes (questao_id, questao, banca_id, disciplina_id, cargo_id, ano_prova, alternativa_correta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_e) FROM stdin;
1	Quem descobriu o Brasil ?	6	1	2	2024	A	Pedro Alvares de Cabral	Elon Musk	Zé da manga	Tiradentes	df
2	Qual a cor de Marte?	6	1	2	2025	A	Pedro Alvares de Cabral	Elon Musk	Zé da Manga	Teste	Teste2
3	teste sem alternativa d e 	6	1	2	2025	A	Pedro Alvares de Cabral	Elon Musk	Zé da Manga	\N	\N
5	teste sem alternativa d e 	6	1	2	2025	B	Pedro Alvares de Cabral	Elon Musk	Zé da Manga	\N	\N
6	Qual é o resultado da operação 4+27/3 = ? 	6	1	2	2024	B	25	12	10.3	10.1	\N
\.


--
-- TOC entry 4866 (class 0 OID 16803)
-- Dependencies: 230
-- Data for Name: respostas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.respostas (resposta_id, usuario_id, questao_id, alternativa_escolhida, correta, data_resposta, ativa) FROM stdin;
\.


--
-- TOC entry 4854 (class 0 OID 16730)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (usuario_id, nome, email, senha, tipo_usuario, criado_em) FROM stdin;
6	administrador	ricardokamad@gmail.com	$2b$10$372M/16lZY4RnzPFk4ZE0eG5O3AHHUXHMs306JxctjBbKL.TMdbWa	usuario	2024-11-25 09:00:23.605566
\.


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 221
-- Name: bancas_banca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bancas_banca_id_seq', 7, true);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 225
-- Name: cargos_cargo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_cargo_id_seq', 2, true);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 223
-- Name: disciplinas_disciplina_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disciplinas_disciplina_id_seq', 20, true);


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 219
-- Name: pagamentos_pagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamentos_pagamento_id_seq', 1, false);


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 227
-- Name: questoes_questao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questoes_questao_id_seq', 6, true);


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 229
-- Name: respostas_resposta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.respostas_resposta_id_seq', 1, false);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 6, true);


--
-- TOC entry 4693 (class 2606 OID 16762)
-- Name: bancas bancas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bancas
    ADD CONSTRAINT bancas_pkey PRIMARY KEY (banca_id);


--
-- TOC entry 4697 (class 2606 OID 16776)
-- Name: cargos cargos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (cargo_id);


--
-- TOC entry 4695 (class 2606 OID 16769)
-- Name: disciplinas disciplinas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disciplinas
    ADD CONSTRAINT disciplinas_pkey PRIMARY KEY (disciplina_id);


--
-- TOC entry 4691 (class 2606 OID 16750)
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (pagamento_id);


--
-- TOC entry 4699 (class 2606 OID 16786)
-- Name: questoes questoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questoes
    ADD CONSTRAINT questoes_pkey PRIMARY KEY (questao_id);


--
-- TOC entry 4701 (class 2606 OID 16810)
-- Name: respostas respostas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respostas
    ADD CONSTRAINT respostas_pkey PRIMARY KEY (resposta_id);


--
-- TOC entry 4687 (class 2606 OID 16741)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4689 (class 2606 OID 16739)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4702 (class 2606 OID 16751)
-- Name: pagamentos pagamentos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4703 (class 2606 OID 16787)
-- Name: questoes questoes_banca_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questoes
    ADD CONSTRAINT questoes_banca_id_fkey FOREIGN KEY (banca_id) REFERENCES public.bancas(banca_id);


--
-- TOC entry 4704 (class 2606 OID 16797)
-- Name: questoes questoes_cargo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questoes
    ADD CONSTRAINT questoes_cargo_id_fkey FOREIGN KEY (cargo_id) REFERENCES public.cargos(cargo_id);


--
-- TOC entry 4705 (class 2606 OID 16792)
-- Name: questoes questoes_disciplina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questoes
    ADD CONSTRAINT questoes_disciplina_id_fkey FOREIGN KEY (disciplina_id) REFERENCES public.disciplinas(disciplina_id);


--
-- TOC entry 4706 (class 2606 OID 16816)
-- Name: respostas respostas_questao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respostas
    ADD CONSTRAINT respostas_questao_id_fkey FOREIGN KEY (questao_id) REFERENCES public.questoes(questao_id) ON DELETE CASCADE;


--
-- TOC entry 4707 (class 2606 OID 16811)
-- Name: respostas respostas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respostas
    ADD CONSTRAINT respostas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


-- Completed on 2024-12-13 10:29:33

--
-- PostgreSQL database dump complete
--

