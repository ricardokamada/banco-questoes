select * from questoes;

select * from bancas;

select * from cargos;

select * from disciplinas;

SELECT column_name, data_type, character_maximum_length
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = 'questoes';

INSERT INTO questoes (
    cargo_id, 
    ano_prova, 
    banca_id, 
    alternativa_a, 
    alternativa_b, 
    alternativa_c, 
    alternativa_d, 
    alternativa_e, 
    questao, 
    alternativa_correta
) 
VALUES 
    (3, 2023, 6, 'Alternativa A1', 'Alternativa B1', 'Alternativa C1', 'Alternativa D1', 'Alternativa E1', 'Qual é a capital da França?', 'A'),
    (3, 2023, 6,  'Alternativa A2', 'Alternativa B2', 'Alternativa C2', 'Alternativa D2', 'Alternativa E2', 'Qual é a capital do Brasil?', 'B'),
    (3, 2023, 6,  'Alternativa A3', 'Alternativa B3', 'Alternativa C3', 'Alternativa D3', 'Alternativa E3', 'Qual é a capital da Alemanha?', 'C');

SELECT * FROM questoes WHERE questao_id = 30;

SELECT table_name, table_type
FROM information_schema.tables
WHERE table_name = 'questoes';



SELECT 
    q.questao_id,
    q.questao AS enunciado,
    q.ano_prova AS ano,
    q.alternativa_a,
    q.alternativa_b,
    q.alternativa_c,
    q.alternativa_d,
    q.alternativa_e,
    q.alternativa_correta,
    b.nome_banca AS banca,
    d.nome_disciplina AS disciplina,
    c.nome_cargo AS cargo
FROM questoes q
LEFT JOIN bancas b ON q.banca_id = b.banca_id
LEFT JOIN disciplinas d ON q.disciplina_id = d.disciplina_id
LEFT JOIN cargos c ON q.cargo_id = c.cargo_id
WHERE q.questao_id = 102;



