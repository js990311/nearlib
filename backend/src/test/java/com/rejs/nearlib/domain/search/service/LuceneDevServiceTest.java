package com.rejs.nearlib.domain.search.service;

import com.rejs.nearlib.domain.search.dto.IndexInfo;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class LuceneDevServiceTest {

    private LuceneDevService luceneDevService = new LuceneDevService();

    @Test
    void getIndexes() {
        List<String> indexes = luceneDevService.getIndexes();
        assertEquals(1, indexes.size());
    }

    @Test
    void testGetIndexes() throws IOException {
        IndexInfo indexInfo = luceneDevService.getIndexMetaData("Library");
        assertEquals("Library", indexInfo.getName());
        assertEquals(7, indexInfo.getFieldNames().size());
        // __HSEARCH 등 하이버네이트 서치에서 사용하는 필드가 포함되어 있음
    }

    @Test
    void getIndexValues() throws IOException {
        List<Map<String, Object>> library = luceneDevService.getIndexValues("Library");
        assertEquals(20, library.size());

    }
}