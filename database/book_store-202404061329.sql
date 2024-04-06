--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 15.3

-- Started on 2024-04-06 13:29:58

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: zeffr
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO zeffr;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: zeffr
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 837 (class 1247 OID 965614)
-- Name: CommonStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CommonStatus" AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public."CommonStatus" OWNER TO postgres;

--
-- TOC entry 840 (class 1247 OID 966335)
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'loaned',
    'returned'
);


ALTER TYPE public."TransactionStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 965594)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 966348)
-- Name: history_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history_transaction (
    id integer NOT NULL,
    transaction_id integer NOT NULL,
    book_id integer NOT NULL,
    qty integer NOT NULL,
    status public."TransactionStatus" DEFAULT 'returned'::public."TransactionStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    student_id integer NOT NULL,
    duration_loan_days integer NOT NULL
);


ALTER TABLE public.history_transaction OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 966347)
-- Name: history_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 212
-- Name: history_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.history_transaction_id_seq OWNED BY public.history_transaction.id;


--
-- TOC entry 211 (class 1259 OID 966340)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    book_id integer NOT NULL,
    location character varying(100) NOT NULL,
    stock integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 966339)
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_id_seq OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 210
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- TOC entry 215 (class 1259 OID 966357)
-- Name: master_book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_book (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    author character varying(100) NOT NULL,
    publisher character varying(100) NOT NULL,
    year integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.master_book OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 966356)
-- Name: master_book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_book_id_seq OWNER TO postgres;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 214
-- Name: master_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_book_id_seq OWNED BY public.master_book.id;


--
-- TOC entry 217 (class 1259 OID 966365)
-- Name: master_student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_student (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    nim character varying(50) NOT NULL,
    status public."CommonStatus" DEFAULT 'active'::public."CommonStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.master_student OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 966364)
-- Name: master_student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_student_id_seq OWNER TO postgres;

--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 216
-- Name: master_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_student_id_seq OWNED BY public.master_student.id;


--
-- TOC entry 219 (class 1259 OID 966373)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    student_id integer NOT NULL,
    date_loan timestamp(3) without time zone NOT NULL,
    date_return timestamp(3) without time zone NOT NULL,
    status public."TransactionStatus" DEFAULT 'loaned'::public."TransactionStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 966381)
-- Name: transaction_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_detail (
    id integer NOT NULL,
    transaction_id integer NOT NULL,
    book_id integer NOT NULL,
    qty integer NOT NULL,
    status public."TransactionStatus" DEFAULT 'loaned'::public."TransactionStatus" NOT NULL
);


ALTER TABLE public.transaction_detail OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 966380)
-- Name: transaction_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_detail_id_seq OWNER TO postgres;

--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 220
-- Name: transaction_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_detail_id_seq OWNED BY public.transaction_detail.id;


--
-- TOC entry 218 (class 1259 OID 966372)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 3203 (class 2604 OID 966351)
-- Name: history_transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_transaction ALTER COLUMN id SET DEFAULT nextval('public.history_transaction_id_seq'::regclass);


--
-- TOC entry 3201 (class 2604 OID 966343)
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 966360)
-- Name: master_book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_book ALTER COLUMN id SET DEFAULT nextval('public.master_book_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 966368)
-- Name: master_student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_student ALTER COLUMN id SET DEFAULT nextval('public.master_student_id_seq'::regclass);


--
-- TOC entry 3211 (class 2604 OID 966376)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 966384)
-- Name: transaction_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_detail ALTER COLUMN id SET DEFAULT nextval('public.transaction_detail_id_seq'::regclass);


