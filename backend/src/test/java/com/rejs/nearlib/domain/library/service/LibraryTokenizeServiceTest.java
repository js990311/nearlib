package com.rejs.nearlib.domain.library.service;

import com.rejs.nearlib.global.AbstractTestContainerTest;
import jakarta.persistence.EntityManagerFactory;
import org.hibernate.SessionFactory;
import org.hibernate.search.engine.backend.analysis.AnalysisToken;
import org.hibernate.search.engine.backend.index.IndexManager;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.mapping.SearchMapping;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.hibernate.search.mapper.orm.work.SearchWorkspace;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;


class LibraryTokenizeServiceTest extends AbstractTestContainerTest {

    @Autowired
    private LibraryTokenizeService libraryTokenizeService;

    @Test
    void getTokens() {
        List<String> testTokens = libraryTokenizeService.getTokens("Test Tokens");
        List<String> expected = List.of(
                "T",
                "Te",
                "Tes",
                "Test",
                "T",
                "To",
                "Tok",
                "Toke",
                "Token",
                "Tokens"
        );
        assertEquals(expected.size(), testTokens.size());
        assertIterableEquals(expected,testTokens);
    }
}