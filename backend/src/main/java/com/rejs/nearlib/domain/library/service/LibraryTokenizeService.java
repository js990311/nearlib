package com.rejs.nearlib.domain.library.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.hibernate.search.engine.backend.analysis.AnalysisToken;
import org.hibernate.search.engine.backend.index.IndexManager;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.mapping.SearchMapping;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LibraryTokenizeService {
    private final EntityManagerFactory entityManagerFactory;

    public List<String> getTokens(String query){
        SearchMapping mapping = Search.mapping(entityManagerFactory);
        IndexManager indexManager = mapping.indexManager("Library");
        List<? extends AnalysisToken> tokens = indexManager.analyze("suggestion-analyzer", query);
        return tokens.stream().map(AnalysisToken::term).toList();
    }
}
