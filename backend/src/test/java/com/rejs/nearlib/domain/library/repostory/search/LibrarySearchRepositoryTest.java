package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.TestcontainersConfiguration;
import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.dto.NearLibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import jakarta.persistence.EntityManager;
import org.hibernate.search.mapper.orm.Search;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
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
        assertEquals(4, dtos.getContent().size());
    }

    @Disabled
    @DisplayName("자동완성")
    @Test
    void autoCompleteByName() {
        String query = "테스";

        List<String> suggestion = librarySearchRepository.autoCompleteByName(query);

        assertEquals(15, suggestion.size());
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