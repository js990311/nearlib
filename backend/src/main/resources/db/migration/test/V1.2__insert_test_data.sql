INSERT INTO libraries(library_id, name, address, longitude, latitude, webpage, geometry)
VALUES
    -- 서울성북
    (1, '서울검색도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (2, '서울 검색 도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (3, '서울검색 도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (4, '서울 검색도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (5, '서울 자동 도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (6, '서울 자동완성 도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (7, '서울자동완성 도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (8, '서울자동완성도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (9, '서울 테스트도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),
    (10, '서울이름짓기귀찮은도서관', '테스트 주소',127.02,37.58,'library.webpage',ST_SetSRID(ST_MakePoint(127.02,37.58), 4326)),

    -- 인천
    (11, '인천검색도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (12, '인천 검색 도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (13, '인천검색 도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (14, '인천 검색도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (15, '인천 자동 도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (16, '인천 자동완성 도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (17, '인천자동완성 도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (18, '인천자동완성도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (19, '인천 테스트도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326)),
    (20, '인천이름짓기귀찮은도서관', '테스트 주소',126.70,37.45,'library.webpage',ST_SetSRID(ST_MakePoint(126.70,37.45), 4326))
;
