package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.TestcontainersConfiguration;
import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class LibrarySearchRepositoryTest {

    @Autowired
    private LibrarySearchRepository librarySearchRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private EntityManager entityManager;

    @DisplayName("이름으로 검색")
    @Test
    void searchByName() {
        // G
        String query = "서울";
        Pageable pageable = PageRequest.of(0,20);

        // W
        Page<LibraryDto> dtos = librarySearchRepository.searchByName(query, pageable);

        // T
        assertNotNull(dtos);
        assertEquals(10, dtos.getContent().size());
    }

    @DisplayName("자동완성-서울")
    @Test
    void suggestBy서울() {
        String query = "서울";

        List<String> suggestion = librarySearchRepository.suggestByName(query, 30);

        assertEquals(10, suggestion.size());
    }

    @DisplayName("자동완성-인천")
    @Test
    void suggestBy인천() {
        String query = "인천";

        List<String> suggestion = librarySearchRepository.suggestByName(query, 30);

        assertEquals(10, suggestion.size());
    }

    @DisplayName("자동완성-자동")
    @Test
    void suggestBy자동() {
        String query = "자동";

        List<String> suggestion = librarySearchRepository.suggestByName(query, 30);

        assertEquals(8, suggestion.size());
    }

    @DisplayName("자동완성-도서")
    @Test
    void suggestBy도서() {
        String query = "도서";

        List<String> suggestion = librarySearchRepository.suggestByName(query, 30);

        assertEquals(20, suggestion.size());
    }


    /* 위치로 검색 */

    @DisplayName("위치로 검색 - 광화문 10km")
    @Test
    void searchByLocationBy10km() {
        double lat = 37.57;
        double lng = 126.97;
        double dist = 10_000;
        Pageable pageable = PageRequest.of(0,20);

        Page<NearLibraryDto> dtos = librarySearchRepository.searchByLocation(lat, lng, dist, pageable);

        assertEquals(10, dtos.getContent().size());
    }

    @DisplayName("위치로 검색 - 광화문 42.195km")
    @Test
    void searchByLocationBy42km() {
        double lat = 37.57;
        double lng = 126.97;
        double dist = 42_195;
        Pageable pageable = PageRequest.of(0,20);

        Page<NearLibraryDto> dtos = librarySearchRepository.searchByLocation(lat, lng, dist, pageable);

        assertEquals(20, dtos.getContent().size());
    }

}