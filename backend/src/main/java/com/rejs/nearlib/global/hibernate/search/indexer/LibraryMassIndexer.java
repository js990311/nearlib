package com.rejs.nearlib.global.hibernate.search.indexer;

import com.rejs.nearlib.domain.library.entity.Library;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Component
public class LibraryMassIndexer implements CommandLineRunner {
    private final EntityManager entityManager;

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        SearchSession searchSession = Search.session(entityManager);

        MassIndexer indexer = searchSession
                .massIndexer(Library.class)
                .threadsToLoadObjects(4); // 병렬 쓰레드 수

        log.debug("indexing start");
        indexer.startAndWait();  // 동기적 실행
        log.debug("indexing end");
    }

}