--
-- TOC entry 3377 (class 0 OID 965594)
-- Dependencies: 209
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('20d50135-c381-49d7-bcda-f5ae6c9a196a', '5b07def062ed78905308acb1fd1a22a673ca70fe2502502263dc8cf9029621bc', '2024-04-05 14:09:23.371749+07', '20240320044956_init', NULL, NULL, '2024-04-05 14:09:23.295018+07', 1);
INSERT INTO public._prisma_migrations VALUES ('a9ed4350-7b56-477d-8c19-c46c08ad8e8e', '466ebce366ceb7fd357008ce1e9001f57eb3a885cb205335eea8907c944440cd', '2024-04-05 14:09:23.379038+07', '20240320151740_init', NULL, NULL, '2024-04-05 14:09:23.37239+07', 1);
INSERT INTO public._prisma_migrations VALUES ('6d352d85-3542-4535-9f8b-c54692961d6c', 'eed3035f3923ce6bdf9c093cecfc7648a10aba1621c0f6092bbf691375248289', '2024-04-05 14:09:23.381881+07', '20240320152304_init', NULL, NULL, '2024-04-05 14:09:23.37976+07', 1);
INSERT INTO public._prisma_migrations VALUES ('71c3dc5a-c192-46ee-9d68-c2ca5fda5e52', '0596c00d7a9bf8403d3296047fd8b3349eea1a7100863b546431f3c9dee9fc98', '2024-04-05 14:09:23.390271+07', '20240322101012_init', NULL, NULL, '2024-04-05 14:09:23.382579+07', 1);
INSERT INTO public._prisma_migrations VALUES ('adf15a5d-bd08-48bf-a54c-6bc199c21532', '9df474e00f5271ce3526c6614bf2e46aff13e9c443ad8d05d0ec225fc40a5092', '2024-04-05 14:09:25.065193+07', '20240405070925_init', NULL, NULL, '2024-04-05 14:09:25.018142+07', 1);
INSERT INTO public._prisma_migrations VALUES ('bf4a4d9b-cfe3-48e6-941a-550d4ab5fa13', 'e60f41d71571010d96386dbf2f78b69ced53cb78390898a4ec43bb3731cd1e59', '2024-04-05 14:32:15.858992+07', '20240405073215_init', NULL, NULL, '2024-04-05 14:32:15.856645+07', 1);
INSERT INTO public._prisma_migrations VALUES ('283110de-f104-432e-b347-512ae8b577b5', 'eef277dca2fbd446124870b2f04bf7cc9766bc2ddcdf7f3cd9678bf174b43310', '2024-04-05 14:54:33.020097+07', '20240405075433_init', NULL, NULL, '2024-04-05 14:54:33.016009+07', 1);
INSERT INTO public._prisma_migrations VALUES ('04b222f6-1b91-4bbc-85a6-77e3a4c7c476', '08c90cb36c4fd23d82233f712e1d5382294e2080e18737bfd1431e6858096739', '2024-04-05 14:59:19.544356+07', '20240405075919_init', NULL, NULL, '2024-04-05 14:59:19.542106+07', 1);
INSERT INTO public._prisma_migrations VALUES ('2b8499ac-5159-47ff-bdde-24a065b1bbb0', 'fdb4c15d28f0e2bcfae10cd36fff9592a46f999a6e13dfc1a30dcb8049332b2d', '2024-04-05 15:23:26.844456+07', '20240405082326_init', NULL, NULL, '2024-04-05 15:23:26.841605+07', 1);
INSERT INTO public._prisma_migrations VALUES ('fc15c4aa-86cf-4c6c-96c2-6cd3d6289bdd', '716dd1458f625cd280dd45ea0e91aa62cad7a7568e2fc07bc84085fa1d642b09', '2024-04-05 16:07:39.803867+07', '20240405090739_init', NULL, NULL, '2024-04-05 16:07:39.801075+07', 1);
INSERT INTO public._prisma_migrations VALUES ('42342eb6-a671-458f-ad40-3585ade434f1', 'ce2755da9959ffa67a7c5c9cafc94e2edf425e919cd29ad48f2ad690e20623ea', '2024-04-05 20:24:13.207014+07', '20240405132413_init', NULL, NULL, '2024-04-05 20:24:13.203625+07', 1);
INSERT INTO public._prisma_migrations VALUES ('bb85ac26-1207-4fc5-b1ae-a5c5ee28c437', '2cac1acdab3e7c13cd9e14f0f73067bd5e7c21d663a47bd02e9084e95de96281', '2024-04-05 23:59:05.964655+07', '20240405165905_init', NULL, NULL, '2024-04-05 23:59:05.960524+07', 1);


--
-- TOC entry 3381 (class 0 OID 966348)
-- Dependencies: 213
-- Data for Name: history_transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.history_transaction VALUES (18, 21, 7, 1, 'returned', '2024-04-06 06:25:54.012', '2024-04-06 06:25:54.012', 6, 11);
INSERT INTO public.history_transaction VALUES (19, 21, 5, 1, 'returned', '2024-04-06 06:25:54.012', '2024-04-06 06:25:54.012', 6, 11);
INSERT INTO public.history_transaction VALUES (20, 21, 6, 1, 'returned', '2024-04-06 06:25:54.012', '2024-04-06 06:25:54.012', 6, 11);
INSERT INTO public.history_transaction VALUES (21, 20, 7, 2, 'returned', '2024-04-06 06:25:56.252', '2024-04-06 06:25:56.252', 7, 14);
INSERT INTO public.history_transaction VALUES (22, 20, 5, 2, 'returned', '2024-04-06 06:25:56.252', '2024-04-06 06:25:56.252', 7, 14);
INSERT INTO public.history_transaction VALUES (23, 20, 6, 2, 'returned', '2024-04-06 06:25:56.252', '2024-04-06 06:25:56.252', 7, 14);


--
-- TOC entry 3379 (class 0 OID 966340)
-- Dependencies: 211
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inventory VALUES (8, 7, 'B4', 5, '2024-04-06 06:23:16.278', '2024-04-06 06:23:16.278');
INSERT INTO public.inventory VALUES (9, 5, 'B6', 15, '2024-04-06 06:23:24.117', '2024-04-06 06:23:24.117');
INSERT INTO public.inventory VALUES (10, 6, 'A1', 11, '2024-04-06 06:23:36.604', '2024-04-06 06:23:36.604');


