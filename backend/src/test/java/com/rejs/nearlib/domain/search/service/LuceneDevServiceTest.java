package com.rejs.nearlib.domain.search.service;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LuceneDevServiceTest {

    private LuceneDevService luceneDevService = new LuceneDevService();

    @Test
    void getIndexes() {
        List<String> indexes = luceneDevService.getIndexes();
        assertEquals(1, indexes.size());
    }
}