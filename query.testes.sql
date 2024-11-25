select (nome) from usuarios where nome = 'administrador';

select * from usuarios;

select * from bancas;

select * from disciplinas; --OK

select * from cargos; -- OK

commit;

delete from usuarios where usuario_id = '5';

delete from bancas where banca_id = '5';