--
-- TOC entry 3383 (class 0 OID 966357)
-- Dependencies: 215
-- Data for Name: master_book; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.master_book VALUES (5, 'Pulang Pergi', 'Tere Liye', 'Tere Liye Inc', 2022, '2024-04-06 05:27:58.354', '2024-04-06 05:27:58.354');
INSERT INTO public.master_book VALUES (6, 'Sang Pemimpi', 'Andrea Hirata', 'Bentang Pustaka', 2006, '2024-04-06 06:19:07.374', '2024-04-06 06:19:07.374');
INSERT INTO public.master_book VALUES (7, 'Bumi', 'Tere Liye', 'Gramedia Pustaka Utama', 2014, '2024-04-06 06:20:53.156', '2024-04-06 06:20:53.156');


--
-- TOC entry 3385 (class 0 OID 966365)
-- Dependencies: 217
-- Data for Name: master_student; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.master_student VALUES (6, 'Zeffry Reynando', '11223311', 'active', '2024-04-05 13:29:15.578', '2024-04-05 13:29:15.578');
INSERT INTO public.master_student VALUES (7, 'Ricky Achmad Alvieri', '11228989', 'active', '2024-04-06 05:28:10.527', '2024-04-06 05:28:10.527');


--
-- TOC entry 3387 (class 0 OID 966373)
-- Dependencies: 219
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction VALUES (19, 7, '2024-04-05 00:00:00', '2024-04-11 00:00:00', 'loaned', '2024-04-06 06:24:43.37', '2024-04-06 06:24:43.37');
INSERT INTO public.transaction VALUES (21, 6, '2024-04-04 00:00:00', '2024-04-15 00:00:00', 'returned', '2024-04-06 06:25:13.994', '2024-04-06 06:25:54.014');
INSERT INTO public.transaction VALUES (20, 7, '2024-04-10 00:00:00', '2024-04-24 00:00:00', 'returned', '2024-04-06 06:24:54.375', '2024-04-06 06:25:56.253');


--
-- TOC entry 3389 (class 0 OID 966381)
-- Dependencies: 221
-- Data for Name: transaction_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transaction_detail VALUES (28, 19, 7, 2, 'loaned');
INSERT INTO public.transaction_detail VALUES (29, 19, 5, 4, 'loaned');
INSERT INTO public.transaction_detail VALUES (33, 21, 7, 1, 'returned');
INSERT INTO public.transaction_detail VALUES (34, 21, 5, 1, 'returned');
INSERT INTO public.transaction_detail VALUES (35, 21, 6, 1, 'returned');
INSERT INTO public.transaction_detail VALUES (30, 20, 7, 2, 'returned');
INSERT INTO public.transaction_detail VALUES (31, 20, 5, 2, 'returned');
INSERT INTO public.transaction_detail VALUES (32, 20, 6, 2, 'returned');


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 212
-- Name: history_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_transaction_id_seq', 23, true);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 210
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_id_seq', 10, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 214
-- Name: master_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_book_id_seq', 7, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 216
-- Name: master_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_student_id_seq', 7, true);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 220
-- Name: transaction_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_detail_id_seq', 35, true);


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 21, true);


--
-- TOC entry 3217 (class 2606 OID 965602)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 966355)
-- Name: history_transaction history_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_transaction
    ADD CONSTRAINT history_transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 966346)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 966363)
-- Name: master_book master_book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_book
    ADD CONSTRAINT master_book_pkey PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 966371)
-- Name: master_student master_student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_student
    ADD CONSTRAINT master_student_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 966386)
-- Name: transaction_detail transaction_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_pkey PRIMARY KEY (id);


--
-- TOC entry 3228 (class 2606 OID 966379)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 1259 OID 966387)
-- Name: master_student_nim_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX master_student_nim_key ON public.master_student USING btree (nim);


--
-- TOC entry 3232 (class 2606 OID 966398)
-- Name: history_transaction history_transaction_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_transaction
    ADD CONSTRAINT history_transaction_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.master_book(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3233 (class 2606 OID 969042)
-- Name: history_transaction history_transaction_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_transaction
    ADD CONSTRAINT history_transaction_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.master_student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3234 (class 2606 OID 966393)
-- Name: history_transaction history_transaction_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_transaction
    ADD CONSTRAINT history_transaction_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3231 (class 2606 OID 966388)
-- Name: inventory inventory_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.master_book(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3236 (class 2606 OID 966413)
-- Name: transaction_detail transaction_detail_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.master_book(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3237 (class 2606 OID 966408)
-- Name: transaction_detail transaction_detail_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_detail
    ADD CONSTRAINT transaction_detail_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3235 (class 2606 OID 966403)
-- Name: transaction transaction_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.master_student(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: zeffr
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-04-06 13:29:58

--
-- PostgreSQL database dump complete
--

