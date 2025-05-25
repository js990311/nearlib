package com.rejs.nearlib.domain.library.repostory.search;

import com.rejs.nearlib.TestcontainersConfiguration;
import com.rejs.nearlib.domain.library.dto.LibraryDto;
import com.rejs.nearlib.domain.library.entity.Library;
import com.rejs.nearlib.domain.library.repostory.LibraryRepository;
import jakarta.persistence.EntityManager;
import org.hibernate.search.mapper.orm.Search;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

    @Test
    void autoCompleteByName() {
    }

    @Test
    void searchByLocation() {
    }
}